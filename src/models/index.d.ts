import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from '@aws-amplify/datastore'

type RoomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt'
}

type ChatMessageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt'
}

export declare class Room {
  readonly id: string
  readonly name: string
  readonly description?: string | null
  readonly createdAt?: string | null
  readonly updatedAt?: string | null
  constructor(init: ModelInit<Room, RoomMetaData>)
  static copyOf(
    source: Room,
    mutator: (
      draft: MutableModel<Room, RoomMetaData>
    ) => MutableModel<Room, RoomMetaData> | void
  ): Room
}

export declare class ChatMessage {
  readonly id: string
  readonly type: string
  readonly data: string
  readonly chanelId: string
  readonly sendId: string
  readonly datetime: string
  readonly readed: boolean
  readonly createdAt?: string | null
  readonly updatedAt?: string | null
  constructor(init: ModelInit<ChatMessage, ChatMessageMetaData>)
  static copyOf(
    source: ChatMessage,
    mutator: (
      draft: MutableModel<ChatMessage, ChatMessageMetaData>
    ) => MutableModel<ChatMessage, ChatMessageMetaData> | void
  ): ChatMessage
}
