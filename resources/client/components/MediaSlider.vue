<script setup lang="ts">
import { computed, inject, useTemplateRef } from 'vue'
import { useMediaQuery } from '@/composables'
import { data } from '@/assets/data/mediaSlider'

import { MediaSliderBlock, RenderMedia } from '@/components'
import type { ComputedRef } from 'vue'

const mediaSliderEl = useTemplateRef('mediaSliderEl')
const pageScrollY = inject<ComputedRef<number>>('pageScrollY')
const isTablet = useMediaQuery('(max-width: 1024px)')

const scrollSliderProgress = computed(() => {
  const sliderHeight = mediaSliderEl.value?.offsetHeight ?? 0
  const { children } = mediaSliderEl.value?.parentElement ?? {}
  let height = 0

  for (const element of children ?? []) {
    if (element === mediaSliderEl.value) break
    height += (element as HTMLElement).offsetHeight
  }

  const y = (pageScrollY?.value ?? 0) - height - (isTablet.value ? innerHeight : 0)
  const scrollProgress = (y + innerHeight * 0.66) / (sliderHeight - innerHeight * 0.33)

  return Math.min(1, Math.max(0, scrollProgress))
})
</script>

<template>
  <div
    ref="mediaSliderEl"
    data-logo-dark
    class="media-slider"
    :style="{ '--media-count': data.length }"
  >
    <div class="media-slider__wrapper">
      <div class="media-slider__container">
        <MediaSliderBlock
          :scroll-progress="scrollSliderProgress"
        />

        <div class="media-slider__images">
          <div
            v-for="(item, i) of data"
            :key="item.src"
            class="media-slider__image"
            :style="{ '--media-index': i }"
          >
            <RenderMedia :data="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.media-slider {
  $padding: 1.8rem;

  position: relative;
  z-index: vars.$ui-index-2;

  &__wrapper {
    position: sticky;
    top: 0;

    height: 810svh;
    background: var(--text-color);
  }

  &__container {
    $gap: 0.8rem;
    position: sticky;
    top: 0;

    display: grid;
    grid-template-columns: 36.5% calc(63.5% - $gap);
    gap: $gap;

    height: 100svh;
    padding: $padding;

    @include mix.media(tablet) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(2, 1fr);
      padding: calc(var(--padding-container) / 2);
    }
  }

  &__images {
    position: relative;
    @include mix.full-size;

    overflow: hidden;
    border-radius: clamp(1.6rem, mix.ruber(2.4), 3.2rem);
  }

  &__image {
    @include mix.absolute-cover;

    pointer-events: none;
    border-radius: clamp(1.6rem, mix.ruber(2.4), 3.2rem);
    overflow: hidden;

    &:first-child {
      & > :is(img, video) {
        transform: translateY(min(0.001px, v-bind('scrollSliderProgress') * -70%));
      }
    }

    &:not(:first-child) {
      transform: translateY(max(0.001px, (var(--media-index) * 100%) - v-bind('scrollSliderProgress') * (var(--media-count) * 100%)));
      will-change: transform;

      & > :is(img, video) {
        transform: translateY(min(0.001px, (var(--media-index) * 100%) - v-bind('scrollSliderProgress') * (var(--media-count) * -100%)));
      }
    }

    & > :is(img, video) {
      @include mix.full-size;
      object-fit: cover;
      will-change: transform;
    }
  }
}
</style>
