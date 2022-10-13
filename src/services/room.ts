import Main from '@/services/main'
import { createRoom, updateRoom, deleteRoom } from '@/graphql/mutations'
import { listRooms } from '@/graphql/queries'
import * as _ from 'lodash'
import { ListRoomsQuery, Room } from '@/API'

export type Rooms = {
  [id: string]: Room
}

export default class RoomService {
  main: Main
  roomId: string
  name: string
  rooms: Rooms
  isOpen: boolean

  constructor(main: Main) {
    this.main = main

    this.roomId = ''
    this.name = ''
    this.rooms = {}
    this.isOpen = false
  }

  async setRoomId(roomId: string) {
    this.roomId = roomId
    if (!this.rooms[roomId]) {
      throw new Error('no room data')
    }
    this.name = this.rooms[roomId].name
    await this.main.setAppRoot()
  }

  async setRoomName(roomName: string) {
    this.roomId = roomName
    this.name = roomName
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
      await this.main.apolloClient.mutate({
        mutation: createRoom,
        variables: { input },
      })
      await this.readRooms(null, true)
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
        _version: this.rooms[room.id]._version,
      } as Room
      await this.main.apolloClient.mutate({
        mutation: updateRoom,
        variables: { input },
      })
      await this.readRooms(null, true)
    } catch (error) {
      console.log('error update room', error)
      alert('登録に失敗しました')
    }
  }

  async deleteRoom(roomId: string) {
    try {
      const input = {
        id: roomId,
        _version: this.rooms[roomId]._version,
      }
      await this.main.apolloClient.mutate({
        mutation: deleteRoom,
        variables: { input },
      })
      await this.readRooms(null, true)
    } catch (error) {
      console.log('error update room', error)
      alert('登録に失敗しました')
    }
  }

  async readRooms(name, isRefresh = false): Promise<void> {
    try {
      let filter = {}
      if (name) {
        filter = {
          name: {
            contains: name,
          },
        }
      }
      const result = await this.main.apolloClient.query({
        query: listRooms,
        variables: {
          // limit: 10
          filter,
        },
        fetchPolicy: isRefresh ? 'network-only' : 'cache-first',
      })
      const query = result.data as ListRoomsQuery
      if (!query.listRooms) {
        this.rooms = {}
      }
      const filterRooms = _.filter(
        query.listRooms.items,
        (room) => !room._deleted
      )
      this.rooms = _.mapKeys(filterRooms, 'id')
      await this.main.setAppRoot()
    } catch (error) {
      console.log('error read rooms', error)
      alert('データ取得に失敗しました')
    }
  }
}
