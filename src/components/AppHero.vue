<script setup lang="ts">
import { inject } from 'vue'

import { firstImage, secondImage, shortVideo } from '@/assets/data/hero'
import TriangleIcon from '@/assets/icons/triangle.svg'
import PlayIcon from '@/assets/icons/play.svg'

import type { ComputedRef } from 'vue'

const pageScrollY = inject<ComputedRef<number>>('pageScrollY')
</script>

<template>
  <div class="hero">
    <div class="hero__image">
      <div class="hero__image-wrapper">
        <img :src="firstImage" alt="">
      </div>
    </div>

    <p class="hero__text">meet <br> pebble</p>

    <div class="hero__image">
      <div class="hero__image-wrapper">
        <img :src="secondImage" alt="">
      </div>
    </div>

    <div class="hero__video">
      <video
        loop
        muted
        autoplay
        playsinline
        :src="shortVideo"
      />

      <button
        type="button"
        class="hero__play"
      >
        <TriangleIcon />
        <PlayIcon class="hero__play-icon" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  $this: &;

  position: relative;
  @include mix.figure(100svw, 100svh);
  transform: scale(max(0.971, 1 - (v-bind('pageScrollY') / 20000)));

  &__image {
    @include mix.absolute-cover;
    pointer-events: none;

    overflow: hidden;
    border-radius: min(30px, 1px * v-bind('pageScrollY') / 20);

    &-wrapper {
      @include mix.full-size;
      transform: translate3d(0, min(100% * 0.2, v-bind('pageScrollY') * 0.2 * 1px), 0);

      & > img {
        @include mix.full-size;
        object-fit: cover;
      }
    }
  }

  &__text {
    position: absolute;

    width: 100%;
    padding: var(--padding-container);

    font-family: "Youth", serif;
    @include mix.title(clamp(20rem, mix.ruber(30), 39.6rem), 500, var(--light-text-color), 0.8);
    letter-spacing: -1.6rem;
    text-align: center;

    @include mix.media(tablet) {
      top: 15%;
      font-size: clamp(9rem, mix.ruber(40), 40rem);
      letter-spacing: -1rem;
    }

    @include mix.media(mobile) {
      letter-spacing: -0.3rem;
    }
  }

  &__video {
    position: absolute;
    bottom: var(--padding-container);
    right: var(--padding-container);

    width: clamp(34.6rem, mix.ruber(45), 59.7rem);
    aspect-ratio: 3 / 2;
    padding: 0.4rem;

    border-radius: clamp(0.8rem, mix.ruber(12), 2rem);
    cursor: pointer;
    background: var(--light-background-color);

    & > video {
      @include mix.full-size;
      object-fit: cover;
      border-radius: 1.8rem;
    }

    @include mix.hover {
      #{$this}__play {
        transform: translate(-50%, -50%) scale(1.2);
      }
    }
  }

  &__play {
    @include mix.absolute-center;
    @include mix.box(clamp(4rem, mix.ruber(6), 8rem));

    color: var(--light-text-color);
    transition: transform 500ms cubic-bezier(0, 0, 0.2, 1);

    & > svg {
      @include mix.full-size;
    }

    & &-icon {
      @include mix.absolute-center;
      @include mix.box(clamp(0.6rem, mix.ruber(0.9), 1.2rem));
      color: var(--icon-color);
    }
  }
}
</style>
