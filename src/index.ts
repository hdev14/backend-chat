import Websocket from 'ws'

const wsServer = new Websocket.Server({ port: 4141 })

const getChatId = function (url: string | undefined): string | null {
  const params = url?.split('/')[1]
  const chatId = (new URLSearchParams(params)).get('id')
  return chatId
}

const sendMessage = function (chatId: string | null, client: Websocket, message: Websocket.Data) {
  const clientChatId = getChatId(client.url)
  if (clientChatId === chatId) {
    client.send(message)
  }
}

wsServer.on('connection', function (ws, request) {
  ws.url = request.url || ''
  const chatId = getChatId(ws.url)
  ws.on('message', function (message) {
    wsServer.clients.forEach(function (client) {
      if (client.readyState === Websocket.OPEN && client !== ws) {
        client.send(message)
        sendMessage(chatId, client, message)
      }
    })
  })

  console.log(`Chat ID -> ${chatId}`)
  console.log('Connection is open...')
})
