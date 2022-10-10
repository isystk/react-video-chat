/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
import { gql } from '@apollo/client'

export const onCreateRoom = gql`
  subscription OnCreateRoom {
    onCreateRoom {
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
export const onUpdateRoom = gql`
  subscription OnUpdateRoom {
    onUpdateRoom {
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
export const onDeleteRoom = gql`
  subscription OnDeleteRoom {
    onDeleteRoom {
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
export const onCreateChatMessage = gql`
  subscription OnCreateChatMessage {
    onCreateChatMessage {
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
export const onUpdateChatMessage = gql`
  subscription OnUpdateChatMessage {
    onUpdateChatMessage {
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
export const onDeleteChatMessage = gql`
  subscription OnDeleteChatMessage {
    onDeleteChatMessage {
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
