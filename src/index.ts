import WebSocket from 'ws'

type MessageData = {
  message: string
  date: Date
}

let connectionCount = 0

const wsServer = new WebSocket.Server({ port: 4141 })

const getUrlParam = function (url: string, field: string): string | null {
  const params = url?.split('/')[1]
  return (new URLSearchParams(params)).get(field)
}

const isSameChatId = function (currentUrl: string, clientUrl: string): boolean {
  return getUrlParam(currentUrl, 'id') === getUrlParam(clientUrl, 'id')
}

const sendMessage = function (current: WebSocket, client: WebSocket, messageData: MessageData) {
  if (client !== current &&
    client.readyState === WebSocket.OPEN &&
    isSameChatId(current.url, client.url)) {
    const data = JSON.stringify({
      name: getUrlParam(client.url, 'name'),
      ...messageData
    })
    client.send(data)
  }
}

wsServer.on('connection', function (ws, request) {
  connectionCount++
  ws.url = request.url || ''

  ws.on('message', function (data) {
    const messageData = <MessageData>JSON.parse(<string>data)
    wsServer.clients.forEach(function (client) {
      sendMessage(ws, client, messageData)
    })
  })

  ws.on('close', function () {
    wsServer.clients.forEach(function (client) {
      sendMessage(ws, client, {
        message: 'desconectado',
        date: new Date()
      })
    })
  })

  console.log(`${connectionCount} clients connected`)
})
