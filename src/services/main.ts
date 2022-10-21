import RecorderService from '@/services/recorder'
import MediaDeviceService from '@/services/mediaDevice'
import { startWebsocket, WebSocket } from '@/utils/aws'
import ChanelService from '@/services/chanel'
import VideoService from '@/services/video/video'
import { getStorage, removeStorage, storeStorage } from '@/utils/localStorage'
import { requestPermission } from '@/utils/notification'
import RoomService from '@/services/room'
import { Amplify } from 'aws-amplify'
import { onCreateChatMessage } from '@/graphql/subscriptions'

export type Self = {
  connectionId: string
  name: string
  photo: string
  isOpen?: boolean
}

export type Member = {
  connectionId: string
  name: string
  photo: string
  online: boolean
}

type Members = {
  [key: string]: Member
}

type Chanels = {
  [key: string]: ChanelService
}

export default class MainService {
  _setAppRoot: (main: MainService) => void
  apolloClient
  ws: WebSocket | null
  members: Members
  room: RoomService
  self: Self
  chanels: Chanels
  selectChanelId: string
  recorder: RecorderService
  mediaDevice: MediaDeviceService
  video: VideoService

  constructor(setAppRoot: (appRoot: MainService) => void) {
    if (process.env.USE_AWS_AMPLIFY) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const awsmobile = require('@/aws-exports')
      Amplify.configure(awsmobile)
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { useApolloClient } = require('@/utils/apolloClient')
      this.apolloClient = useApolloClient()
    }
    this._setAppRoot = setAppRoot
    this.ws = null
    this.members = {}
    this.room = new RoomService(this)

    // ローカルストレージからログイン情報を取得
    const user = getStorage('User')
    if (user) {
      this.self = user
    } else {
      this.self = { connectionId: '', name: '', photo: '', isOpen: false }
    }
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
    // ローカルストレージにログイン情報を保存
    storeStorage('User', this.self)
    await this.setAppRoot()
  }

  async setChanelId(chanelId: string) {
    this.selectChanelId = chanelId

    // チャネル内のメッセージを既読にする
    this.chanels[chanelId].chat.readMessage()

    await this.setAppRoot()
  }

  // サインアウト
  async signOut() {
    await this.leave()
    this.self = { connectionId: '', name: '', photo: '' }
    removeStorage('User')
    await this.setAppRoot()
  }

  // ルームに参加する
  async join() {
    try {
      // WebSocketサーバーをリスンする
      await this.startListening()

      // Notification API を利用するための許可をブラウザに求める。
      requestPermission()

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
        new ChanelService(this, 'own', '自分', 'own', this.self.photo, '自分')
      )

      await this.setAppRoot()
    } catch (error) {
      console.error(error)
    }
  }

  // ルームを退出する
  async leave() {
    this.ws?.close()
    await this.room.leaveRoom()
  }

  // プロフィール編集
  async openProfileEdit() {
    this.self.isOpen = true
    await this.setAppRoot()
  }
  async closeProfileEdit() {
    this.self.isOpen = false
    await this.setAppRoot()
  }
  async storeProfile(self: Self) {
    this.self = { ...this.self, ...self }
    this.closeProfileEdit()
  }

  // メンバーを追加する
  async addMember(data: Member) {
    console.log('addMember', data)

    const newMember = {
      [data.connectionId]: { ...data, online: true },
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
    if (this.members[connectionId]) {
      // delete this.members[connectionId]
      this.members[connectionId] = {
        ...this.members[connectionId],
        online: false,
      }
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

    this.onUpdateChatMessage()

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
      await this.video.receiveAcceptCall(sendId)
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

  async onUpdateChatMessage() {
    if (process.env.USE_AWS_AMPLIFY) {
      const res = await this.apolloClient.subscribe({
        query: onCreateChatMessage,
      })
      res.subscribe(async (result) => {
        const { onCreateChatMessage } = result.data
        const { ...data } = onCreateChatMessage
        if (data.sendId === this.self.connectionId) {
          // ignore self message (自分自身からのメッセージは無視する）
          return
        }
        if ('all' === data.chanelId) {
          await this.chanels['all'].chat.receiveChat({ ...data })
        } else if (this.self.connectionId === data.chanelId) {
          await this.chanels[data.sendId].chat.receiveChat({ ...data })
        }
      })
    } else {
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
    }
  }
}
