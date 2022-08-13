const config = {
  websocketUrl: process.env.REACT_APP_AWS_WEBSOCKET_URL,
}

export type WebSocket = {
  on: (type: string, func: (data: any) => void) => void
  push: (data: any) => void
}

let ws
export const startWebsocket = (roomId): WebSocket | null => {
  if (!config.websocketUrl) {
    console.error("'REACT_APP_AWS_WEBSOCKET_URL' is not defined.")
    return null
  }
  const url = `${config.websocketUrl}?roomId=${roomId}`
  ws = new WebSocket(url)
  const result = {
    on: (type, callback) => {
      ws.onopen = function (e) {
        // WebSocket接続
        // ルート $onconnect
        console.log('onopen', e)
        if ('onopen' === type) {
          callback(e)
        }
      }
      ws.onclose = function (e) {
        // WebSocket接続終了
        // ルート $disconnect
        console.log('onclose', e)
        if ('onclose' === type) {
          callback(e)
        }
      }
      ws.onerror = function (e) {
        //
        console.error(e)
        if ('onerror' === type) {
          callback(e)
        }
      }
      ws.onmessage = function (e) {
        // WebSocket接続先からデータ受け取り
        // いずれかのクライアントが sendMessage すると呼び出される
        console.log('onmessage', e)
        const data = JSON.parse(e.data)
        if (data.type === type) {
          callback(data)
        }
      }
    },
    push: (data) => {
      console.log(JSON.stringify(JSON.stringify(data)))
      ws.send(
        `{ "action": "sendmessage", "data": ${JSON.stringify(
          JSON.stringify(data)
        )} }`
      )
      // ルート sendmessage
    },
  } as WebSocket
  return result
}
