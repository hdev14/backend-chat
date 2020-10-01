import Websocket from 'ws'

const wsServer = new Websocket.Server({ port: 4141 })

const getChatId = function (url: string | undefined): string | null {
  const params = url?.split('/')[1]
  const chatId = (new URLSearchParams(params)).get('id')
  return chatId
}

wsServer.on('connection', function (ws, request) {
  const chatId = getChatId(request.url)

  ws.on('message', function (message) {

  })

  console.log(`Chat ID -> ${getChatId(request.url)}`)
  console.log('Connection is open...')
})
