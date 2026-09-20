<script setup lang="ts">
import { NFormItemGi, NGrid, NInput } from 'naive-ui'

import { AppUpload } from '~/components'
import type { UploadFileInfo } from 'naive-ui'
import type { Banner } from '~/types'

const data = defineModel<Banner>('data', { required: true })
const firstFileList = defineModel<Array<UploadFileInfo>>('firstFileList', { required: true })
const secondFileList = defineModel<Array<UploadFileInfo>>('secondFileList', { required: true })
const videoFileList = defineModel<Array<UploadFileInfo>>('videoFileList', { required: true })
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
        maxlength="20"
      />
    </NFormItemGi>

    <NFormItemGi path="banner.firstImageSrc">
      <AppUpload
        v-model:file-list="firstFileList"
        files-type="images"
        class="hero__upload"
      >
        Click to upload first image
      </AppUpload>
    </NFormItemGi>

    <NFormItemGi path="banner.secondImageSrc">
      <AppUpload
        v-model:file-list="secondFileList"
        class="hero__upload"
        files-type="images"
      >
        Click to upload second image
      </AppUpload>
    </NFormItemGi>

    <NFormItemGi path="banner.video">
      <AppUpload
        v-model:file-list="videoFileList"
        class="hero__upload"
        files-type="videos"
      >
        Click to upload video
      </AppUpload>
    </NFormItemGi>
  </NGrid>
</template>

<style scoped lang="scss">
.hero {
  &__input {
    width: calc(50% - 12px / 2);
  }

  &__upload {
    width: 100%;

    :deep(:is(.text, .n-upload-dragger)) {
      width: 80%;
    }

    :deep(.n-upload-file-list.n-upload-file-list--grid) {
      grid-template-columns: repeat(auto-fill, 80%);
    }
  }
}
</style>
