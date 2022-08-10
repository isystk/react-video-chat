const config = {
  websocketUrl: process.env.REACT_APP_AWS_WEBSOCKET_URL,
}
let ws
export const startWebsocket = () => {
  if (!config.websocketUrl) {
    console.error("'REACT_APP_AWS_WEBSOCKET_URL' is not defined.")
    return
  }
  ws = new WebSocket(config.websocketUrl)
  ws.onopen = function (e) {
    // WebSocket接続
    // ルート $onconnect
    console.log('onopen', e)
  }
  ws.onmessage = function (e) {
    // WebSocket接続先からデータ受け取り
    // いずれかのクライアントが sendMessage すると呼び出される
    console.log('message', e)
  }
  ws.onclose = function (e) {
    // WebSocket接続終了
    // ルート $disconnect
    console.log('onclose', e)
    setTimeout(function () {
      startWebsocket()
    }, 500)
  }
  ws.onerror = function (e) {
    //
    console.error(e)
  }
}
export const sendMessage = (message) => {
  ws.send(`{ "action": "sendmessage", "data": "${message}"}`)
  // ルート sendmessage
}
