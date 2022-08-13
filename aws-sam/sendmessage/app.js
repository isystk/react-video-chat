const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  region: process.env.AWS_REGION,
})

exports.handler = async (event, context) => {
  console.info('sendmessage start')
  console.log(`event: ${JSON.stringify(event)}`)
  console.log(`context: ${JSON.stringify(context)}`)

  const { connectionId } = event.requestContext
  //
  var params = {
    TableName: process.env.TABLE_NAME_CONNECTIONS,
    Key: {
      connectionId: connectionId,
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

  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint:
      event.requestContext.domainName + '/' + event.requestContext.stage,
  })

  let postData = JSON.parse(event.body).data
  console.log(`postData: ${JSON.stringify(postData)}`)

  const postCalls = room.Item.connectionIds.map(async ({ connectionId }) => {
    try {
      await apigwManagementApi
        .postToConnection({
          ConnectionId: connectionId,
          Data: postData,
        })
        .promise()
    } catch (e) {
      // if (e.statusCode === 410) {
      //   console.log(`Found stale connection, deleting ${connectionId}`)
      //   await docClient
      //     .delete({
      //       TableName: process.env.TABLE_NAME_CONNECTIONS,
      //       Key: {
      //         connectionId,
      //       },
      //     })
      //     .promise()
      // } else {
      //   throw e
      // }
      console.log(e)
    }
  })

  try {
    await Promise.all(postCalls)
  } catch (e) {
    return {
      statusCode: 500,
      body: e.stack,
    }
  }

  console.info('sendmessage end')
  return {
    statusCode: 200,
    body: 'Data sent.',
  }
}
