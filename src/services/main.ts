import { WebRtc } from '@/services/WebRtc'
import Recorder from '@/services/Recorder'
import MediaDevice from '@/services/MediaDevice'
import RoomChat from '@/services/RoomChat'
import { startWebsocket, WebSocket } from '@/utilities/aws'

export type Self = {
  connectionId?: string
  name: string
  videoOff?: boolean
  muted?: boolean
}
export type Room = {
  roomId?: string
  name: string
}
export type Member = {
  connectionId: string
  name: string
  webRtc: WebRtc | null
  status: string
}
type Members = {
  [key: string]: Member
}

export default class MainService {
  _setAppRoot: (rtcClient: MainService) => void
  ws: WebSocket | null
  members: Members
  room: Room
  self: Self
  chat: RoomChat
  recorder: Recorder
  mediaDevice: MediaDevice

  constructor(setAppRoot: (appRoot: MainService) => void) {
    this._setAppRoot = setAppRoot
    this.ws = null
    this.members = {}
    this.room = { roomId: undefined, name: '' }
    this.self = { connectionId: undefined, name: '' }
    this.chat = new RoomChat(this)
    this.recorder = new Recorder(this)
    this.mediaDevice = new MediaDevice(this)
  }

  async setAppRoot() {
    await this._setAppRoot(this)
  }

  async setLocalPeerName(localPeerName: string) {
    this.self.name = localPeerName
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

  // 映像のオン・オフを切り替える
  async toggleVideo() {
    this.self.videoOff = !this.self.videoOff
    await this.setAppRoot()
    if (Object.keys(this.members).length === 0) return
    Object.keys(this.members).forEach((key) => {
      this.members[key].webRtc?.toggleVideo()
    })
  }

  // 音声のオン・オフを切り替える
  async toggleAudio() {
    this.self.muted = !this.self.muted
    await this.setAppRoot()
    if (Object.keys(this.members).length === 0) return
    Object.keys(this.members).forEach((key) => {
      this.members[key].webRtc?.toggleAudio()
    })
  }

  async signOut() {
    console.log('logout')
    await this.disconnect()
    this.self = { connectionId: undefined, name: '' }
    await this.setAppRoot()
  }

  async disconnect() {
    console.log('disconnect')
    // await this.databaseMembersRef(this.self.clientId).remove()
    this.ws?.close()
    this.room = { roomId: undefined, name: '' }
    await this.setAppRoot()
  }

  // ルームに参加する
  async join() {
    try {
      this.self = {
        name: this.self.name,
      }

      // シグナリングサーバーをリスンする
      await this.startListening()

      this.ws?.connect(() => {
        // ルームの接続が完了したら、自分のconnectionIdを問い合わせる
        this.ws?.multicast({ type: 'who_am_i' })
      })
    } catch (error) {
      console.error(error)
    }
  }

  // joinを受信した時やofferを受信したらメンバーを追加する
  async addMember(data: Member) {
    console.log('addMember', data)

    data.status = 'online'
    const newMember = {
      [data.connectionId]: data,
    }
    this.members = { ...this.members, ...newMember }
    await this.setAppRoot()
  }

  async removeMember(data: Member) {
    console.log('removeMember', this.members[data.connectionId])
    if (this.members[data.connectionId]) {
      // this.members[data.connectionId].webRtc?.disconnect()
      delete this.members[data.connectionId]
    }
    await this.setAppRoot()
  }

  // シグナリングサーバーをリスンする処理
  async startListening() {
    // console.log('startListening', this.self)

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
    this.ws?.on('please_add_me', async ({ sendId, connectionId, name }) => {
      if (sendId === this.self.connectionId) {
        // ignore self message (自分自身からのメッセージは無視する）
        return
      }
      console.log('receive please_add_me', connectionId, name)
      // 新メンバーの情報をローカルに登録する
      await this.addMember({ connectionId, name } as Member)

      // 追加したことを新メンバーに回答する
      this.ws?.unicast(connectionId, {
        type: 'added_you',
        ...this.self,
      })
    })
    this.ws?.on('added_you', async ({ sendId, connectionId, name }) => {
      if (sendId === this.self.connectionId) {
        // ignore self message (自分自身からのメッセージは無視する）
        return
      }
      console.log('receive added_you', connectionId, name)
      // 新メンバーの情報をローカルに登録する
      await this.addMember({ connectionId, name } as Member)
    })
    this.ws?.on('chat', async ({ sendId, connectionId, data }) => {
      if (sendId === this.self.connectionId) {
        // ignore self message (自分自身からのメッセージは無視する）
        return
      }
      console.log('receive chat', connectionId, data)
      await this.chat.receiveChat({ connectionId, ...data })
    })
    this.ws?.on('unjoin', async ({ connectionId }) => {
      // 他のメンバーが離脱した時
      console.log('unjoin', connectionId)
      await this.removeMember({ connectionId } as Member)
    })
  }
}
