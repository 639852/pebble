<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { useHeaderIntersect } from '@/composables'

import LogoIcon from '@/assets/icons/logo.svg'
import { AppButton, HeaderBurger, HeaderNavigation } from '@/components'
import type { ComputedRef } from 'vue'

const pageScrollY = inject<ComputedRef<number>>('pageScrollY')
let timeout: ReturnType<typeof setTimeout>

function onMouseEnter(event: MouseEvent) {
  const target = event.target as HTMLElement
  const burger = target.querySelector<HTMLElement>('.header__burger')

  timeout = setTimeout(() => {
    burger!.style.pointerEvents = 'none'
  }, 600)
}

function onMouseLeave(event: MouseEvent) {
  const target = event.target as HTMLElement
  const burger = target.querySelector<HTMLElement>('.header__burger')

  clearTimeout(timeout)
  burger!.style.pointerEvents = ''
}

const isVisible = ref(false)
const headerEl = useTemplateRef('headerEl')
const { isSecondary } = useHeaderIntersect(headerEl)

function onOutsideClick(event: MouseEvent) {
  console.log("gg");

  const target = event.target as HTMLElement

  if (target.closest('.header')) return
  isVisible.value = false
}

onMounted(() => {
  window.addEventListener('pointerup', onOutsideClick)
})

onUnmounted(() => {
  window.removeEventListener('pointerup', onOutsideClick)
})
</script>

<template>
  <header
    ref="headerEl"
    class="header"
    :class="{ '--secondary': isSecondary }"
  >
    <a
      class="header__logo"
      href="https://pebblelife.com/"
      target="_blank"
    >
      <LogoIcon />
    </a>

    <div class="header__right">
      <div
        class="header__menu"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <HeaderBurger
          class="header__burger"
          @pointerup="isVisible = !isVisible"
        />
        <HeaderNavigation
          class="header__nav"
          :visible="isVisible"
        />
      </div>

      <AppButton
        class="header__button"
        href="https://pebblelife.com/order"
        target="_blank"
      >
        Order
      </AppButton>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  $this: &;

  @include mix.flex-row;
  justify-content: space-between;
  padding-inline: var(--padding-container);

  &__logo {
    display: block;
    padding: clamp(2.5rem, mix.ruber(3), 3.8rem);

    border-radius: clamp(0.8rem, mix.ruber(1.4), 2.1rem);
    color: var(--icon-color);
    background: var(--light-background-color);
    transition: background 500ms;
    pointer-events: all;

    #{$this}.--secondary & {
      background: var(--background-color);
    }

    & > svg {
      width: clamp(2.5rem, mix.ruber(3), 4.0rem);
      height: clamp(2.1rem, mix.ruber(2.6), 3.6rem);

      transform: rotate(calc(v-bind('pageScrollY') * 0.115 * 1deg));
    }
  }

  &__right {
    @include mix.flex-row(0.4rem);

    padding: 0.4rem;
    border-radius: clamp(0.8rem, mix.ruber(1.4), 2rem);
    background: var(--light-background-color);
    pointer-events: all;

    @include mix.media(tablet) {
      position: relative;

      #{$this}.--secondary & {
        background: var(--background-color);
      }
    }
  }

  &__menu {
    position: relative;

    @include mix.hover {
      #{$this}__burger {
        opacity: 0;
        transition: opacity 0ms 600ms;
      }

      #{$this}__nav {
        pointer-events: unset;
      }

      :deep(.header-nav__link span) {
        opacity: 1;
        transition-delay: calc(var(--delay) + var(--link-delay));
      }

      .header-nav::before {
        transform: none;
        transition-duration: 1000ms;
        transition-timing-function: ease-out;
      }
    }

    @include mix.media(tablet) {
      position: static;
    }
  }

  &__burger {
    position: relative;
    z-index: vars.$ui_index-1;

    transition: opacity 0ms 600ms;
  }

  &__nav {
    position: absolute;
    top: -0.5rem;
    right: 0;

    pointer-events: none;

    @include mix.media(full-hd) {
      top: -0.4rem;
    }

    @include mix.media(laptop-l) {
      top: -0.5rem;
    }

    @include mix.media(laptop) {
      top: -0.7rem;
    }

    @include mix.media(tablet) {
      inset: 0 0 auto;

      &.header-nav {
        padding-top: 12cqh;
      }
    }
  }

  &__button.button {
    font-size: clamp(1.4rem, mix.ruber(1.8), 2.1rem);
  }
}
</style>
