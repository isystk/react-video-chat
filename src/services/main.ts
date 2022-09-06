import RecorderService from '@/services/Recorder'
import MediaDeviceService from '@/services/MediaDevice'
import { startWebsocket, WebSocket } from '@/utilities/aws'
import ChanelService from '@/services/Chanel'
import VideoService from '@/services/Video/Video'

export type Self = {
  connectionId: string
  name: string
  photo: string
}
export type Room = {
  roomId: string
  name: string
}
export type Member = {
  connectionId: string
  name: string
  photo: string
  status: string
}

type Members = {
  [key: string]: Member
}

type Chanels = {
  [key: string]: ChanelService
}

export default class MainService {
  _setAppRoot: (main: MainService) => void
  ws: WebSocket | null
  members: Members
  room: Room
  self: Self
  chanels: Chanels
  selectChanelId: string
  recorder: RecorderService
  mediaDevice: MediaDeviceService
  video: VideoService

  constructor(setAppRoot: (appRoot: MainService) => void) {
    this._setAppRoot = setAppRoot
    this.ws = null
    this.members = {}
    this.room = { roomId: '', name: '' }
    this.self = { connectionId: '', name: '', photo: '' }
    this.chanels = {}
    this.selectChanelId = 'all'
    this.recorder = new RecorderService(this)
    this.mediaDevice = new MediaDeviceService(this)
    this.video = new VideoService(this)
  }

  async setAppRoot() {
    await this._setAppRoot(this)
  }

  async setName(name: string) {
    this.self = {
      ...this.self,
      name,
      photo: 'images/friends/David.png',
    }
    await this.setAppRoot()
  }

  async setRoomName(roomName: string) {
    this.room = {
      roomId: roomName, // 本番ではSSGを利用するためパスにIDが利用できない
      name: roomName,
    }
    await this.setAppRoot()
  }

  async setRoomId(roomId: string) {
    this.room = {
      roomId,
      name: roomId,
    }
    await this.setAppRoot()
  }

  async setChanelId(chanelId: string) {
    this.selectChanelId = chanelId
    await this.setAppRoot()
  }

  // サインアウト
  async signOut() {
    await this.leave()
    this.self = { connectionId: '', name: '', photo: '' }
    await this.setAppRoot()
  }

  // ルームに参加する
  async join() {
    try {
      // WebSocketサーバーをリスンする
      await this.startListening()

      this.ws?.connect(() => {
        // ルームの接続が完了したら、自分のconnectionIdを問い合わせる
        this.ws?.multicast({ type: 'who_am_i' })
      })

      // ルーム全体のチャネルを追加
      this.addChanel(
        new ChanelService(
          this,
          'all',
          'すべて',
          'all',
          'images/friends/Alpha_Team.png',
          'ルーム内のすべてのメンバー'
        )
      )

      // 自分専用のチャネルを追加
      this.addChanel(
        new ChanelService(
          this,
          'own',
          '自分',
          'own',
          'images/friends/BigBoss.png',
          '自分'
        )
      )

      await this.setAppRoot()
    } catch (error) {
      console.error(error)
    }
  }

  // ルームを退出する
  async leave() {
    this.ws?.close()
    this.room = { roomId: '', name: '' }
    await this.setAppRoot()
  }

  // メンバーを追加する
  async addMember(data: Member) {
    console.log('addMember', data)

    data.status = 'online'
    const newMember = {
      [data.connectionId]: data,
    }
    this.members = { ...this.members, ...newMember }

    // メンバー用のチャネルを追加
    this.addChanel(
      new ChanelService(
        this,
        data.connectionId,
        data.name,
        'other',
        data.photo,
        'メンバー'
      )
    )

    await this.setAppRoot()
  }

  // メンバーを削除する
  async removeMember(connectionId: string) {
    console.log('removeMember', this.members[connectionId])
    if (this.members[connectionId]) {
      delete this.members[connectionId]
    }
    await this.removeChanel(connectionId)
    await this.setAppRoot()
  }

  // チャネルを追加する
  async addChanel(data: ChanelService) {
    console.log('addChanel', data)

    const newChanel = {
      [data.id]: data,
    }
    this.chanels = { ...this.chanels, ...newChanel }
    await this.setAppRoot()
  }

  // チャネルを削除する
  async removeChanel(id: string) {
    console.log('removeChanel', this.chanels[id])
    if (this.chanels[id]) {
      delete this.chanels[id]
    }
    await this.setAppRoot()
  }

  // WebSocketサーバーをリスンする処理
  async startListening() {
    this.ws = startWebsocket(this.room.roomId)
    this.ws?.on('who_am_i', async ({ connectionId }) => {
      // 自分のconnectionIdを登録する
      this.self = {
        ...this.self,
        connectionId,
      } as Self
      await this.setAppRoot()
      // 全メンバーに自分を伝える
      this.ws?.multicast({
        type: 'please_add_me',
        ...this.self,
      })
    })
    this.ws?.on(
      'please_add_me',
      async ({ sendId, connectionId, name, photo }) => {
        if (sendId === this.self.connectionId) {
          // ignore self message (自分自身からのメッセージは無視する）
          return
        }
        // 新メンバーの情報をローカルに登録する
        await this.addMember({ connectionId, name, photo } as Member)

        // 追加したことを新メンバーに回答する
        this.ws?.unicast(connectionId, {
          type: 'added_you',
          ...this.self,
        })
      }
    )
    this.ws?.on('added_you', async ({ sendId, connectionId, name, photo }) => {
      if (sendId === this.self.connectionId) {
        // ignore self message (自分自身からのメッセージは無視する）
        return
      }
      // 新メンバーの情報をローカルに登録する
      await this.addMember({ connectionId, name, photo } as Member)
    })
    this.ws?.on('chat', async ({ sendId, data }) => {
      if (sendId === this.self.connectionId) {
        // ignore self message (自分自身からのメッセージは無視する）
        return
      }
      if ('all' === data.chanelId) {
        await this.chanels['all'].chat.receiveChat({ sendId, ...data })
      } else {
        await this.chanels[sendId].chat.receiveChat({ sendId, ...data })
      }
    })

    this.ws?.on('request_call', async ({ sendId }) => {
      if (sendId === this.self.connectionId) {
        // ignore self message (自分自身からのメッセージは無視する）
        return
      }
      await this.video.receiveCall(sendId)
    })
    this.ws?.on('accept_call', async ({ sendId }) => {
      if (sendId === this.self.connectionId) {
        // ignore self message (自分自身からのメッセージは無視する）
        return
      }
      await this.video.receiveAcceptCall()
    })
    this.ws?.on('reject_call', async ({ sendId }) => {
      if (sendId === this.self.connectionId) {
        // ignore self message (自分自身からのメッセージは無視する）
        return
      }
      await this.video.receiveRejectCall()
    })
    this.ws?.on('cancel_call', async ({ sendId }) => {
      if (sendId === this.self.connectionId) {
        // ignore self message (自分自身からのメッセージは無視する）
        return
      }
      await this.video.receiveCancelCall()
    })

    this.ws?.on('unjoin', async ({ connectionId }) => {
      // 他のメンバーが離脱した時
      await this.removeMember(connectionId)
    })
  }
}
