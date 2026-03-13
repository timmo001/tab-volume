<template>
  <div class="min-h-dvh flex flex-col items-center">
    <main class="grid m-auto py-10 px-6 w-full max-w-87.5 text-slate-950 dark:text-slate-50">
      <header class="select-none mb-8">
        <div class="inline-flex items-center gap-3.75 -mx-4 px-4 -my-2.5 py-2.5">
          <img class="size-7.5" src="/src/assets/images/logo-icon.svg" alt="">
          <SvgLogoName class="w-28.5 text-slate-800 dark:text-slate-50" />
        </div>
      </header>
      <form class="grid grid-cols-[1fr_auto] font-arial items-baseline gap-x-2.5 gap-y-5 mb-10 [&>label]:text-base [&>label]:leading-[130%] [&>label]:col-span [&>label]:-m-2 [&>label]:p-2 [&>label]:cursor-pointer [&>label]:select-none">
        <label for="darkMode">{{ loc('options_label_dark_mode') }}</label>
        <div class="flex justify-center">
          <BaseCheckbox v-model="options.darkMode" :pt-input="{ id: 'darkMode' }" @change="save" />
        </div>
        <label for="stopOnReload">{{ loc('options_label_stop_on_reload') }}</label>
        <div class="flex justify-center">
          <BaseCheckbox v-model="options.stopOnReload" :pt-input="{ id: 'stopOnReload' }" @change="save" />
        </div>
        <label for="tipsHide">{{ loc('options_label_tips_hide') }}</label>
        <div class="flex justify-center">
          <BaseCheckbox v-model="options.tipsHide" :pt-input="{ id: 'tipsHide' }" @change="save" />
        </div>
      </form>
      <ul class="grid gap-3 font-arial text-sm leading-[130%] text-pretty [&_a]:text-blue-600 [&_a]:hover:text-blue-500 dark:[&_a]:text-blue-500 dark:[&_a]:hover:text-blue-400">
        <li v-html="loc('options_footer_github')" />
      </ul>
    </main>
  </div>
</template>

<script setup lang="ts">
import SvgLogoName from '~/assets/images/logo-name.svg?component'

const options = useOptions()

function save() {
  $options.actions.set(options.value)
}

watch(() => options.value.darkMode, value => window.document.body.classList.toggle('dark', value), { immediate: true })
</script>
