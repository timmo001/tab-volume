export const $audibleTabs = xoid.atom(<Record<TabId, TabInfo>>{}, state => ({
  fetch: async () => {
    state.value = (await getAudibleTabs())
      .filter((tab): tab is chrome.tabs.Tab & { id: TabId, title: string } => tab.id !== undefined && tab.title !== undefined)
      .sort((tab1, tab2) => tab2.id - tab1.id)
      .reduce((acc: Record<TabId, TabInfo>, tab) => {
        return _.set(acc, tab.id, {
          id: tab.id,
          title: tab.title,
          favIconUrl: tab.favIconUrl,
          balance: $balance.actions.get(tab.id) ?? BALANCE_DEFAULT,
        } satisfies TabInfo)
      }, _.cloneDeep(state.value))
  },
  updateBalance: () => {
    state.value = _.each(_.cloneDeep(state.value), tabInfo => tabInfo.balance = $balance.actions.get(tabInfo.id) ?? BALANCE_DEFAULT)
  },
}))

listenTabUpdated((_, changeInfo) => {
  if (['audible', 'favIconUrl', 'title'].some(prop => Object.hasOwn(changeInfo, prop))) $audibleTabs.actions.fetch()
})

$balance.subscribe($audibleTabs.actions.updateBalance)

$audibleTabs.actions.fetch()
