<script setup lang="ts">
import { computed, inject, ref, useTemplateRef, watch } from 'vue'
import { button, data } from '@/assets/data/mediaSlider'

import PlusIcon from '@/assets/icons/plus.svg'
import ArrowRightIcon from '@/assets/icons/arrow-right.svg'
import { AppButton, RenderMedia } from '@/components'
import type { ComputedRef } from 'vue'

const mediaSliderEl = useTemplateRef('mediaSliderEl')
const pageScrollY = inject<ComputedRef<number>>('pageScrollY')

const scrollSliderProgress = computed(() => {
  const sliderHeight = mediaSliderEl.value?.offsetHeight ?? 0
  const { children } = mediaSliderEl.value?.parentElement ?? {}
  let height = 0

  for (const element of children ?? []) {
    if (element === mediaSliderEl.value) break
    height += (element as HTMLElement).offsetHeight
  }

  const y = (pageScrollY?.value ?? 0) - height
  const scrollProgress = (y + innerHeight * 0.66) / (sliderHeight - innerHeight * 0.33)

  return Math.min(1, Math.max(0, scrollProgress))
})

const currentSlide = computed(() => {
  const index = Math.round(scrollSliderProgress.value / (1 / data.length))

  if (index >= data.length) return data.at(-1)
  return data[index] ?? data[0]
})

const buttonEl = useTemplateRef('buttonEl')
const buttonWidth = ref('116px')
const buttonTransform = ref('0')
const buttonsTransform = ref('0')

watch(currentSlide, () => {
  const index = Math.max(0, Math.round(scrollSliderProgress.value / (1 / data.length)))
  let x = 0

  for (let i = 0; i < index; i++) {
    const element = buttonEl.value?.[i];

    x += (element?.offsetWidth ?? 0) + 26
  }

  buttonWidth.value = `${(buttonEl.value?.[index]?.offsetWidth ?? 0) + 8}px`
  buttonTransform.value = `${x}px`

  const buttonsParrentWidth = buttonEl.value?.[0]?.parentElement?.offsetWidth ?? 0
  const buttonsWidth = buttonEl.value?.reduce((result, element) => result + element.offsetWidth, 0) ?? 0

  buttonsTransform.value = `${(buttonsWidth - buttonsParrentWidth - 18 * 3) / (buttonEl.value?.length ?? 1) * index}px`
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
        <div class="media-slider__block">
          <div class="media-slider__block-wrapper">
            <Transition name="fade" mode="out-in">
              <h3
                :key="currentSlide?.title"
                class="media-slider__title"
              >
                {{ currentSlide?.title }}
              </h3>
            </Transition>

            <div class="media-slider__plus">
              <PlusIcon />
            </div>

            <Transition name="fade" mode="out-in">
              <p
                :key="currentSlide?.title"
                class="media-slider__text"
              >
                {{ currentSlide?.text }}
              </p>
            </Transition>

            <div class="media-slider__block-bottom">
              <div class="media-slider__block-inner">
                <div class="media-slider__block-buttons">
                  <button
                    v-for="(item, i) of data"
                    :key="i"
                    ref="buttonEl"
                    type="button"
                    class="media-slider__block-button"
                    :class="{ '--active': currentSlide?.src === item.src }"
                  >
                    {{ i + 1 }}. {{ item.buttonText ?? item.title }}
                  </button>

                  <button type="button" class="media-slider__block-button">
                    {{ data.length + 1 }}. And so much more
                  </button>
                </div>
              </div>

              <div class="media-slider__pluses">
                <PlusIcon />
                <PlusIcon />
              </div>

              <div class="media-slider__button">
                <AppButton
                  type="secondary"
                  :href="button.href"
                >
                  {{ button.text }}
                  <ArrowRightIcon />
                </AppButton>
              </div>
            </div>
          </div>
        </div>

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
  }

  &__block {
    padding: 5.3rem;
    text-align: center;

    &-wrapper {
      position: relative;
      z-index: vars.$ui-index-1;

      @include mix.full-size;
    }

    &-bottom {
      position: relative;

      height: 15rem;
      border-inline: 1px solid rgba(#575349, 0.2);
    }

    &-inner {
      display: flex;
      align-items: center;

      height: 50%;
      padding-inline: 1.8rem;
      border-bottom: 1px solid rgba(#575349, 0.2);
      overflow: hidden;
    }

    &-buttons {
      position: relative;
      @include mix.flex-row(2.6rem);

      transform: translate3d(v-bind('buttonsTransform'), 0, 0);
      transition: transform 200ms;

      &::before {
        content: '';
        position: absolute;
        top: -0.2rem;
        left: -0.4rem;
        z-index: -1;

        height: 2.2rem;
        width: v-bind('buttonWidth');
        transform: translate3d(v-bind('buttonTransform'), 0, 0);

        background: var(--main-color);
        border-radius: 0.4rem;
        transition: width 300ms, transform 300ms;
      }
    }

    &-button {
      flex-shrink: 0;

      font-family: var(--mono-font);
      @include mix.text-style(1.3rem, 400, #a39b8b);
      text-transform: uppercase;
      transition: color 200ms;

      &.--active {
        color: var(--light-text-color);
      }
    }
  }

  &__title {
    @include mix.flex-center;

    height: 40%;
    margin: 0 8.2rem;

    font-family: 'Youth', sans-serif;
    @include mix.title(7.8rem);
    letter-spacing: -0.3rem;
  }

  &__plus {
    position: relative;
    margin-bottom: 5.7rem;

    &::before {
      content: '';
      position: absolute;
      inset: 0.8rem 0 0;
      height: 0.1rem;

      background: rgba(#575349, 0.1);
    }

    & > svg {
      width: 1.2rem;
      height: 1.3rem;
    }
  }

  &__text {
    max-width: 45rem;
    height: calc(60% - 15rem - 7.7rem);
    margin-inline: auto;

    @include mix.text-style(1.8rem);
  }

  &__pluses {
    position: absolute;
    inset: 0 -0.6rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    pointer-events: none;

    & > svg {
      width: 1.2rem;
      height: 1.3rem;
    }
  }

  &__button {
    padding: 1.4rem 1.4rem 0;

    .button {
      width: 100%;
      font-size: 2.1rem;
      line-height: 2;
    }

    :deep(.button__inner > svg) {
      width: 1.7rem;
      height: 1.5rem;
      margin-left: 1rem;
    }
  }

  &__block, &__images {
    position: relative;
    @include mix.full-size;

    border-radius: 3.2rem;
  }

  &__block {
    background: var(--light-background-color);

    &::before {
      content: '';
      @include mix.absolute-cover;

      background: url(/src/assets/images/dots.png);
      opacity: 0.4;
    }
  }

  &__images {
    overflow: hidden;
  }

  &__image {
    @include mix.absolute-cover;

    pointer-events: none;
    border-radius: 3.2rem;
    overflow: hidden;

    &:first-child {
      & > :is(img, video) {
        transform: translateY(min(0.001px, v-bind('scrollSliderProgress') * -70%));
      }
    }

    &:not(:first-child) {
      transform: translateY(max(0.001px, (var(--media-index) * 100%) - v-bind('scrollSliderProgress') * (var(--media-count) * 100%)));

      & > :is(img, video) {
        transform: translateY(min(0.001px, (var(--media-index) * 100%) - v-bind('scrollSliderProgress') * (var(--media-count) * -100%)));
      }
    }

    & > :is(img, video) {
      @include mix.full-size;
      object-fit: cover;
    }
  }
}
</style>
