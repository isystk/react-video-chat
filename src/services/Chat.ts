import Main from '@/services/main'

export type ChatMessage = {
  type: 'text' | 'stamp'
  data: string
  chanelId: string
  sendId: string
  datetime: Date
}

export const Stamps = {
  cry: 'images/emoji/cry.png',
  cry2: 'images/emoji/cry2.png',
  I_dont_know: 'images/emoji/I_dont_know.jpg',
  like: 'images/emoji/like.png',
  like2: 'images/emoji/like2.png',
  omg: 'images/emoji/omg.png',
  'robot-face': 'images/emoji/robot-face.png',
  smile: 'images/emoji/smile.png',
  strange: 'images/emoji/strange.png',
  what: 'images/emoji/what.jpg',
  wow: 'images/emoji/wow.png',
}

export default class ChatService {
  rtcClient: Main

  chanelId: string
  messages: ChatMessage[]

  constructor(rtcClient: Main, chanelId: string) {
    this.rtcClient = rtcClient
    this.chanelId = chanelId
    this.messages = []
  }

  async sendChat(data: string) {
    const message = {
      type: 'text',
      data,
      chanelId: this.chanelId,
      sendId: this.rtcClient.self.connectionId,
      datetime: new Date(),
    } as ChatMessage
    this.messages = [...this.messages, message]
    // メッセージを送信する
    if ('all' === this.chanelId) {
      this.rtcClient.ws?.multicast({
        type: 'chat',
        data: message,
      })
    } else {
      this.rtcClient.ws?.unicast(this.chanelId, {
        type: 'chat',
        data: message,
      })
    }
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
      chanelId: this.chanelId,
      sendId: this.rtcClient.self.connectionId,
      datetime: new Date(),
    } as ChatMessage
    this.messages = [...this.messages, message]
    // メッセージを送信する
    if ('all' === this.chanelId) {
      this.rtcClient.ws?.multicast({
        type: 'chat',
        data: message,
      })
    } else {
      this.rtcClient.ws?.unicast(this.chanelId, {
        type: 'chat',
        data: message,
      })
    }
    await this.rtcClient.setAppRoot()
  }

  async receiveChat(message: ChatMessage) {
    this.messages = [...this.messages, message]
    await this.rtcClient.setAppRoot()
  }
}
