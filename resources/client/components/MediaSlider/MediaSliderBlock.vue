<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import { button, data } from '@/assets/data/mediaSlider'

import PlusIcon from '@/assets/icons/plus.svg'
import ArrowRightIcon from '@/assets/icons/arrow-right.svg'
import { AppButton } from '@/components'

interface MediaSliderBlockProps {
  scrollProgress: number
}
const props = defineProps<MediaSliderBlockProps>()

const currentSlide = computed(() => {
  const index = Math.round(props.scrollProgress / (1 / data.length))

  if (index >= data.length) return data.at(-1)
  return data[index] ?? data[0]
})

const buttonEl = useTemplateRef('buttonEl')
const buttonWidth = ref('116px')
const buttonTransform = ref('0')
const buttonsTransform = ref('0')

const buttons = [...data, { title: 'And so much more', src: '', buttonText: null }]

watch(currentSlide, () => {
  const index = Math.max(0, Math.round(props.scrollProgress / (1 / data.length)))
  let x = 0

  for (let i = 0; i < index; i++) {
    const element = buttonEl.value?.[i]

    x += (element?.offsetWidth ?? 0) + 26
  }

  buttonWidth.value = `${(buttonEl.value?.[index]?.offsetWidth ?? 0) + 8}px`
  buttonTransform.value = `${x}px`

  const buttonsParrentWidth = buttonEl.value?.[0]?.parentElement?.offsetWidth ?? 0
  const buttonsWidth = buttonEl.value?.reduce((result, element) => result + element.offsetWidth + 26, 141) ?? 0

  buttonsTransform.value = `${((buttonsParrentWidth - buttonsWidth) / buttons.length) * index}px`
})
</script>

<template>
  <div class="media-slider__block">
    <div class="media-slider__block-wrapper">
      <Transition
        name="fade"
        mode="out-in"
      >
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

      <Transition
        name="fade"
        mode="out-in"
      >
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
              v-for="(item, i) of buttons"
              :key="i"
              ref="buttonEl"
              type="button"
              class="media-slider__block-button"
              :class="{ '--active': currentSlide?.src === item.src }"
            >
              {{ i + 1 }}. {{ item.buttonText ?? item.title }}
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
</template>

<style scoped lang="scss">
.media-slider {
  $padding: 1.8rem;

  position: relative;
  z-index: vars.$ui-index-2;

  &__block {
    padding: 5.3rem;
    text-align: center;

    @include mix.media(tablet) {
      padding: 0;
    }

    &-wrapper {
      position: relative;
      z-index: vars.$ui-index-1;

      @include mix.full-size;

      @include mix.media(tablet) {
        display: flex;
        flex-direction: column;
      }
    }

    &-bottom {
      position: relative;

      height: 15rem;
      border-inline: 1px solid rgba(#575349, 0.2);

      @include mix.media(tablet) {
        height: auto;
        margin-top: auto;
      }
    }

    &-inner {
      display: flex;
      align-items: center;

      height: 50%;
      padding-inline: 1.8rem;
      border-bottom: 1px solid rgba(#575349, 0.2);
      overflow: hidden;

      @include mix.media(tablet) {
        display: none;
      }
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
        transition:
          width 300ms,
          transform 300ms;
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

    @include mix.media(tablet) {
      height: auto;
      margin: calc(var(--padding-container) + 78px) var(--padding-container) 0;

      font-size: 3.2rem;
      letter-spacing: -0.128rem;
    }
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

    @include mix.media(tablet) {
      margin-block: 2.4rem;
    }
  }

  &__text {
    max-width: 45rem;
    height: calc(60% - 15rem - 7.7rem);
    margin-inline: auto;

    @include mix.text-style(1.8rem);

    @include mix.media(tablet) {
      height: auto;
      margin-inline: var(--padding-container);
      font-size: 1.3rem;
    }
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

    @include mix.media(tablet) {
      display: none;
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

    @include mix.media(tablet) {
      padding: calc(var(--padding-container) / 2);

      .button {
        padding: 1.2rem 2.4rem;
        font-size: 1.2rem;
      }

      :deep(.button__inner > svg) {
        width: 1.2rem;
        height: 1rem;
      }
    }
  }

  &__block {
    position: relative;
    @include mix.full-size;

    border-radius: clamp(1.6rem, mix.ruber(2.4), 3.2rem);
    background: var(--light-background-color);

    &::before {
      content: '';
      @include mix.absolute-cover;

      background: url(/resources/client/assets/images/dots.png);
      opacity: 0.4;
    }
  }
}
</style>
