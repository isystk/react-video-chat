const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  region: process.env.AWS_REGION,
})

exports.handler = async (event, context) => {
  console.info('ondisconnect start')
  console.log(`event: ${JSON.stringify(event)}`)
  console.log(`context: ${JSON.stringify(context)}`)

  //
  var params = {
    TableName: process.env.TABLE_NAME_CONNECTIONS,
    Key: {
      connectionId: event.requestContext.connectionId,
    },
  }
  const connection = await docClient.get(params).promise()
  console.log(`connection: ${JSON.stringify(connection)}`)

  var params = {
    TableName: process.env.TABLE_NAME_ROOM,
    Key: {
      roomId: connection.Item.roomId,
    },
  }
  const room = await docClient.get(params).promise()
  console.log(`room: ${JSON.stringify(room)}`)

  // 自分以外のメンバーを取得する。
  const roomMembers = room.Item.connectionIds.filter((member) => {
    return member.connectionId != event.requestContext.connectionId
  })
  console.log(`I am : ${JSON.stringify(event.requestContext.connectionId)}`)
  console.log(`roomMembers: ${JSON.stringify(roomMembers)}`)

  // 自分以外のメンバーで登録し直す
  var params = {
    TableName: process.env.TABLE_NAME_ROOM,
    Item: {
      roomId: connection.Item.roomId,
      connectionIds: roomMembers,
    },
  }
  await docClient.put(params).promise()

  // connectionId を削除する。
  var deleteParams = {
    TableName: process.env.TABLE_NAME_CONNECTIONS,
    Key: {
      connectionId: event.requestContext.connectionId,
    },
  }
  await docClient.delete(deleteParams).promise()

  // Push Message
  // __________________________________________________
  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint:
      event.requestContext.domainName + '/' + event.requestContext.stage,
  })
  roomMembers.map(async ({ connectionId, username, icon }) => {
    console.log(`connectionId: ${JSON.stringify(connectionId)}`)
    var message = {
      type: 'unjoin',
      member: {
        connectionId: connectionId,
        username: username,
        icon: icon,
      },
      room: {
        users: roomMembers,
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

  console.info('ondisconnect end')
}
