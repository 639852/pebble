<script setup lang="ts">
import { provide, ref } from 'vue'
import { AppFooter, AppHeader } from '@/components'

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
  <!-- inertia props from backend -->
  {{ console.log('props', $page.props) }}

  <div class="layout">
    <div class="layout__header">
      <AppHeader />
    </div>
    <main class="layout__content">
      <slot></slot>
    </main>
    <div class="layout__footer">
      <AppFooter />
    </div>
  </div>
</template>

<style lang="scss">
@use 'assets/scss/fonts';
@use 'assets/scss/index';
@use 'assets/scss/transitions';
</style>
