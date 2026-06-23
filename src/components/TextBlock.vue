<script setup lang="ts">
import { splitString } from '@/helpers'
import { computed, inject, onMounted, useTemplateRef } from 'vue'

import type { ComputedRef } from 'vue'

const pageScrollY = inject<ComputedRef<number>>('pageScrollY')
const textBlockEl = useTemplateRef('textBlockEl')

const scrollTextProgress = computed(() => {
  const textHeight = textBlockEl.value?.offsetHeight ?? 0

  const scrollYWithoutHalfText = Math.max((pageScrollY?.value ?? 0) - textHeight / 2, 0)
  const scrollProgress = scrollYWithoutHalfText / textHeight

  return textHeight * 2 / textHeight * scrollProgress
})

function observeTextBlock(p: HTMLParagraphElement) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      textBlockEl.value?.classList.add('--transition')
      textBlockEl.value?.classList.add('--intersect')

      setTimeout(() => {
        textBlockEl.value?.classList.remove('--transition')
      }, 300)
    })
  }, { threshold: 1, rootMargin: `${innerHeight / 2 - 150}px 0px -${innerHeight / 2 - 150}px` })

  observer.observe(p)
}

function observeHero() {
  const hero = document.querySelector('.hero')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      textBlockEl.value?.classList.add('--transition')
      textBlockEl.value?.classList.remove('--intersect')

      setTimeout(() => {
        textBlockEl.value?.classList.remove('--transition')
      }, 300)
    })
  }, { threshold: [0, 1] })

  observer.observe(hero!)
}

onMounted(() => {
  if (!textBlockEl.value) return
  const paragraphs = textBlockEl.value.querySelectorAll('p')

  // window.addEventListener('scroll', () => {
  //   let paragraph = paragraphs[0]

  //   paragraphs.forEach((p) => {
  //     if ((paragraph?.offsetHeight ?? 0) > p.offsetHeight) paragraph = p
  //   })

  //   const { top = 0 } = paragraph?.getBoundingClientRect() ?? {}
  //   const isIntersecting = innerHeight - top > 100

  //   if (isIntersecting) textBlockEl.value?.classList.add('--intersect')
  //   else textBlockEl.value?.classList.remove('--intersect')
  // })

  splitString(textBlockEl.value)
  observeTextBlock(paragraphs[0]!)
  observeHero()
})
</script>

<template>
  <div ref="textBlockEl" class="text-block">
    <div class="text-block__top">
      <p>We’ve reinvented the RV.</p>
    </div>

    <div class="text-block__bottom">
      <p>Pebble Flow anticipates your every need.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.text-block {
  $this: &;

  position: relative;
  z-index: vars.$ui_index-3;
  height: 140svh;

  font-family: 'Youth', serif;
  font-size: 10.6rem;
  letter-spacing: -0.5rem;
  text-align: center;

  color: #a39b8b;
  background: var(--background-color);

  &__top, &__bottom {
    @include mix.absolute-center;
    max-width: 160rem;
    width: 100%;
  }

  &__top {
    z-index: vars.$ui_index-1;

    & > p > :deep(span) {
      opacity: max(0.2, 1 - var(--char-index) / var(--text-length) + v-bind('scrollTextProgress') - (var(--text-length) - var(--char-index)) / 100);

      #{$this}.--intersect & {
        opacity: max(0, 1 - (v-bind('scrollTextProgress') * 2 - (var(--char-index) / var(--text-length))));
      }

      #{$this}.--transition & {
        transition: opacity 300ms;
      }
    }
  }

  &__bottom {
    // pointer-events: none;
    transform: translate(-50%, -25%);

    & > p :deep(span) {
      opacity: 0;

      #{$this}.--intersect & {
        opacity: min(1, v-bind('scrollTextProgress') / 2 - (var(--char-index) / var(--text-length) / 2));
      }
    }
  }
}
</style>
