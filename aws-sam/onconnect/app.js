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

  const me = {
    connectionId: connectionId,
    username: 'taro',
    icon: 'avatar',
  }

  // Exist Room?
  var params = {
    TableName: process.env.TABLE_NAME_ROOM,
    Key: {
      roomId: roomId,
    },
  }
  const room = await docClient.get(params).promise()

  let users = []
  if (!room.Item) {
    // ルームが未作成の場合、新規で作成する。

    console.log('room is not exist')
    users = [me]
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

    if (!room.Item.connectionIds) {
      room.Item.connectionIds = []
    }
    room.Item.connectionIds.push(me)
    users = [...room.Item.connectionIds]

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
  // 自分以外のメンバーを取得する。
  const roomMembers = users.filter((user) => {
    return user.connectionId !== connectionId
  })
  for (const { connectionId } of roomMembers) {
    console.log(`connectionId: ${JSON.stringify(connectionId)}`)
    try {
      const message = {
        type: 'join',
        member: me,
        room: {
          users: users,
        },
      }
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
  }

  console.info('onconnect end')
  return {
    statusCode: 200,
    body: 'Connection Success.',
  }
}
