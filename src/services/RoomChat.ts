import Main from '@/services/main'

export type Chat = {
  isOpen: boolean
  messages: ChatMessage[]
}
export type ChatMessage = {
  data: string
  type: 'text' | 'stamp'
  connectionId: string
  datetime: Date
}

export const Stamps = {
  "cry": "images/emoji/cry.png",
  "cry2": "images/emoji/cry2.png",
  "I_dont_know": "images/emoji/I_dont_know.jpg",
  "like": "images/emoji/like.png",
  "like2": "images/emoji/like2.png",
  "omg": "images/emoji/omg.png",
  "robot-face": "images/emoji/robot-face.png",
  "smile": "images/emoji/smile.png",
  "strange": "images/emoji/strange.png",
  "what": "images/emoji/what.jpg",
  "wow": "images/emoji/wow.png"
};

export default class RoomChat {
  rtcClient: Main

  isOpen: boolean
  messages: ChatMessage[]

  constructor(rtcClient: Main) {
    this.rtcClient = rtcClient
    this.isOpen = false
    this.messages = []
  }

  // チャットの表示・非表示を切り替える
  async openChat() {
    this.isOpen = true
    await this.rtcClient.setAppRoot()
  }

  async closeChat() {
    this.isOpen = false
    await this.rtcClient.setAppRoot()
  }

  async sendChat(data: string) {
    const message = {
      type: 'text',
      data,
      connectionId: this.rtcClient.self.connectionId,
      datetime: new Date(),
    } as ChatMessage
    this.messages = [...this.messages, message]
    // await this.rtcClient.databaseBroadcastRef.set(message)
    this.rtcClient.ws?.multicast({
      type: 'chat',
      data: message,
    })
    await this.rtcClient.setAppRoot()
  }

  async sendStamp(key: string) {
    const stamp = Stamps[key]
    if (!stamp) {
      console.error(`not found key Stamp:[${key}]`)
      return
    }
    const message = {
      type: 'stamp',
      data: key,
      connectionId: this.rtcClient.self.connectionId,
      datetime: new Date(),
    } as ChatMessage
    this.messages = [...this.messages, message]
    // await this.rtcClient.databaseBroadcastRef.set(message)
    this.rtcClient.ws?.multicast({
      type: 'chat',
      data: message,
    })
    await this.rtcClient.setAppRoot()
  }

  async receiveChat(message: ChatMessage) {
    this.messages = [...this.messages, message]
    await this.rtcClient.setAppRoot()
  }
}
