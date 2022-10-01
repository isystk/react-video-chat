import Main from '@/services/main'
import { API, graphqlOperation } from 'aws-amplify'
import { createRoom } from '@/graphql/mutations'
import { listRooms } from '@/graphql/queries'

export type Room = {
  id: string
  name: string
  description: string
  createdAt: Date
}

export default class RoomService {
  main: Main
  roomId: string
  name: string
  rooms: Room[]
  isOpen: boolean

  constructor(main: Main) {
    this.main = main

    this.roomId = ''
    this.name = ''
    this.rooms = []
    this.isOpen = false
  }

  async setRoomName(roomName: string) {
    this.roomId = roomName
    this.name = roomName
    await this.registRoom({
      name: roomName,
      description: roomName,
    })
    await this.main.setAppRoot()
  }

  async setRoomId(roomId: string) {
    this.roomId = roomId
    this.name = roomId
    await this.main.setAppRoot()
  }

  async leaveRoom() {
    this.roomId = ''
    this.name = ''
    await this.main.setAppRoot()
  }

  async registRoom(input) {
    console.log('registRoom', input)
    const newRoom = await API.graphql(graphqlOperation(createRoom, { input }))
    console.log(newRoom)
  }

  async readRooms(): Promise<void> {
    const result = (await API.graphql(
      graphqlOperation(listRooms, { limit: 1000 })
    )) as GraphQLResult
    const query = result.data as ListTodosQuery
    if (!query.listRooms) {
      this.rooms = []
    }
    this.rooms = query.listRooms.items as Array<Room>
    await this.main.setAppRoot()
  }
}
