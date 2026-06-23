<script setup lang="ts">
import { computed, inject, onMounted, ref, useTemplateRef } from 'vue'
import { firstImage, secondImage, video } from '@/assets/data/splitImages'

import type { ComputedRef } from 'vue'
import { splitString } from '@/helpers'

const pageScrollY = inject<ComputedRef<number>>('pageScrollY')
const splitImagesEl = useTemplateRef('splitImagesEl')
const isLeft = ref(true)

const scrollImagesProgress = computed(() => {
  const image = splitImagesEl.value?.querySelector('img')
  const imagesHeight = image?.offsetHeight ?? 0

  const y = Math.max(pageScrollY?.value ?? 0, 0)
  const scrollProgress = y / imagesHeight

  return scrollProgress - 1.9
})

const titleTransform = computed(() => `${Math.max(0, Math.round((1 - scrollImagesProgress.value * 1.5) * 50))}px`)

function onMouseMove(event: MouseEvent) {
  const target = event.target as HTMLElement

  if (scrollImagesProgress.value > 1) return
  if (target.classList.contains('split-images__right-container')) {
    isLeft.value = false
  } else if (target.classList.contains('split-images__right')) {
    isLeft.value = true
  }
}

onMounted(() => {
  if (!splitImagesEl.value) return
  splitString(splitImagesEl.value, '.split-images__title span')
})
</script>

