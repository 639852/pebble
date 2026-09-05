<script setup lang="ts">
import { computed, inject, onMounted, useTemplateRef } from 'vue'
import { splitStringOnWords } from '@/helpers'
import { buttons, content, firstImage, secondImage } from '@/assets/data/inviteBlock'

import type { ComputedRef } from 'vue'
import { AppButton } from '@/components'

const inviteBlockEl = useTemplateRef('inviteBlockEl')
const pageScrollY = inject<ComputedRef<number>>('pageScrollY')

const scrollBlockProgress = computed(() => {
  const blockHeight = inviteBlockEl.value?.offsetHeight ?? 0
  const { children } = inviteBlockEl.value?.parentElement ?? {}
  let height = 0

  for (const element of children ?? []) {
    if (element === inviteBlockEl.value) break
    height += (element as HTMLElement).offsetHeight
  }

  const y = (pageScrollY?.value ?? 0) - height
  const scrollProgress = (y + innerHeight) / blockHeight

  if (scrollProgress < 0 && scrollProgress > -1) return scrollProgress * 3
  return Math.min(1, Math.max(-1, scrollProgress))
})

onMounted(() => {
  if (inviteBlockEl.value) splitStringOnWords(inviteBlockEl.value)
})
</script>

<template>
  <div ref="inviteBlockEl" class="invite-block">
    <div class="invite-block__inner">
      <div class="invite-block__image">
        <div class="invite-block__image-wrapper">
          <img :src="firstImage" alt="">
        </div>
      </div>

      <div class="invite-block__content">
        <span class="invite-block__subtitle">{{ content.subtitle }}</span>
        <p class="invite-block__title">{{ content.title }}</p>
      </div>

      <div class="invite-block__buttons">
        <AppButton
          v-for="button of buttons"
          :key="button.href"
          :type="button.type"
          :href="button.href"
        >
          {{ button.text }}
        </AppButton>
        <span class="invite-block__text">Now Available</span>
      </div>

      <div class="invite-block__image">
        <div class="invite-block__image-wrapper">
          <img :src="secondImage" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.invite-block {
  $this: &;
  position: relative;
  @include mix.figure(100%, 100svh, $background: #a39b8b);

  &__inner {
    @include mix.full-size;
    transform: scale(max(0.971, 1 - max(0, v-bind('scrollBlockProgress')) * 0.033));
    will-change: transform;
  }

  &__image {
    @include mix.absolute-cover;
    pointer-events: none;

    overflow: hidden;
    border-radius: min(30px, max(0, v-bind('scrollBlockProgress')) * 45px);
    will-change: border-radius;

    &-wrapper {
      --max: 20%;

      @include mix.full-size;
      transform: translate3d(0, clamp(-60%, v-bind('scrollBlockProgress') * 20%, var(--max)), 0);
      will-change: transform;

      & > img {
        @include mix.full-size;
        object-fit: cover;
      }

      @include mix.media(tablet) {
        --max: 0%;
      }
    }
  }

  &__content {
    @include mix.absolute-center;

    padding-inline: var(--padding-container);
    width: 100%;
    text-align: center;

    @include mix.media(tablet) {
      top: 35%;
    }
  }

  &__subtitle {
    display: block;
    margin-bottom: clamp(2.4rem, mix.ruber(4), 5rem);

    font-family: var(--mono-font);
    @include mix.text-style(clamp(1.2rem, mix.ruber(1.6), 1.8rem), 400, var(--light-text-color));
    text-transform: uppercase;

    transform: translate3d(0, clamp(-50svh, v-bind('scrollBlockProgress') * 15svh, 0%), 0);
    will-change: transform;
  }

  &__title {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: clamp(1.8rem, mix.ruber(7), 7.2rem);

    width: 100%;

    font-family: 'Youth', serif;
    @include mix.title(clamp(10rem, mix.ruber(28), 29.1rem), 500, var(--light-text-color), 0.8);
    letter-spacing: clamp(-1.8rem, -1.2vw, -0.128rem);

    & > :deep(span) {
      transform: translate3d(0, max(-130%, v-bind('scrollBlockProgress') * 17% * (var(--words-count) - var(--word-index))), 0);
      will-change: transform;

      @include mix.media(tablet) {
        transform: translate3d(0, max(-130%, (1 / v-bind('scrollBlockProgress') * 50% * (var(--word-index) + 1)) - 50% * var(--word-index)), 0);
      }
    }
  }

  &__buttons {
    position: absolute;
    left: 50%;
    bottom: var(--padding-container);
    z-index: vars.$ui_index-1;

    @include mix.flex-row(1.2rem);
    justify-content: center;
    flex-wrap: wrap;

    width: 100%;
    transform: translateX(-50%);

    @include mix.media(tablet) {
      bottom: 20%;
      gap: 0.8rem;

      .button {
        font-size: 1.2rem;
      }
    }
  }

  &__text {
    width: 100%;
    margin-top: 2.4rem;

    font-family: var(--mono-font);
    @include mix.text-style(1.3rem, 400, var(--light-text-color));
    text-transform: uppercase;
    text-align: center;

    @include mix.media(tablet) {
      margin-top: 1.2rem;
      font-size: 1.1rem;
    }
  }
}
</style>
