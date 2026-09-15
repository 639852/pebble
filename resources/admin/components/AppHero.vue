<script setup lang="ts">
import { NFormItemGi, NGrid, NInput, NUpload } from 'naive-ui'
import { useFileType } from '~/composables'

import type { UploadFileInfo } from 'naive-ui'
import type { Banner } from '~/types'

const data = defineModel<Banner>('data', { required: true })
const firstFileList = defineModel<Array<UploadFileInfo>>('firstFileList', { required: true })
const secondFileList = defineModel<Array<UploadFileInfo>>('secondFileList', { required: true })
const videoFileList = defineModel<Array<UploadFileInfo>>('videoFileList', { required: true })

const { fileTypeValidation, imageTypes, videoTypes } = useFileType()

if (data.value.firstImageSrc) {
  firstFileList.value.push({
    id: '1',
    name: `first_background_image.png`,
    status: 'finished',
    url: data.value.firstImageSrc,
  })
}

if (data.value.secondImageSrc) {
  secondFileList.value.push({
    id: '1',
    name: `second_background_image.png`,
    status: 'finished',
    url: data.value.secondImageSrc,
  })
}

if (data.value.video) {
  videoFileList.value.push({
    id: '1',
    name: `banner_video.png`,
    status: 'finished',
    url: data.value.video,
  })
}
</script>

<template>
  <NGrid
    cols="3"
    x-gap="12"
    y-gap="24"
    class="hero"
  >
    <NFormItemGi
      span="3"
      path="banner.title"
    >
      <NInput
        v-model:value="data.title"
        class="hero__input"
        placeholder="Input hero title"
      />
    </NFormItemGi>

    <NFormItemGi path="banner.firstImageSrc">
      <NUpload
        v-model:file-list="firstFileList"
        class="hero__upload"
        list-type="image-card"
        :max="1"
        @before-upload="fileTypeValidation($event, imageTypes)"
      >
        Click to upload first image
      </NUpload>
    </NFormItemGi>

    <NFormItemGi path="banner.secondImageSrc">
      <NUpload
        v-model:file-list="secondFileList"
        class="hero__upload"
        list-type="image-card"
        :max="1"
        @before-upload="fileTypeValidation($event, imageTypes)"
      >
        Click to upload second image
      </NUpload>
    </NFormItemGi>

    <NFormItemGi path="banner.video">
      <NUpload
        v-model:file-list="videoFileList"
        class="hero__upload"
        list-type="image-card"
        accept=".mp4,.webm"
        :max="1"
        @before-upload="fileTypeValidation($event, videoTypes)"
      >
        Click to upload video
      </NUpload>
    </NFormItemGi>
  </NGrid>
</template>

<style scoped lang="scss">
.hero {
  &__input {
    width: calc(50% - 12px / 2);
  }

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
}
</style>
