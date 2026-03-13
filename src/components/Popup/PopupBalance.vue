<template>
  <section class="px-5 pt-3">
    <div class="flex items-center justify-between text-[11px] font-bold text-gray-400 dark:text-gray-500 pb-1">
      <span>L</span>
      <span>{{ balanceLabel }}</span>
      <span>R</span>
    </div>
    <div class="relative">
      <div class="absolute overflow-hidden pointer-events-none top-1/2 -translate-y-1/2 w-full rounded-full">
        <div class="absolute inset-0 bg-blue-300 dark:bg-blue-900" />
        <div
          class="w-full h-2 bg-blue-600"
          :style="{
            '--tw-translate-x': `${barTranslateX}%`,
            '--tw-scale-x': `${barScaleX}`,
            'transform-origin': barOrigin,
          }"
        />
      </div>
      <input
        ref="input"
        v-model.number="inputValue"
        class="relative block appearance-none border-none w-full bg-transparent"
        :type="'range'"
        :step="1"
        :min="-100"
        :max="100"
        @input="onInput"
      >
    </div>
  </section>
</template>

<script setup lang="ts">
const inputValue = shallowRef(0)

const currentTabId = inject('currentTabId') as number

const tabBalance = useAtom($balance.focus(currentTabId))

const balanceLabel = computed(() => {
  if (inputValue.value === 0) return 'C'
  return inputValue.value < 0 ? `L${Math.abs(inputValue.value)}` : `R${inputValue.value}`
})

const rangePercentage = computed(() => (inputValue.value + 100) / 200)
const barTranslateX = computed(() => _.round((rangePercentage.value - 0.5) * 100, 2))
const barScaleX = computed(() => _.round(Math.abs(inputValue.value) / 200, 4))
const barOrigin = computed(() => inputValue.value <= 0 ? 'right' : 'left')

function onInput() {
  sendMessage('serviceWorker', 'balance', { tabId: currentTabId, balance: `${inputValue.value}` })
}

watch(() => tabBalance.value ?? BALANCE_DEFAULT, value => inputValue.value = +value, { immediate: true })
</script>

<style scoped>
@utility track {
  @apply h-6 cursor-pointer;
}

@utility thumb {
  @apply appearance-none size-5 rounded-full border-none outline-none transition-colors;
  @apply bg-blue-600;
}

@utility thumb-hover {
  @apply bg-blue-500;
}

input::-webkit-slider-runnable-track { @apply track; }
input::-moz-range-track { @apply track; }

input::-webkit-slider-thumb { @apply thumb; }
input::-moz-range-thumb { @apply thumb; }

input::-webkit-slider-thumb:hover { @apply thumb-hover; }
input::-moz-range-thumb:hover { @apply thumb-hover; }
</style>
