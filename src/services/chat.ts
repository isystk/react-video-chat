import Main from '@/services/main'
import { dateFormat } from '@/utils/general'
import { showNotification } from '@/utils/notification'
import { createChatMessage } from '@/graphql/mutations'
import { CreateChatMessageInput } from '@/API'

export type ChatMessage = {
  type: 'text' | 'stamp'
  data: string
  chanelId: string
  sendId: string
  datetime: string
  readed: boolean
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
  main: Main

  chanelId: string
  messages: ChatMessage[]

  constructor(main: Main, chanelId: string) {
    this.main = main
    this.chanelId = chanelId
    this.messages = []
  }

  async sendChat(data: string) {
    const message = {
      type: 'text',
      data,
      chanelId: this.chanelId,
      sendId: this.main.self.connectionId,
      datetime: dateFormat(new Date()),
    } as ChatMessage
    this.messages = [
      ...this.messages,
      {
        ...message,
        readed: true,
      },
    ]
    // メッセージを送信する
    if ('all' === this.chanelId) {
      this.main.ws?.multicast({
        type: 'chat',
        data: message,
      })
    } else {
      this.main.ws?.unicast(this.chanelId, {
        type: 'chat',
        data: message,
      })
    }
    await this.main.setAppRoot()
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
      sendId: this.main.self.connectionId,
      datetime: dateFormat(new Date()),
    } as ChatMessage
    this.messages = [
      ...this.messages,
      {
        ...message,
        readed: true,
      },
    ]
    if (process.env.USE_AWS_AMPLIFY) {
      // Amplifyでメッセージを送信する
      const input = {
        ...message,
        readed: false,
        // userID: this.main.auth.id,
      } as CreateChatMessageInput
      await this.main.apolloClient.mutate({
        mutation: createChatMessage,
        variables: { input },
      })
    } else {
      // WebSocketでメッセージを送信する
      if ('all' === this.chanelId) {
        this.main.ws?.multicast({
          type: 'chat',
          data: message,
        })
      } else {
        this.main.ws?.unicast(this.chanelId, {
          type: 'chat',
          data: message,
        })
      }
    }
    await this.main.setAppRoot()
  }

  async receiveChat(message: ChatMessage) {
    this.messages = [
      ...this.messages,
      {
        ...message,
        readed: false,
      },
    ]

    const member = this.main.members[message.sendId]
    showNotification(
      '新着メッセージ',
      message.data,
      member.photo,
      this.chanelId
    )

    await this.main.setAppRoot()
  }

  /**
   * チャットの未読件数を取得します。
   */
  getUnreadCount() {
    return this.messages.filter((message) => !message.readed).length
  }

  /**
   * 未読のチェックを既読に変更します。
   */
  readMessage() {
    this.messages = this.messages.map((message) => {
      return {
        ...message,
        readed: true,
      }
    })
  }
}
