/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateRoomInput = {
  id?: string | null
  name: string
  description?: string | null
  _version?: number | null
}

export type ModelRoomConditionInput = {
  name?: ModelStringInput | null
  description?: ModelStringInput | null
  and?: Array<ModelRoomConditionInput | null> | null
  or?: Array<ModelRoomConditionInput | null> | null
  not?: ModelRoomConditionInput | null
}

export type ModelStringInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null',
}

export type ModelSizeInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
}

export type Room = {
  __typename: 'Room'
  id: string
  name: string
  description?: string | null
  createdAt: string
  updatedAt: string
  _version: number
  _deleted?: boolean | null
  _lastChangedAt: number
}

export type UpdateRoomInput = {
  id: string
  name?: string | null
  description?: string | null
  _version?: number | null
}

export type DeleteRoomInput = {
  id: string
  _version?: number | null
}

export type CreateChatMessageInput = {
  id?: string | null
  type: string
  data: string
  chanelId: string
  sendId: string
  datetime: string
  readed: boolean
  _version?: number | null
}

export type ModelChatMessageConditionInput = {
  type?: ModelStringInput | null
  data?: ModelStringInput | null
  chanelId?: ModelStringInput | null
  sendId?: ModelStringInput | null
  datetime?: ModelStringInput | null
  readed?: ModelBooleanInput | null
  and?: Array<ModelChatMessageConditionInput | null> | null
  or?: Array<ModelChatMessageConditionInput | null> | null
  not?: ModelChatMessageConditionInput | null
}

export type ModelBooleanInput = {
  ne?: boolean | null
  eq?: boolean | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
}

export type ChatMessage = {
  __typename: 'ChatMessage'
  id: string
  type: string
  data: string
  chanelId: string
  sendId: string
  datetime: string
  readed: boolean
  createdAt: string
  updatedAt: string
  _version: number
  _deleted?: boolean | null
  _lastChangedAt: number
}

export type UpdateChatMessageInput = {
  id: string
  type?: string | null
  data?: string | null
  chanelId?: string | null
  sendId?: string | null
  datetime?: string | null
  readed?: boolean | null
  _version?: number | null
}

export type DeleteChatMessageInput = {
  id: string
  _version?: number | null
}

export type ModelRoomFilterInput = {
  id?: ModelIDInput | null
  name?: ModelStringInput | null
  description?: ModelStringInput | null
  and?: Array<ModelRoomFilterInput | null> | null
  or?: Array<ModelRoomFilterInput | null> | null
  not?: ModelRoomFilterInput | null
}

export type ModelIDInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export type ModelRoomConnection = {
  __typename: 'ModelRoomConnection'
  items: Array<Room | null>
  nextToken?: string | null
  startedAt?: number | null
}

export type ModelChatMessageFilterInput = {
  id?: ModelIDInput | null
  type?: ModelStringInput | null
  data?: ModelStringInput | null
  chanelId?: ModelStringInput | null
  sendId?: ModelStringInput | null
  datetime?: ModelStringInput | null
  readed?: ModelBooleanInput | null
  and?: Array<ModelChatMessageFilterInput | null> | null
  or?: Array<ModelChatMessageFilterInput | null> | null
  not?: ModelChatMessageFilterInput | null
}

export type ModelChatMessageConnection = {
  __typename: 'ModelChatMessageConnection'
  items: Array<ChatMessage | null>
  nextToken?: string | null
  startedAt?: number | null
}

export type CreateRoomMutationVariables = {
  input: CreateRoomInput
  condition?: ModelRoomConditionInput | null
}

