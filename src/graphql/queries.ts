/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
import { gql } from '@apollo/client'

export const getRoom = gql`
  query GetRoom($id: ID!) {
    getRoom(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`
export const listRooms = gql`
  query ListRooms(
    $filter: ModelRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`
export const syncRooms = gql`
  query SyncRooms(
    $filter: ModelRoomFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRooms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`
export const getChatMessage = gql`
  query GetChatMessage($id: ID!) {
    getChatMessage(id: $id) {
      id
      type
      data
      chanelId
      sendId
      datetime
      readed
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`
export const listChatMessages = gql`
  query ListChatMessages(
    $filter: ModelChatMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        data
        chanelId
        sendId
        datetime
        readed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`
export const syncChatMessages = gql`
  query SyncChatMessages(
    $filter: ModelChatMessageFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncChatMessages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        type
        data
        chanelId
        sendId
        datetime
        readed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`
