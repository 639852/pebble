<script setup lang="ts">
import { inject, useTemplateRef } from 'vue'
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

const headerEl = useTemplateRef('headerEl')
const { isSecondary } = useHeaderIntersect(headerEl)
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
        <HeaderBurger class="header__burger" />
        <HeaderNavigation class="header__nav" />
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
    padding: 3.8rem;

    border-radius: 2.1rem;
    color: var(--icon-color);
    background: var(--light-background-color);
    transition: background 500ms;

    #{$this}.--secondary & {
      background: var(--background-color);
    }

    & > svg {
      width: 4.0rem;
      height: 3.6rem;

      transform: rotate(calc(v-bind('pageScrollY') * 0.115 * 1deg));
    }
  }

  &__right {
    @include mix.flex-row(0.4rem);

    padding: 0.4rem;
    border-radius: 2rem;
    background: var(--light-background-color);
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
  }

  &__button.button {
    font-size: 2.1rem;
  }
}
</style>
