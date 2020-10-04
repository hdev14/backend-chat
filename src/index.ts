import WebSocket from 'ws'
import { sendMessage } from './helpers'
import { MessageType, MessageData } from './message-types'

let connectionCount = 0

const wsServer = new WebSocket.Server({ port: 4141 })

wsServer.on('connection', function (ws, request) {
  connectionCount++
  console.log(`${connectionCount} clients connected`)
  ws.url = request.url || ''

  wsServer.clients.forEach(function (client) {
    sendMessage(ws, client, {
      type: MessageType.CONNECTION,
      content: 'conectado(a)',
      timestamp: new Date()
    })
  })

  ws.on('message', function (data) {
    const messageData = <MessageData>JSON.parse(<string>data)
    wsServer.clients.forEach(function (client) {
      sendMessage(ws, client, messageData)
    })
  })

  ws.on('close', function () {
    connectionCount--
    console.log(`${connectionCount} clients connected`)
    wsServer.clients.forEach(function (client) {
      sendMessage(ws, client, {
        type: MessageType.CONNECTION,
        content: 'desconectado(a)',
        timestamp: new Date()
      })
    })
  })
})
