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
      }
      nextToken
    }
  }
`
