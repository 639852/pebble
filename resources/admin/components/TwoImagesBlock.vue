<script setup lang="ts">
import { NFormItemGi, NGrid, NInput } from 'naive-ui'

import { AppUpload } from '~/components'
import type { UploadFileInfo } from 'naive-ui'
import type { TwoImagesBlock } from '~/types'

const data = defineModel<TwoImagesBlock>('data', { required: true })
const firstFileList = defineModel<Array<UploadFileInfo>>('firstFileList', { required: true })
const secondFileList = defineModel<Array<UploadFileInfo>>('secondFileList', { required: true })
const videoFileList = defineModel<Array<UploadFileInfo>>('videoFileList', { required: true })
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
      <NInput
        v-model:value="data.firstMedia.title"
        maxlength="20"
      />
    </NFormItemGi>

    <NFormItemGi
      path="twoImagesBlock.secondMedia.title"
      label="Second image title"
    >
      <NInput
        v-model:value="data.secondMedia.title"
        maxlength="20"
      />
    </NFormItemGi>

    <NFormItemGi
      path="twoImagesBlock.firstMedia.description"
      label="First image description"
    >
      <NInput
        v-model:value="data.firstMedia.description"
        maxlength="255"
      />
    </NFormItemGi>

    <NFormItemGi
      path="twoImagesBlock.secondMedia.description"
      label="Second image description"
    >
      <NInput
        v-model:value="data.secondMedia.description"
        maxlength="255"
      />
    </NFormItemGi>

    <NFormItemGi
      path="twoImagesBlock.firstMedia.src"
      label="First image"
    >
      <AppUpload
        v-model:file-list="firstFileList"
        files-type="images"
        class="two-images__upload"
        :max="1"
      >
        Click to Upload
      </AppUpload>
    </NFormItemGi>

    <NFormItemGi
      path="twoImagesBlock.secondMedia.src"
      label="Second image"
    >
      <AppUpload
        v-model:file-list="secondFileList"
        files-type="images"
        class="two-images__upload"
        :max="1"
      >
        Click to Upload
      </AppUpload>
    </NFormItemGi>

    <NFormItemGi
      path="twoImagesBlock.video.title"
      label="Video title"
    >
      <NInput
        v-model:value="data.video.title"
        maxlength="20"
      />
    </NFormItemGi>

    <NFormItemGi />

    <NFormItemGi
      path="twoImagesBlock.video.description"
      label="Video description"
    >
      <NInput
        v-model:value="data.video.description"
        maxlength="255"
      />
    </NFormItemGi>

    <NFormItemGi />

    <NFormItemGi
      path="twoImagesBlock.video.src"
      label="Video"
    >
      <AppUpload
        v-model:file-list="videoFileList"
        files-type="videos"
        class="two-images__upload"
        :max="1"
      >
        Click to Upload
      </AppUpload>
    </NFormItemGi>
  </NGrid>
</template>

<style scoped lang="scss">
.two-images {
  &__upload {
    :deep(:is(.text, .n-upload-dragger)) {
      align-self: start;
    }

    :deep(.n-upload-file-list.n-upload-file-list--grid) {
      justify-content: start;
    }
  }
}
</style>
