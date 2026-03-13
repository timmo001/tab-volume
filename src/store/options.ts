export const optionsDefaults: Options = {
  darkMode: true,
  stopOnReload: true,
  tipsHide: false,
  tipsHideUntil: undefined,
  tipsLastShowedIndex: undefined,
  tipSupportHide: false,
  tipSupportHideUntil: undefined,
}

export const $options = xoid.atom(optionsDefaults, () => ({
  set: (options: Options) => setStorage('local', 'options', options),
}))

listenStorageChanged((changes, areaName) => areaName === 'local' && 'options' in changes && $options.update(() => changes['options'].newValue as Options ?? optionsDefaults))

;(async () => $options.value = await getStorage('local', 'options') ?? optionsDefaults)()
