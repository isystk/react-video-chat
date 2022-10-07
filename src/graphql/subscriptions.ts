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
    }
  }
`