export type CreateRoomMutation = {
  createRoom?: {
    __typename: 'Room'
    id: string
    name: string
    description?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type UpdateRoomMutationVariables = {
  input: UpdateRoomInput
  condition?: ModelRoomConditionInput | null
}

export type UpdateRoomMutation = {
  updateRoom?: {
    __typename: 'Room'
    id: string
    name: string
    description?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type DeleteRoomMutationVariables = {
  input: DeleteRoomInput
  condition?: ModelRoomConditionInput | null
}

export type DeleteRoomMutation = {
  deleteRoom?: {
    __typename: 'Room'
    id: string
    name: string
    description?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type CreateChatMessageMutationVariables = {
  input: CreateChatMessageInput
  condition?: ModelChatMessageConditionInput | null
}

export type CreateChatMessageMutation = {
  createChatMessage?: {
    __typename: 'ChatMessage'
    id: string
    type: string
    data: string
    chanelId: string
    sendId: string
    datetime: string
    readed: boolean
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type UpdateChatMessageMutationVariables = {
  input: UpdateChatMessageInput
  condition?: ModelChatMessageConditionInput | null
}

export type UpdateChatMessageMutation = {
  updateChatMessage?: {
    __typename: 'ChatMessage'
    id: string
    type: string
    data: string
    chanelId: string
    sendId: string
    datetime: string
    readed: boolean
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type DeleteChatMessageMutationVariables = {
  input: DeleteChatMessageInput
  condition?: ModelChatMessageConditionInput | null
}

export type DeleteChatMessageMutation = {
  deleteChatMessage?: {
    __typename: 'ChatMessage'
    id: string
    type: string
    data: string
    chanelId: string
    sendId: string
    datetime: string
    readed: boolean
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type GetRoomQueryVariables = {
  id: string
}

export type GetRoomQuery = {
  getRoom?: {
    __typename: 'Room'
    id: string
    name: string
    description?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type ListRoomsQueryVariables = {
  filter?: ModelRoomFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListRoomsQuery = {
  listRooms?: {
    __typename: 'ModelRoomConnection'
    items: Array<{
      __typename: 'Room'
      id: string
      name: string
      description?: string | null
      createdAt: string
      updatedAt: string
      _version: number
      _deleted?: boolean | null
      _lastChangedAt: number
    } | null>
    nextToken?: string | null
    startedAt?: number | null
  } | null
}

export type SyncRoomsQueryVariables = {
  filter?: ModelRoomFilterInput | null
  limit?: number | null
  nextToken?: string | null
  lastSync?: number | null
}

export type SyncRoomsQuery = {
  syncRooms?: {
    __typename: 'ModelRoomConnection'
    items: Array<{
      __typename: 'Room'
      id: string
      name: string
      description?: string | null
      createdAt: string
      updatedAt: string
      _version: number
      _deleted?: boolean | null
      _lastChangedAt: number
    } | null>
    nextToken?: string | null
    startedAt?: number | null
  } | null
}

export type GetChatMessageQueryVariables = {
  id: string
}

export type GetChatMessageQuery = {
  getChatMessage?: {
    __typename: 'ChatMessage'
    id: string
    type: string
    data: string
    chanelId: string
    sendId: string
    datetime: string
    readed: boolean
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type ListChatMessagesQueryVariables = {
  filter?: ModelChatMessageFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListChatMessagesQuery = {
  listChatMessages?: {
    __typename: 'ModelChatMessageConnection'
    items: Array<{
      __typename: 'ChatMessage'
      id: string
      type: string
      data: string
      chanelId: string
      sendId: string
      datetime: string
      readed: boolean
      createdAt: string
      updatedAt: string
      _version: number
      _deleted?: boolean | null
      _lastChangedAt: number
    } | null>
    nextToken?: string | null
    startedAt?: number | null
  } | null
}

export type SyncChatMessagesQueryVariables = {
  filter?: ModelChatMessageFilterInput | null
  limit?: number | null
  nextToken?: string | null
  lastSync?: number | null
}

export type SyncChatMessagesQuery = {
  syncChatMessages?: {
    __typename: 'ModelChatMessageConnection'
    items: Array<{
      __typename: 'ChatMessage'
      id: string
      type: string
      data: string
      chanelId: string
      sendId: string
      datetime: string
      readed: boolean
      createdAt: string
      updatedAt: string
      _version: number
      _deleted?: boolean | null
      _lastChangedAt: number
    } | null>
    nextToken?: string | null
    startedAt?: number | null
  } | null
}

export type OnCreateRoomSubscription = {
  onCreateRoom?: {
    __typename: 'Room'
    id: string
    name: string
    description?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type OnUpdateRoomSubscription = {
  onUpdateRoom?: {
    __typename: 'Room'
    id: string
    name: string
    description?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type OnDeleteRoomSubscription = {
  onDeleteRoom?: {
    __typename: 'Room'
    id: string
    name: string
    description?: string | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type OnCreateChatMessageSubscription = {
  onCreateChatMessage?: {
    __typename: 'ChatMessage'
    id: string
    type: string
    data: string
    chanelId: string
    sendId: string
    datetime: string
    readed: boolean
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type OnUpdateChatMessageSubscription = {
  onUpdateChatMessage?: {
    __typename: 'ChatMessage'
    id: string
    type: string
    data: string
    chanelId: string
    sendId: string
    datetime: string
    readed: boolean
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}

export type OnDeleteChatMessageSubscription = {
  onDeleteChatMessage?: {
    __typename: 'ChatMessage'
    id: string
    type: string
    data: string
    chanelId: string
    sendId: string
    datetime: string
    readed: boolean
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
}
