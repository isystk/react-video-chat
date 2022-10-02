import Main from '@/services/main'
import { API, graphqlOperation } from 'aws-amplify'
import { createRoom, updateRoom, deleteRoom } from '@/graphql/mutations'
import { listRooms } from '@/graphql/queries'
import * as _ from 'lodash'

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

  async setRoomId(roomId: string) {
    this.roomId = roomId
    const roomsMap = _.mapKeys(this.rooms, 'id')
    if (!roomsMap) {
      throw new Error('no room data')
    }
    this.name = roomsMap[roomId].name
    await this.main.setAppRoot()
  }

  async leaveRoom() {
    this.roomId = ''
    this.name = ''
    await this.main.setAppRoot()
  }

  async createRoom(room: Room) {
    try {
      const input = {
        ...room,
        // userID: this.main.auth.id,
      }
      await API.graphql(graphqlOperation(createRoom, { input }))
      await this.readRooms()
    } catch (error) {
      console.log('error create room', error)
      alert('登録に失敗しました')
    }
  }

  async updateRoom(room: Room) {
    try {
      const input = {
        ...room,
        // userID: this.main.auth.id,
        // _version: this.rooms[room.id]._version,
      } as Room
      await API.graphql(graphqlOperation(updateRoom, { input }))
      await this.readRooms()
    } catch (error) {
      console.log('error update room', error)
      alert('登録に失敗しました')
    }
  }

  async deleteRoom(roomId: string) {
    try {
      const input = {
        id: roomId,
        // _version: this.rooms[roomId]._version,
      }
      await API.graphql(graphqlOperation(deleteRoom, { input }))
      await this.readRooms()
    } catch (error) {
      console.log('error update room', error)
      alert('登録に失敗しました')
    }
  }

  async readRooms(): Promise<void> {
    try {
      const result = (await API.graphql(
        graphqlOperation(listRooms, { limit: 1000 })
      )) as GraphQLResult
      const query = result.data as ListTodosQuery
      if (!query.listRooms) {
        this.rooms = []
      }
      this.rooms = query.listRooms.items as Array<Room>
      await this.main.setAppRoot()
    } catch (error) {
      console.log('error read rooms', error)
      alert('データ取得に失敗しました')
    }
  }
}
