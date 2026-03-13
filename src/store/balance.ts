export const BALANCE_DEFAULT = '0'

export const $balance = xoid.atom(<Record<TabId, string>>{}, state => ({
  get: (tabId: TabId) => state.value[tabId],
  set: (tabId: TabId, balance: string) => setStorageItem('session', 'balance', tabId, balance),
  remove: (tabId: TabId) => unsetStorageItem('session', 'balance', tabId),
  removeAll: () => removeStorage('session', 'balance'),
}))

listenStorageChanged((changes, areaName) => areaName === 'session' && 'balance' in changes && $balance.update(() => changes['balance'].newValue as Record<TabId, string> ?? {}))

;(async () => $balance.value = await getStorage('session', 'balance') ?? {})()
