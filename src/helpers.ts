import WebSocket from 'ws'
import { MessageData } from './message-types'

export function getUrlParam (url: string, field: string): string | null {
  const params = url?.split('/')[1]
  return (new URLSearchParams(params)).get(field)
}

export function isSameChatId (currentUrl: string, clientUrl: string): boolean {
  return getUrlParam(currentUrl, 'id') === getUrlParam(clientUrl, 'id')
}

export function sendMessage (current: WebSocket, client: WebSocket, messageData: MessageData): void {
  if (client !== current &&
    client.readyState === WebSocket.OPEN &&
    isSameChatId(current.url, client.url)) {
    const data = JSON.stringify({
      ...messageData,
      author: getUrlParam(current.url, 'name')
    })
    client.send(data)
  }
}
