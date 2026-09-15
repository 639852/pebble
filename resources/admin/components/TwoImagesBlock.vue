<script setup lang="ts">
import { NDivider, NFormItemGi, NGi, NGrid, NInput, NUpload } from 'naive-ui'
import { useFileType } from '~/composables'

import type { UploadFileInfo } from 'naive-ui'
import type { TwoImagesBlock } from '~/types'

const data = defineModel<TwoImagesBlock>('data', { required: true })
const firstFileList = defineModel<Array<UploadFileInfo>>('firstFileList', { required: true })
const secondFileList = defineModel<Array<UploadFileInfo>>('secondFileList', { required: true })
const videoFileList = defineModel<Array<UploadFileInfo>>('videoFileList', { required: true })

const { fileTypeValidation, imageTypes, videoTypes } = useFileType()

if (data.value.firstMedia.src) {
  firstFileList.value.push({
    id: '1',
    name: `${data.value.firstMedia.title}.png`,
    status: 'finished',
    url: data.value.firstMedia.src,
  })
}

if (data.value.secondMedia.src) {
  secondFileList.value.push({
    id: '1',
    name: `${data.value.secondMedia.title}.png`,
    status: 'finished',
    url: data.value.secondMedia.src,
  })
}

if (data.value.video.src) {
  videoFileList.value.push({
    id: '1',
    name: `${data.value.video.title}.png`,
    status: 'finished',
    url: data.value.video.src,
  })
}
</script>

<template>
  <NGrid
    cols="2"
    x-gap="12"
    y-gap="12"
    class="two-images"
  >
    <NFormItemGi
      path="twoImagesBlock.firstMedia.title"
      label="First image title"
    >
      <NInput v-model:value="data.firstMedia.title" />
    </NFormItemGi>

    <NFormItemGi
      path="twoImagesBlock.secondMedia.title"
      label="Second image title"
    >
      <NInput v-model:value="data.secondMedia.title" />
    </NFormItemGi>

    <NFormItemGi
      path="twoImagesBlock.firstMedia.description"
      label="First image description"
    >
      <NInput v-model:value="data.firstMedia.description" />
    </NFormItemGi>

    <NFormItemGi
      path="twoImagesBlock.secondMedia.description"
      label="Second image description"
    >
      <NInput v-model:value="data.secondMedia.description" />
    </NFormItemGi>

    <NFormItemGi
      path="twoImagesBlock.firstMedia.src"
      label="First image"
    >
      <NUpload
        v-model:file-list="firstFileList"
        class="two-images__upload"
        list-type="image-card"
        :max="1"
        @before-upload="fileTypeValidation($event, imageTypes)"
      >
        Click to Upload
      </NUpload>
    </NFormItemGi>

    <NFormItemGi
      path="twoImagesBlock.secondMedia.src"
      label="Second image"
    >
      <NUpload
        v-model:file-list="secondFileList"
        class="two-images__upload"
        list-type="image-card"
        :max="1"
        @before-upload="fileTypeValidation($event, imageTypes)"
      >
        Click to Upload
      </NUpload>
    </NFormItemGi>

    <NGi span="2"> <NDivider /></NGi>

    <NFormItemGi
      path="twoImagesBlock.video.title"
      label="Video title"
    >
      <NInput v-model:value="data.video.title" />
    </NFormItemGi>

    <NFormItemGi
      path="twoImagesBlock.video.description"
      label="Video description"
    >
      <NInput v-model:value="data.video.description" />
    </NFormItemGi>

    <NFormItemGi
      path="twoImagesBlock.video.src"
      label="Video"
    >
      <NUpload
        v-model:file-list="videoFileList"
        class="two-images__upload"
        list-type="image-card"
        :max="1"
        @before-upload="fileTypeValidation($event, videoTypes)"
      >
        Click to Upload
      </NUpload>
    </NFormItemGi>
  </NGrid>
</template>

<style scoped lang="scss">
.two-images {
  &__upload :deep(.n-upload-file-list.n-upload-file-list--grid) {
    grid-template-columns: repeat(auto-fill, 50%);
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
}
</style>
