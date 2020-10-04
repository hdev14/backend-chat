export enum MessageType {
  CONNECTION = 'connection',
  MESSAGE = 'message'
}

export type MessageData = {
  type: MessageType,
  author?: string,
  content: string,
  timestamp: Date
}
