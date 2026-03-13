export interface TabInfo {
  id: TabId
  title: string
  favIconUrl: chrome.tabs.Tab['favIconUrl']
  balance: string
  muted: boolean
}
