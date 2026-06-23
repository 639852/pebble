<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { randomNumber } from '@/helpers'

interface Props {
  type?: "primary" | "secondary" | "tertiary" | "ghost"
  size?: "small" | "default" | "large"
  disabled?: boolean
  href?: string
}
withDefaults(defineProps<Props>(), {
  type: "primary",
  size: "default",
  href: undefined,
})

const buttonEl = useTemplateRef<HTMLButtonElement | HTMLAnchorElement>('buttonEl')

onMounted(() => {
  const textEl = buttonEl.value?.firstElementChild
  const text = textEl?.innerHTML

  if (!textEl || !text) return
  textEl.innerHTML = text.trim()
    .split('')
    .map((letter) => `<span>${letter}</span>`)
    .join('')
})

function fadeLetter(index: number, delay = 0) {
  const letters = buttonEl.value?.querySelectorAll('span') ?? []
  if (!letters[index]) return

  letters[index].style.opacity = '0'
  letters[index].style.transition = `opacity 80ms ${delay}ms`

  setTimeout(() => {
    if (!letters[index]) return

    letters[index].style.opacity = ''
    letters[index].style.transition = ''
  }, 80 + delay);
}

function onMouseEnter() {
  const letters = buttonEl.value?.querySelectorAll('span') ?? []
  const firstNum = randomNumber(1, 4)
  const index = randomNumber(0, letters.length - 1)

  switch (firstNum) {
    case 1:
      fadeLetter(index)
      break
    case 2:
      letters.forEach((_, i) => {
        if (i % 2 === 1) fadeLetter(i, i * 80)
      })
      break
    case 3:
      letters.forEach((_, i) => {
        fadeLetter(i, (i % 2 === 1) ? i * 160 : i * 80)
      })
      break
    case 4:
      letters.forEach((_, i) => {
        fadeLetter(i, i * 80)
      })
  }
}
</script>

<template>
  <component
		:is="href ? 'a' : 'button'"
    ref="buttonEl"
		type="button"
    class="button"
		:class="[`--${type}`, `--${size}`]"
		:disabled="disabled"
		:href="href"
    @mouseenter="onMouseEnter"
	>
    <span class="button__inner">
      <slot></slot>
    </span>
  </component>
</template>

<style scoped lang="scss">
.button {
  padding: 4rem 4.7rem;
  font-family: var(--mono-font);
  font-size: 1.4rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;

  border: none;
  background: none;
  border-radius: 1.6rem;

  &.--primary {
    background: var(--main-color);
    color: var(--light-text-color);
  }

  &__inner {
    & > span {
      will-change: opacity;
    }
  }
}
</style>
