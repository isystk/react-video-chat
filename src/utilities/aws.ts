const config = {
  websocketUrl: process.env.REACT_APP_AWS_WEBSOCKET_URL,
}
let ws
export const startWebsocket = (roomId) => {
  if (!config.websocketUrl) {
    console.error("'REACT_APP_AWS_WEBSOCKET_URL' is not defined.")
    return
  }
  const url = `${config.websocketUrl}?roomId=${roomId}`
  ws = new WebSocket(url)
  const result = {
    on: (type, callback) => {
      ws.onmessage = function (e) {
        // WebSocket接続先からデータ受け取り
        // いずれかのクライアントが sendMessage すると呼び出される
        const data = JSON.parse(e.data)
        console.log('message', data)
        if (data.type === type) {
          callback(data)
        }
      }
    },
    push: (message) => {
      ws.send(`{ "action": "sendmessage", "data": "${message}"}`)
      // ルート sendmessage
    },
  }
  ws.onopen = function (e) {
    // WebSocket接続
    // ルート $onconnect
    console.log('onopen', e)
  }
  ws.onclose = function (e) {
    // WebSocket接続終了
    // ルート $disconnect
    console.log('onclose', e)
  }
  ws.onerror = function (e) {
    //
    console.error(e)
  }
  return result
}
