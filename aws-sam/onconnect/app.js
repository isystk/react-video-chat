const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  region: process.env.AWS_REGION,
})

exports.handler = async (event, context) => {
  console.info('onconnect start')
  console.log(`event: ${JSON.stringify(event)}`)
  console.log(`context: ${JSON.stringify(context)}`)

  const { connectionId } = event.requestContext
  const { roomId = 'test' } = event.queryStringParameters
  console.log(`roomId: ${roomId}`)

  // Register WebSocket Connection ID
  var params = {
    TableName: process.env.TABLE_NAME_CONNECTIONS,
    Item: {
      connectionId: connectionId,
      roomId: roomId,
    },
  }
  try {
    await docClient.put(params).promise()
  } catch (err) {
    return {
      statusCode: 500,
      body: 'Failed to connect: ' + JSON.stringify(err),
    }
  }

  // Exist Room?
  var params = {
    TableName: process.env.TABLE_NAME_ROOM,
    Key: {
      roomId: roomId,
    },
  }
  const room = await docClient.get(params).promise()

  var users
  if (!room.Item) {
    // ルームが未作成の場合、新規で作成する。

    console.log('room is not exist')
    users = [
      {
        connectionId: connectionId,
        username: 'taro',
        icon: 'avatar',
      },
    ]
    var params = {
      TableName: process.env.TABLE_NAME_ROOM,
      Item: {
        roomId: roomId,
        connectionIds: users,
      },
    }
    await docClient.put(params).promise()
  } else {
    // ルームが存在する場合、既存のルームに入室する。

    console.log(`room: ${JSON.stringify(room.Item)}`)
    console.log(`connectionIds: ${JSON.stringify(room.Item.connectionIds)}`)

    room.Item.connectionIds.push({
      connectionId: connectionId,
      username: 'taro',
      icon: 'avatar',
    })
    users = room.Item.connectionIds

    console.log('room is exist')
    var params = {
      TableName: process.env.TABLE_NAME_ROOM,
      Item: {
        roomId: roomId,
        connectionIds: users,
      },
    }
    await docClient.put(params).promise()
  }

  // Push Message
  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint:
      event.requestContext.domainName + '/' + event.requestContext.stage,
  })
  console.log(`users: ${JSON.stringify(users)}`)
  users.map(async ({ connectionId, username, icon }) => {
    console.log(`connectionId: ${JSON.stringify(connectionId)}`)
    var message = {
      type: 'join',
      member: {
        connectionId: connectionId,
        username: username,
        icon: icon,
      },
      room: {
        users: users,
      },
    }
    try {
      await apigwManagementApi
        .postToConnection({
          ConnectionId: connectionId,
          Data: JSON.stringify(message),
        })
        .promise()
    } catch (e) {
      if (e.statusCode === 410) {
        console.log(`Found stale connection, deleting ${connectionId}`)
        await docClient
          .delete({
            TableName: process.env.TABLE_NAME_CONNECTIONS,
            Key: {
              connectionId,
            },
          })
          .promise()
      } else {
        console.error(`e: ${JSON.stringify(e)}`)
        throw e
      }
    }
  })

  console.info('onconnect end')
  return {
    statusCode: 200,
    body: 'Connection Success.',
  }
}
