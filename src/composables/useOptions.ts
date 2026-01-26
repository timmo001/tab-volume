export default function () {
  const optionsRef = ref(_.cloneDeep($options.value))

  const unsubscribe = $options.subscribe((value) => {
    optionsRef.value = _.cloneDeep(value)
  })

  if (getCurrentScope()) onScopeDispose(unsubscribe)

  return optionsRef
}
