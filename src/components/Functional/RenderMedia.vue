<script setup lang="ts">
import { computed, h, ref, resolveDirective, withDirectives } from "vue";

interface Attrs {
  [key: string]: string;
}

interface RenderMediaProps {
  data: { type: "image" | "video", src: string };
  imageAttrs?: Attrs;
  videoAttrs?: Attrs;
  loading?: "eager" | "lazy";
  noSkeleton?: boolean;
}

const props = withDefaults(defineProps<RenderMediaProps>(), {
  imageAttrs: () => ({ alt: "", title: "" }),
  videoAttrs: () => ({
    muted: "",
    autoplay: "",
    loop: "",
    playsinline: "",
    preload: "none",
  }),
  loading: "lazy",
});

const skeleton = resolveDirective("skeleton");
const selector = ref<HTMLMediaElement>();

const IMAGE_TEMPLATE = computed(() =>
  withDirectives(
    h("img", { ...props.imageAttrs, src: props.data.src, loading: props.loading }),
    props.noSkeleton ? [] : [[skeleton, true]]
  )
);

const VIDEO_TEMPLATE = computed(() =>
  withDirectives(
    h(
      "video",
      props.videoAttrs,
      h("source", {
        src: props.data.src,
        type: props.data.src?.endsWith(".webm") ? "video/webm" : "video/mp4",
      })
    ),
    props.noSkeleton ? [[skeleton, true]] : []
  )
);

const MediaElem = computed(() => {
  switch (props.data.type) {
    case "image":
      return () => IMAGE_TEMPLATE.value;

    case "video":
      return () => VIDEO_TEMPLATE.value;

    default:
      console.warn(`!тип '${props.data.type}' не соответствует ни 'image', ни 'video'`);
      return h("img", { alt: "" });
  }
});

defineExpose({ selector });
</script>

<template>
	<MediaElem ref="selector">
		<slot />
	</MediaElem>
</template>

<style scoped lang="scss"></style>
