export const $mediaStream = xoid.atom(new Map<TabId, [MediaStreamAudioSourceNode, GainNode, StereoPannerNode]>(), state => ({
  setOrGet: pMemoize(async (tabId: TabId, mediaStreamId: string) => {
    if (state.value.has(tabId)) return state.value.get(tabId) as [MediaStreamAudioSourceNode, GainNode, StereoPannerNode]

    const userMedia = await getUserMedia(mediaStreamId)
    state.value = state.value.set(tabId, userMedia)

    return userMedia
  }, { cache: false }),
  balance: async (tabId: TabId, balance: string, mediaStreamId: string) => {
    const [,, pannerNode] = await $mediaStream.actions.setOrGet(tabId, mediaStreamId)

    pannerNode.pan.value = Number((+balance / 100).toFixed(2))
  },
  toggle: async (tabId: TabId, mute: boolean, mediaStreamId: string) => {
    const [, gainNode] = await $mediaStream.actions.setOrGet(tabId, mediaStreamId)

    if (mute === false) {
      $mediaStream.actions.remove(tabId)
    }
    else {
      gainNode.gain.value = 0
    }
  },
  remove: (tabId: TabId) => {
    const [sourceNode] = state.value.get(tabId) ?? []
    if (!sourceNode) return
    state.value.delete(tabId)
    stopCapture(sourceNode)
  },
}))
