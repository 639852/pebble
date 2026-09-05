<script setup lang="ts">
import { nextTick, ref, useSlots, onMounted, onUnmounted, watch } from "vue";

interface RekapopoverProps {
  align?: "top-right" | "top" | "top-left" | "bottom-right" | "bottom" | "bottom-left";
  interactive?: boolean;
  trigger?: "hover" | "click";
  visible?: boolean;
}

const props = withDefaults(defineProps<RekapopoverProps>(), {
  align: "top-right",
  interactive: true,
  trigger: "hover",
});
const slots = useSlots();

const emits = defineEmits<{
  triggerOn: [];
  unMounted: [];
  contentRendered: [];
}>();

watch(
  () => props.visible,
  (value) => {
    if (value) triggerEnter();
    else hideContent();
  }
);

const debouncedRequest = () => new Promise((resolve) => setTimeout(resolve, 200));

const triggerEl = ref<null | HTMLDivElement>(null);
const contentEl = ref<null | HTMLDivElement>(null);

const contentShow = ref(false);
const isTriggerEnter = ref(false);

const placeContent = (x: number, y: number) => {
  if (!contentEl.value) return;

  contentEl.value.style.top = `${y}px`;
  contentEl.value.style.left = `${x}px`;
};

const hideContent = () => {
  contentShow.value = false;
  emits("unMounted");
};

const getY = (value: DOMRect) => {
  const { offsetHeight } = contentEl.value!;

  if (props.align.includes("bottom")) {
    return value.y + value.height;
  }
  return value.y - offsetHeight;
};

const getX = (value: DOMRect) => {
  const { offsetWidth } = contentEl.value!;

  if (props.align.includes("left")) {
    return value.x - (offsetWidth - value.width);
  } else if (props.align.includes("right")) {
    return value.x;
  }
  return value.x + value.width / 2 - offsetWidth / 2;
};

const triggerEnter = () => {
  isTriggerEnter.value = true;
  emits("triggerOn");

  const parentRect = (triggerEl.value as HTMLDivElement).getBoundingClientRect();
  contentShow.value = true;

  nextTick(() => {
    const viewport = window.innerWidth;
    const x = getX(parentRect);

    const top = getY(parentRect);
    const diff = viewport - (x + contentEl.value!.offsetWidth);
    const left = diff < 0 ? x + diff : x;

    placeContent(left - parentRect.left, top - parentRect.top);
    emits("contentRendered");
  });
};

const triggerLeave = async (e: MouseEvent) => {
  isTriggerEnter.value = false;

  await debouncedRequest();
  // если пользователь увел курсор с нашего триггера и быстро вернул его обратно, выходим из данной функции. Иначе курсор останеться на триггере, но ничего не покажется (контент будет скрыт)
  if (isTriggerEnter.value) return;

  if (props.interactive) {
    if ((e.relatedTarget as HTMLElement)?.closest(".popover__content")) return;
  }

  hideContent();
};

const contentLeave = () => {
  hideContent();
};

const contentEnter = () => {
  isTriggerEnter.value = true;
};

const triggerClick = () => {
  if (contentShow.value) hideContent();
  else triggerEnter();
};

let abortController: AbortController;

onMounted(() => {
  abortController = new AbortController();

  if (slots.trigger) {
    const triggerSlot = slots.trigger({})[0];
    const triggerSlotStyle = triggerSlot?.props?.style ?? {};

    triggerEl.value!.style.top = triggerSlotStyle.top;
    triggerEl.value!.style.left = triggerSlotStyle.left;
  }

  if (props.trigger === "click") {
    document.body.addEventListener(
      "click",
      ({ target }) => {
        const element = target as HTMLElement;
        const isContent = element.closest(".popover__content");

        if (element.closest(".popover__trigger")) return;
        if (isContent && props.interactive) return;
        contentLeave();
      },
      { signal: abortController.signal }
    );
  }
});

onUnmounted(() => abortController?.abort());

defineExpose({
  contentEnter: triggerEnter,
  contentLeave,
});
</script>

<template>
	<div class="popover">
		<div
			ref="triggerEl"
			class="popover__trigger"
			@mouseenter="trigger === 'hover' ? triggerEnter() : null"
			@mouseleave="trigger === 'hover' ? triggerLeave($event) : null"
			@click="trigger === 'click' ? triggerClick() : null"
		>
			<slot name="trigger" />
		</div>

		<Transition name="content-popover">
			<div
				v-if="contentShow || visible"
				ref="contentEl"
				class="popover__content"
				@mouseenter="trigger === 'hover' ? contentEnter() : null"
				@mouseleave="trigger === 'hover' ? contentLeave() : null"
			>
				<slot />
			</div>
		</Transition>
	</div>
</template>

<style scoped lang="scss">
.popover {
	position: relative;

	&__trigger {
		position: relative;
	}

	&__content {
		position: absolute;
		z-index: vars.$ui_index-3;

		max-width: 400px;
		overflow: hidden;
		// background: #fff;
	}
}

.content-popover-enter-active,
.content-popover-leave-active {
	transition: opacity ease 230ms;
}

.content-popover-enter-from,
.content-popover-leave-to {
	opacity: 0;
}
</style>
