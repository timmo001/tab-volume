function actionBalance({ tabId, balance, mediaStreamId }: MessageData['offscreen']['balance']) {
  $mediaStream.actions.balance(tabId, balance, mediaStreamId)
}

function actionStop({ tabId }: MessageData['offscreen']['stop']) {
  $mediaStream.actions.remove(tabId)
}

listenMessage((payload) => {
  if (payload.target !== 'offscreen') return

  switch (payload.action) {
    case 'balance': return actionBalance(payload.data)
    case 'stop': return actionStop(payload.data)
  }
})

export {}
