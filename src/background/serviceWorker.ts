async function actionBalance({ tabId, balance }: MessageData['serviceWorker']['balance']) {
  $balance.actions.set(tabId, balance)
  await createOffscreenDocument()
  sendMessage('offscreen', 'balance', { tabId, balance, mediaStreamId: await $mediaStreamId.actions.setOrGet(tabId) })
}

async function actionToggle({ tabId }: MessageData['serviceWorker']['toggle']) {
  setBedge(tabId, $mute.actions.get(tabId) ? '' : 'mute')
  await createOffscreenDocument()
  sendMessage('offscreen', 'toggle', {
    tabId,
    mute: $mute.actions.toggle(tabId),
    mediaStreamId: await $mediaStreamId.actions.setOrGet(tabId),
  })
}

async function actionStop({ tabId }: MessageData['serviceWorker']['stop']) {
  setBedge(tabId, '')
  await createOffscreenDocument()
  sendMessage('offscreen', 'stop', { tabId })
}

listenMessage((payload) => {
  if (payload.target !== 'serviceWorker') return

  switch (payload.action) {
    case 'balance': return actionBalance(payload.data)
    case 'toggle': return actionToggle(payload.data)
    case 'stop': return actionStop(payload.data)
  }
})

listenCommand((command, tab) => {
  if (!tab?.id) return

  if ([CommandsEnum.balanceLeft, CommandsEnum.balanceRight, CommandsEnum.balanceCenter].includes(command as CommandsEnum)) {
    const current = +($balance.actions.get(tab.id) ?? BALANCE_DEFAULT)
    let newBalance: number

    if (command === CommandsEnum.balanceCenter) {
      newBalance = 0
    }
    else {
      const step = command === CommandsEnum.balanceLeft ? -50 : 50
      newBalance = Math.max(-100, Math.min(100, current + step))
    }

    actionBalance({ tabId: tab.id, balance: `${newBalance}` })
  }

  if (command === CommandsEnum.toggle) actionToggle({ tabId: tab.id })
})

listenInstalled(({ reason }) => {
  if (reason !== chrome.runtime.OnInstalledReason.UPDATE) return

  $balance.actions.removeAll()
  $mute.actions.removeAll()
  $mediaStreamId.actions.removeAll()
})

listenTabRemoved(async (tabId) => {
  if (!$mediaStreamId.actions.has(tabId)) return

  $balance.actions.remove(tabId)
  $mute.actions.remove(tabId)
  $mediaStreamId.actions.remove(tabId)
  await createOffscreenDocument()
  sendMessage('offscreen', 'stop', { tabId })
})

listenCaptureStatus(({ status, tabId }) => {
  if (status !== chrome.tabCapture.TabCaptureState.STOPPED) return
  if (!$mediaStreamId.actions.has(tabId)) return

  setBedge(tabId, '')
  $balance.actions.remove(tabId)
  $mute.actions.remove(tabId)
  $mediaStreamId.actions.remove(tabId)
})

listenNavigation(async ({ frameId, tabId }) => {
  if (frameId !== 0) return
  if (!$mediaStreamId.actions.has(tabId)) return

  if ($options.value.stopOnReload) {
    setBedge(tabId, '')
    await createOffscreenDocument()
    sendMessage('offscreen', 'stop', { tabId })

    return
  }
})

listenConnect(async (port) => {
  if (port.name !== 'popup') return

  const tabId = await getCurrentTabId()

  if (!tabId) return

  port.onDisconnect.addListener(async () => {
    if ($balance.actions.get(tabId) !== undefined && $balance.actions.get(tabId) !== BALANCE_DEFAULT) return

    setBedge(tabId, '')
    await createOffscreenDocument()
    sendMessage('offscreen', 'stop', { tabId })
  })
})

export {}
