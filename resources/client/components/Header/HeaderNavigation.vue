<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { useMediaQuery } from '@/composables'

import { links } from '@/assets/data/header'

interface HeaderNavigationProps {
  visible?: boolean
}
defineProps<HeaderNavigationProps>()

const linksEl = useTemplateRef('link')
const isTablet = useMediaQuery('(max-width: 1024px)');

onMounted(() => {
  linksEl.value?.forEach((element) => {
    const text = element.innerText

    element.innerHTML = text.split('')
      .map((letter, i) =>
        `<span data-index="${i}" style="--delay: ${i * 50}ms">${letter}</span>`
      )
      .join('')
  })
})
</script>

<template>
  <nav
    class="header-nav"
    :class="{ '--visible': visible && isTablet }"
  >
    <ul class="header-nav__list">
      <li
        v-for="(item, i) of links"
        :key="item.title"
        class="header-nav__link"
        :style="{ '--link-delay': `${((links.length - i) * 2) * 100 - 200}ms` }"
      >
        <a
          ref="link"
          target="_blank"
          :href="item.link"
        >
          {{ item.title }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.header-nav {
  $this: &;

  padding: clamp(2.9rem, mix.ruber(3.95), 4.9rem);
  border-radius: clamp(0.8rem, mix.ruber(1.4), 2rem);
  overflow: hidden;

  &::before {
    content: '';
    @include mix.absolute-cover;
    z-index: -1;

    border-radius: clamp(0.8rem, mix.ruber(1.4), 2rem);
    background: var(--light-background-color);
    transform: translateX(100%);
    transition: transform 1000ms cubic-bezier(0.8, 0, 0, 0.5);

    @include mix.media(tablet) {
      transform: translateY(-80%);
      transition: transform 700ms cubic-bezier(0.8, 0, 0, 0.5);
    }
  }

  @include mix.hover {
    #{$this}__link {
      opacity: 1;
    }

    &::before {
      transform: none;
      transition-timing-function: ease-out;
    }
  }

  &.--visible {
    &::before {
      transform: none;
    }

    #{$this}__link :deep(span) {
      opacity: 1;
      transition: opacity 300ms ease-out 500ms;
    }
  }

  &__list {
    display: flex;
    gap: 1.6rem 2.8rem;

    margin: 0;
    padding: 0;
    list-style: none;

    @include mix.media(tablet) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__link {
    font-size: clamp(1.2rem, mix.ruber(1.4), 1.4rem);
    text-transform: uppercase;
    color: var(--text-color);

    & > a {
      color: inherit;

      & > :deep(span) {
        opacity: 0;
        transition: opacity 100ms ease-out var(--delay);
      }
    }
  }
}
</style>
