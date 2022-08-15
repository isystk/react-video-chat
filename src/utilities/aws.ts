const config = {
  websocketUrl: process.env.REACT_APP_AWS_WEBSOCKET_URL,
}

type Event = {
  type: string
  func: (e: MessageEvent) => void
}

export type WebSocket = {
  disconnect: (func) => void
  unicast: (connectionId, data) => void
  error: (func) => void
  close: () => void
  connect: (func) => void
  multicast: (data) => void
  on: (type: string, func) => void
}

let ws
export const startWebsocket = (roomId): WebSocket | null => {
  if (!config.websocketUrl) {
    console.error("'REACT_APP_AWS_WEBSOCKET_URL' is not defined.")
    return null
  }
  const url = `${config.websocketUrl}?roomId=${roomId}`
  const event = [] as Event[]
  ws = new WebSocket(url)
  ws.onmessage = function (e) {
    // WebSocket接続先からデータ受け取り
    // いずれかのクライアントが sendMessage すると呼び出される
    // console.log('onmessage', e)
    const data = JSON.parse(e.data)
    event.forEach(({ type, func }) => {
      if (data.type === type) {
        func(data)
      }
    })
  }
  const result = {
    connect: (func) => {
      ws.onopen = function (e) {
        // WebSocket接続
        // ルート $onconnect
        // console.log('onopen', e)
        func(e)
      }
    },
    disconnect: (func) => {
      ws.onclose = function (e) {
        // WebSocket接続終了
        // ルート $disconnect
        // console.log('onclose', e)
        func(e)
      }
    },
    error: (func) => {
      ws.onerror = function (e) {
        //
        console.error(e)
        func(e)
      }
    },
    on: (type: string, func) => {
      event.push({ type, func })
    },
    multicast: (data) => {
      ws.send(`{ "action": "sendmessage", "data": ${JSON.stringify(data)} }`)
      // ルート sendmessage
    },
    unicast: (connectionId, data) => {
      ws.send(
        `{ "action": "sendmessage", "target": ${connectionId}. "data": ${JSON.stringify(
          data
        )} }`
      )
      // ルート sendmessage
    },
    close: () => {
      ws.close()
    },
  }
  return result
}
