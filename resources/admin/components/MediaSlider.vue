<script setup lang="ts">
import { NButton, NDivider, NFormItemGi, NGi, NGrid, NInput, NUpload } from 'naive-ui'
import { useFileType } from '~/composables'

import type { UploadFileInfo } from 'naive-ui'
import type { MediaSlider } from '~/types'

const mediaSlider = defineModel<MediaSlider>('data', { required: true })

const fileList = defineModel<Record<string, UploadFileInfo[]>>('fileList', { required: true })
const { fileTypeValidation, imageTypes, videoTypes } = useFileType()

function addItem() {
  mediaSlider.value.items.push({
    src: '',
    title: '',
    description: '',
  })
}

function removeItem(index: number) {
  mediaSlider.value.items.splice(index, 1)

  for (let i = index; i <= mediaSlider.value.items.length; i++) {
    fileList.value[i] = fileList.value[i + 1] ?? []
  }
}

mediaSlider.value.items.forEach(({ src, title }, i) => {
  if (!src) return

  fileList.value[i] = [
    {
      id: `${i + 1}`,
      name: `${title}.png`,
      status: 'finished',
      url: src,
    },
  ]
})
</script>

<template>
  <NGrid
    cols="2"
    x-gap="12"
    y-gap="12"
    class="media-slider"
  >
    <NFormItemGi
      path="mediaSlider.buttonText"
      label="Button text"
    >
      <NInput v-model:value="data.buttonText" />
    </NFormItemGi>

    <NFormItemGi
      path="mediaSlider.buttonLink"
      label="Button link"
    >
      <NInput v-model:value="data.buttonLink" />
    </NFormItemGi>

    <NGi span="2"> <NDivider /></NGi>

    <template
      v-for="(item, i) of data.items"
      :key="i"
    >
      <NFormItemGi
        :path="`mediaSlider.items[${i}].title`"
        :label="`Media №${i + 1} title`"
      >
        <NInput v-model:value="item.title" />
      </NFormItemGi>

      <NFormItemGi
        :path="`mediaSlider.items[${i}].description`"
        :label="`Media №${i + 1} description`"
      >
        <NInput v-model:value="item.description" />
      </NFormItemGi>

      <NFormItemGi
        :path="`mediaSlider.items[${i}].src`"
        :label="`Media №${i + 1}`"
      >
        <NUpload
          v-model:file-list="fileList[i]"
          class="media-slider__upload"
          list-type="image-card"
          :max="1"
          @before-upload="fileTypeValidation($event, imageTypes.concat(videoTypes))"
        >
          Click to Upload
        </NUpload>
      </NFormItemGi>

      <NGi class="justify-end">
        <NButton
          secondary
          type="error"
          @click="removeItem(i)"
        >
          Remove
        </NButton>
      </NGi>
    </template>

    <NGi span="2">
      <NButton
        secondary
        type="info"
        :disabled="data.items.length >= 7"
        @click="addItem"
      >
        Add media
      </NButton>
    </NGi>
  </NGrid>
</template>

<style scoped lang="scss">
.media-slider {
  &__upload :deep(.n-upload-file-list.n-upload-file-list--grid) {
    grid-template-columns: repeat(auto-fill, 50%);
    justify-content: center;
  }

  &__upload :deep(.n-upload-dragger) {
    padding: 8px;
  }

  &__upload :deep(.n-upload-trigger.n-upload-trigger--image-card),
  &__upload :deep(.n-upload-file.n-upload-file--image-card-type) {
    width: 100%;
    height: auto;
    aspect-ratio: 1.75;
  }

  &__upload :deep(.n-image > img) {
    object-fit: contain !important;
  }

  .justify-end {
    justify-self: end;
  }
}
</style>
