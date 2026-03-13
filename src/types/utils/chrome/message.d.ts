export interface MessageData {
  serviceWorker: {
    balance: { tabId: TabId, balance: string }
    toggle: { tabId: TabId }
    stop: { tabId: TabId }
  }
  offscreen: {
    balance: { tabId: TabId, balance: string, mediaStreamId: string }
    toggle: { tabId: TabId, mute: boolean, mediaStreamId: string }
    stop: { tabId: TabId }
  }
}

export type MessagePayload = {
  [T in keyof MessageData]: {
    [A in keyof MessageData[T]]: {
      target: T
      action: A
      data: MessageData[T][A]
    }
  }[keyof MessageData[T]]
}[keyof MessageData]
