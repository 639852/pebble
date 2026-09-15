<script setup lang="ts">
import { NFormItemGi, NGrid, NInput, NUpload } from 'naive-ui'
import { useFileType } from '~/composables'

import type { UploadFileInfo } from 'naive-ui'
import type { InviteBlock } from '~/types'

const data = defineModel<InviteBlock>('data', { required: true })
const firstFileList = defineModel<Array<UploadFileInfo>>('firstFileList', { required: true })
const secondFileList = defineModel<Array<UploadFileInfo>>('secondFileList', { required: true })

const { fileTypeValidation, imageTypes } = useFileType()

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
</script>

<template>
  <NGrid
    cols="2"
    x-gap="12"
    y-gap="12"
    class="invite-block"
  >
    <NFormItemGi
      path="inviteBlock.title"
      label="Title"
    >
      <NInput v-model:value="data.title" />
    </NFormItemGi>

    <NFormItemGi
      path="inviteBlock.subtitle"
      label="Subtitle"
    >
      <NInput v-model:value="data.subtitle" />
    </NFormItemGi>

    <NFormItemGi
      path="inviteBlock.firstButton.text"
      label="First button text"
    >
      <NInput v-model:value="data.firstButton.text" />
    </NFormItemGi>

    <NFormItemGi
      path="inviteBlock.firstButton.href"
      label="First button link"
    >
      <NInput v-model:value="data.firstButton.href" />
    </NFormItemGi>

    <NFormItemGi
      path="inviteBlock.secondButton.text"
      label="Second button text"
    >
      <NInput v-model:value="data.secondButton.text" />
    </NFormItemGi>

    <NFormItemGi
      path="inviteBlock.secondButton.href"
      label="Second button link"
    >
      <NInput v-model:value="data.secondButton.href" />
    </NFormItemGi>

    <NFormItemGi
      path="inviteBlock.text"
      label="Text under buttons"
      span="2"
    >
      <NInput
        v-model:value="data.text"
        class="invite-block__input"
      />
    </NFormItemGi>

    <NFormItemGi
      path="inviteBlock.firstImageSrc"
      label="First background image"
    >
      <NUpload
        v-model:file-list="firstFileList"
        class="invite-block__upload"
        list-type="image-card"
        :max="1"
        @before-upload="fileTypeValidation($event, imageTypes)"
      >
        Click to Upload
      </NUpload>
    </NFormItemGi>

    <NFormItemGi
      path="inviteBlock.secondImageSrc"
      label="Second background image"
    >
      <NUpload
        v-model:file-list="secondFileList"
        class="invite-block__upload"
        list-type="image-card"
        :max="1"
        @before-upload="fileTypeValidation($event, imageTypes)"
      >
        Click to Upload
      </NUpload>
    </NFormItemGi>
  </NGrid>
</template>

<style scoped lang="scss">
.invite-block {
  &__input {
    max-width: max(50% - 6px, 576px);
  }

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
