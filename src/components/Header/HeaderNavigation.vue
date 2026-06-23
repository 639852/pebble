<script setup lang="ts">
import { links } from '@/assets/data/header'
import { onMounted, useTemplateRef } from 'vue'

const linksEl = useTemplateRef('link')

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
  <nav class="header-nav">
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

  padding: 4.9rem;
  border-radius: 2rem;
  overflow: hidden;

  &::before {
    content: '';
    @include mix.absolute-cover;
    z-index: -1;

    border-radius: 2rem;
    background: var(--light-background-color);
    transform: translateX(100%);
    transition: transform 1000ms cubic-bezier(0.8, 0, 0, 0.5);
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

  &__list {
    display: flex;
    gap: 2.8rem;

    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__link {
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
