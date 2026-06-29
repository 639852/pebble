<script setup lang="ts">
import { provide, ref } from 'vue'
import { AppHeader, AppHero, MediaSlider, SecondTextBlock, SplitImages, TextBlock } from '@/components'

const scrollProgress = ref(0)
const pageScrollY = ref(0)

window.addEventListener('scroll', () => {
  scrollProgress.value = scrollY / document.body.offsetHeight
  pageScrollY.value = scrollY
})

provide('scrollProgress', scrollProgress)
provide('pageScrollY', pageScrollY)
</script>

<template>
  <div class="layout">
    <div class="layout__header">
      <AppHeader />
    </div>
    <main class="layout__content">
      <AppHero />
      <TextBlock />
      <SplitImages />
      <SecondTextBlock />
      <MediaSlider />
    </main>
    <div class="layout__footer"></div>
  </div>
</template>

<style lang="scss">
@use 'assets/scss/fonts';
@use 'assets/scss/index';
@use 'assets/scss/transitions'
</style>
