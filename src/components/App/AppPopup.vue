<template>
  <div class="w-90 font-arial select-none py-3">
    <PopupHeader />
    <PopupBalance />
    <PopupTips v-if="tip" :tip="tip" />
    <PopupReset />
    <PopupTabs />
  </div>
</template>

<script setup lang="ts">
const options = useOptions()
const tip = useTip()

watch(() => options.value.darkMode, value => window.document.body.classList.toggle('dark', value), { immediate: true })
</script>
