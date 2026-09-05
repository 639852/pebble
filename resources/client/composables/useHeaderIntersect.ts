import { nextTick, onMounted, onUnmounted, ref } from 'vue'

import type { ShallowRef } from 'vue'

function useHeaderIntersect(headerEl: ShallowRef<HTMLElement | null>) {
  const isSecondary = ref(false)
  let observer: IntersectionObserver

  function observeElements() {
    const elements = document.querySelectorAll("[data-logo-dark]")

    elements.forEach((element) => {
      observer.observe(element)
    })
  }

  onMounted(async () => {
    await nextTick()

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries.some(({ isIntersecting }) => isIntersecting)) {
        isSecondary.value = true
      } else {
        isSecondary.value = false
      }
    }

    const height = headerEl.value?.offsetHeight ?? 0
    const options = {
      threshold: 0,
      rootMargin: `-${height / 2}px 0px -${window.innerHeight - height + height / 2}px 0px`,
    }

    observer = new IntersectionObserver(callback, options)
    observeElements()
  })

  onUnmounted(() => observer.disconnect())

  return { isSecondary }
}

export default useHeaderIntersect
