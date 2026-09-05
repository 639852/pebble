<script setup lang="ts">
import { onMounted, ref } from 'vue'

import CloseIcon from '@/assets/icons/close.svg'
import { AppButton } from '@/components'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<{ userChoice: 'accepted' | 'dismissed' }>
}

const isVisible = ref(false)
const isInstalled = ref(false)
const promptEvent = ref<BeforeInstallPromptEvent>()

const key = 'app_installed'
const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent)
const isBrowser = window.matchMedia('(display-mode: browser)').matches

async function onClick() {
  await promptEvent.value?.prompt()
}

onMounted(() => {
  if (localStorage.getItem(key) || !isBrowser) return

  if (isIos) {
    setTimeout(() => (isVisible.value = true), 1000)
    return
  }

  window.addEventListener(
    'beforeinstallprompt',
    (event) => {
      event.preventDefault()
      promptEvent.value = event as BeforeInstallPromptEvent

      setTimeout(() => (isVisible.value = true), 1000)
    },
    { once: true },
  )

  window.addEventListener(
    'appinstalled',
    () => {
      isInstalled.value = true
      promptEvent.value = undefined
      localStorage.setItem(key, 'true')
    },
    { once: true },
  )
})
</script>

<template>
  <Transition name="notification">
    <dialog
      v-if="isVisible"
      class="notification"
      aria-modal="false"
      aria-label="notification-modal"
      :open="isVisible"
    >
      <p>Do you want to install our App?</p>
      <button
        v-if="isIos"
        type="button"
        class="notification__close"
      >
        <CloseIcon />
      </button>

      <ol
        v-if="isIos"
        class="notification__list"
      >
        <!-- <li class="notification__item">Откройте меню "Поделиться", доступное в нижней или верхней части браузера.</li>
        <li class="notification__item">Нажмите Добавить на главный экран.</li>
        <li class="notification__item">Подтвердите название приложения.</li>
        <li class="notification__item">Нажмите Добавить.</li> -->
        <li class="notification__item">
          Tap the Share icon (it looks like a box with an arrow pointing upward) located at the bottom or top of the screen.
        </li>
        <li class="notification__item">Scroll through the options in the Share sheet and tap “Add to Home Screen”.</li>
        <li class="notification__item">Review or edit the suggested app name if needed.</li>
        <li class="notification__item">Tap “Add” to place the PWA shortcut on the home screen.</li>
      </ol>

      <div
        v-else
        class="notification__buttons"
      >
        <AppButton
          size="small"
          type="secondary"
          @click="isVisible = false"
        >
          No
        </AppButton>

        <AppButton
          size="small"
          @click="onClick"
        >
          Yes
        </AppButton>
      </div>
    </dialog>
  </Transition>
</template>

<style scoped lang="scss">
.notification {
  position: fixed;
  inset-inline: var(--padding-container);
  bottom: var(--padding-container);
  z-index: vars.$ui_index-3;

  display: none;
  width: calc(100% - var(--padding-container) * 2);
  padding: 1.6rem 3.2rem;
  margin: 0;
  border: 0.1rem solid var(--border-color);

  font-weight: 500;
  border-radius: 1.6rem;
  background: var(--light-background-color);

  @include mix.media(tablet) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.6rem;
  }

  &__close {
    position: absolute;
    right: var(--padding-container);
    top: var(--padding-container);

    width: 16px;
    height: 16px;
    color: var(--icon-color);

    & > svg {
      @include mix.full-size;
    }
  }

  &__list {
    margin: 0;
    padding-left: 20px;
  }

  &__item {
    @include mix.text-style(1.2rem);
  }

  &__buttons {
    @include mix.flex-row(0.8rem);
  }
}

.notification-enter-from,
.notification-leave-to {
  transform: translateY(calc(100% + var(--padding-container)));
}
.notification-enter-active,
.notification-leave-active {
  transition: transform 500ms ease-out;
}
</style>
