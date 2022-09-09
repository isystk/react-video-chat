import Main from '@/services/main'
import ChatService from '@/services/chat'

export default class ChanelService {
  main: Main
  id: string
  name: string
  type: 'all' | 'own' | 'other'
  photo: string
  detail: string
  chat: ChatService

  constructor(main: Main, id, name, type, photo, detail) {
    this.main = main

    this.id = id
    this.name = name
    this.type = type
    this.photo = photo
    this.detail = detail
    this.chat = new ChatService(main, id)
  }
}
