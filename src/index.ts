import Websocket from 'ws'

const wsServer = new Websocket.Server({ port: 4141 })

wsServer.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log(`Received: ${message}`)
  })

  console.log('Connection is open...')
})
