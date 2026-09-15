<script setup lang="ts">
import { computed, inject, onMounted, useTemplateRef } from 'vue'
import { splitString } from '@/helpers'

import type { ComputedRef } from 'vue'

defineProps<{ data: { title: string | null } }>()

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
    <p class="second-text__text">{{ data.title }}</p>
  </div>
</template>

<style scoped lang="scss">
.second-text {
  display: flex;
  justify-content: center;
  align-items: center;

  height: clamp(80svh, 160vw, 100svh);
  text-align: center;

  &__text {
    max-width: 100rem;
    padding-inline: var(--padding-container);

    font-family: 'Youth', sans-serif;
    @include mix.text-style(clamp(5rem, 13.3vw, 10.6rem), $lineHeight: 1);
    letter-spacing: -0.5rem;

    transform: translateY(min(0.001px, -100px + v-bind('scrollTextProgress') * 200px));
    will-change: transform;

    & > :deep(span) {
      opacity: max(0.4, v-bind('scrollTextProgress') / (var(--char-index) / var(--text-length)));
      will-change: opacity;

      @include mix.media(tablet) {
        opacity: 1;
      }
    }

    @include mix.media(mobile) {
      transform: none;
      letter-spacing: -0.2rem;
    }
  }
}
</style>
