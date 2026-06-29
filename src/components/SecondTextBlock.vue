<script setup lang="ts">
import { computed, inject, onMounted, useTemplateRef } from 'vue'
import { splitString } from '@/helpers'

import type { ComputedRef } from 'vue'

const textEl = useTemplateRef('textEl')
const pageScrollY = inject<ComputedRef<number>>('pageScrollY')

const scrollTextProgress = computed(() => {
  const textHeight = textEl.value?.offsetHeight ?? 0

  const y = Math.max(pageScrollY?.value ?? 0, 0)
  const scrollProgress = y / textHeight

  return Math.min(1, Math.max(-0.4, scrollProgress - 4.9))
})

onMounted(() => {
  if (textEl.value) splitString(textEl.value)
})
</script>

<template>
  <div
    ref="textEl"
    class="second-text"
  >
    <p class="second-text__text">What others are saying about Pebble</p>
  </div>
</template>

<style scoped lang="scss">
.second-text {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100svh;
  text-align: center;

  &__text {
    max-width: 100rem;

    font-family: 'Youth', sans-serif;
    @include mix.text-style(10.6rem);
    line-height: 1;
    letter-spacing: -0.5rem;

    transform: translateY(min(0.001px, -100px + v-bind('scrollTextProgress') * 200px));

    & > :deep(span) {
      opacity: max(0.4, v-bind('scrollTextProgress') / (var(--char-index) / var(--text-length)));
    }
  }
}
</style>