<template>
  <div
    ref="splitImagesEl"
    class="split-images"
    :class="{ '--video': scrollImagesProgress > 1, '--left': isLeft, '--right': !isLeft, '--end': scrollImagesProgress > 2.6 }"
    @mousemove="onMouseMove"
  >
    <div class="split-images__wrapper">
      <div class="split-images__container">
        <div class="split-images__video">
          <video
            loop
            muted
            autoplay
            playsinline
            :src="video"
          />

          <div class="split-images__title">
            <span>And on the road</span>
          </div>

          <p class="split-images__text --right">
            Aerodynamic design and a dual-motor Active Tow Assist System will have you wondering if you are towing anything at all. Range anxiety is a thing of the past when towing with an EV.
          </p>
        </div>

        <div class="split-images__left">
          <div class="split-images__left-container">
            <div class="split-images__image">
              <img :src="firstImage" alt="">
            </div>
          </div>

          <div class="split-images__title --left">
            <span>On-grid</span>
          </div>

          <p class="split-images__text">
            At home, the Pebble Flow is never idle. Use it as a bonus room, an office or a rental space. It can even be used as a back-up battery.
          </p>
        </div>

        <div class="split-images__right">
          <div class="split-images__right-container">
            <div class="split-images__image">
              <img :src="secondImage" alt="">
            </div>
          </div>

          <div class="split-images__title --right">
            <span>Off-grid</span>
          </div>

          <p class="split-images__text --right">
            Escape to the great outdoors for up to 7 days completely off-grid. Say goodbye to generators and propane tanks. The Pebble Flow’s massive battery and integrated solar panels adapt to your needs, promising true freedom.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.split-images {
  $this: &;
  $padding: 1.8rem;

  position: relative;
  z-index: vars.$ui-index-2;

  &.--left {
    #{$this}__right-container {
      transform: translateX(60%);
    }

    #{$this}__right #{$this}__image {
      transform: translateX(-60%);
    }

    #{$this}__left #{$this}__text {
      transform: translateY(0);
    }

    #{$this}__right #{$this}__text {
      transform: translateY(calc(100% + $padding));
    }

    #{$this}__left #{$this}__title {
      transform: translate(8.5%, -50%);
    }

    #{$this}__right #{$this}__title {
      transform: translate(11.5%, -50%);
    }
  }

  &.--right {
    #{$this}__right-container {
      transform: translateX(40%);
    }

    #{$this}__right #{$this}__image {
      transform: translateX(-40%);
    }

    #{$this}__left #{$this}__text {
      transform: translateY(calc(100% + $padding));
    }

    #{$this}__right #{$this}__text {
      transform: translateY(0);
    }

    #{$this}__left #{$this}__title {
      transform: translate(-11.5%, -50%);
    }

    #{$this}__right #{$this}__title {
      transform: translate(-8.5%, -50%);
    }
  }

  &.--video {
    &.--left {
      #{$this}__right-container {
        transform: translateX(calc(31% + v-bind('scrollImagesProgress') * 26%));
      }

      #{$this}__right #{$this}__image {
        transform: translateX(calc(-31% + v-bind('scrollImagesProgress') * -26%));
      }

      #{$this}__left-container {
        transform: translateX(calc(-1.5% - v-bind('scrollImagesProgress') * 37.5%));
      }

      #{$this}__left #{$this}__image {
        transform: translateX(calc(1.5% - v-bind('scrollImagesProgress') * -37.5%));
      }
    }

    &.--right {
      #{$this}__right-container {
        transform: translateX(calc(1.5% + v-bind('scrollImagesProgress') * 37.5%));
      }

      #{$this}__right #{$this}__image {
        transform: translateX(calc(-1.5% + v-bind('scrollImagesProgress') * -37.5%));
      }

      #{$this}__left-container {
        transform: translateX(calc(-31% - v-bind('scrollImagesProgress') * 26%));
      }

      #{$this}__left #{$this}__image {
        transform: translateX(calc(31% - v-bind('scrollImagesProgress') * -26%));
      }
    }

    #{$this}__left #{$this}__title {
      & > span > :deep(span) {
        opacity: max(0, 1 - (var(--char-index) / var(--text-length) / 2) - (v-bind('scrollImagesProgress') - 1));
      }
    }

    #{$this}__right #{$this}__title {
      & > span > :deep(span) {
        opacity: max(0, 1 - (v-bind('scrollImagesProgress') * 2) + (var(--char-index) / var(--text-length) + 2));
      }
    }

    #{$this}__left #{$this}__text,
    #{$this}__right #{$this}__text {
      transform: translateY(calc(100% + $padding));
    }

    #{$this}__video #{$this}__title {
      transform: translate(-50%, -50%) scale(min(1, v-bind('scrollImagesProgress') - 0.8));
      opacity: min(1, v-bind('scrollImagesProgress') - 1.5);
    }

    #{$this}__video #{$this}__text {
      transform: translateY(calc(100% + $padding));
    }
  }

  &.--end {
    #{$this}__video #{$this}__text {
      transform: none;
    } 
  }

  &__wrapper {
    position: sticky;
    top: 0;

    height: 400svh;
    margin-top: -100svh;

    background: #a39b8b;
  }

  &__container {
    position: sticky;
    top: 0;

    height: 100svh;
    padding: $padding;
  }

  &__left, &__left-container, &__right, &__right-container {
    @include mix.full-size;
    border-radius: 2.7rem;
    overflow: hidden;
  }

  &__left {
    position: relative;

    &-container {
      position: absolute;
    }
  }

  &__right {
    position: absolute;
    inset: $padding;

    width: calc(100% - $padding * 2);
    height: calc(100% - $padding * 2);

    &-container {
      position: absolute;
      transition: transform 700ms cubic-bezier(0.25, 0.75, 0.75, 1);
    }

    #{$this}__image {
      transition: transform 700ms cubic-bezier(0.25, 0.75, 0.75, 1);
    }
  }

  &__image {
    @include mix.full-size;
    pointer-events: none;

    & > img {
      @include mix.full-size;
      object-fit: cover;
    }
  }

  &__title {
    @include mix.absolute-center;
    width: 50%;

    font-family: 'Youth', sans-serif;
    font-size: 10.7rem;
    letter-spacing: -0.53rem;
    line-height: 1;
    text-align: center;

    color: var(--light-text-color);
    pointer-events: none;
    opacity: calc(v-bind('scrollImagesProgress') * 1.2);
    transition: transform 700ms cubic-bezier(0.25, 0.75, 0.75, 1);

    &.--left {
      right: auto;
      left: $padding;
    }

    &.--right {
      left: auto;
      right: $padding;
    }

    & > span {
      display: block;
      transform: translateY(v-bind('titleTransform'));
    }
  }

  &__text {
    position: absolute;
    bottom: $padding;
    left: $padding;

    max-width: 65.3rem;
    padding: 7.1rem;

    font-size: 1.8rem;
    letter-spacing: -0.018rem;
    line-height: 1.55;
    border-radius: 2.1rem;

    background: rgba(#d9d9d9, 0.13);
    color: var(--light-text-color);
    backdrop-filter: blur(10rem);
    pointer-events: none;
    transition: transform 700ms cubic-bezier(0.25, 0.75, 0.75, 1);

    &.--right {
      left: auto;
      right: $padding;
    }
  }

  &__video {
    @include mix.absolute-cover($padding, calc(100% - $padding * 2), calc(100% - $padding * 2));
    overflow: hidden;
    border-radius: 2.6rem;

    & > video {
      @include mix.full-size;
      object-fit: cover;
    }
  }
}
</style>
