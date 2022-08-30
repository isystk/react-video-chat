import Main from '@/services/main'
import ChatService from '@/services/Chat'

export default class ChanelService {
  rtcClient: Main
  id: string
  name: string
  type: 'all' | 'own' | 'other'
  photo: string
  detail: string
  chat: ChatService

  constructor(rtcClient: Main, id, name, type, photo, detail) {
    this.rtcClient = rtcClient

    this.id = id
    this.name = name
    this.type = type
    this.photo = photo
    this.detail = detail
    this.chat = new ChatService(rtcClient, id)
  }
}
