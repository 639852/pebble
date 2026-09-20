<script setup lang="ts">
import { NFormItemGi, NGrid, NInput } from 'naive-ui'

import { AppUpload } from '~/components'
import type { UploadFileInfo } from 'naive-ui'
import type { InviteBlock } from '~/types'

const data = defineModel<InviteBlock>('data', { required: true })
const firstFileList = defineModel<Array<UploadFileInfo>>('firstFileList', { required: true })
const secondFileList = defineModel<Array<UploadFileInfo>>('secondFileList', { required: true })
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
      <NInput
        v-model:value="data.title"
        maxlength="16"
      />
    </NFormItemGi>

    <NFormItemGi
      path="inviteBlock.subtitle"
      label="Subtitle"
    >
      <NInput
        v-model:value="data.subtitle"
        maxlength="16"
      />
    </NFormItemGi>

    <NFormItemGi
      path="inviteBlock.firstButton.text"
      label="First button text"
    >
      <NInput
        v-model:value="data.firstButton.text"
        maxlength="16"
      />
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
      <NInput
        v-model:value="data.secondButton.text"
        maxlength="16"
      />
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
        maxlength="16"
      />
    </NFormItemGi>

    <NFormItemGi
      path="inviteBlock.firstImageSrc"
      label="First background image"
    >
      <AppUpload
        v-model:file-list="firstFileList"
        files-type="images"
        class="invite-block__upload"
      >
        Click to Upload
      </AppUpload>
    </NFormItemGi>

    <NFormItemGi
      path="inviteBlock.secondImageSrc"
      label="Second background image"
    >
      <AppUpload
        v-model:file-list="secondFileList"
        files-type="images"
        class="invite-block__upload"
      >
        Click to Upload
      </AppUpload>
    </NFormItemGi>
  </NGrid>
</template>

<style scoped lang="scss">
.invite-block {
  &__input {
    max-width: max(50% - 6px, 576px);
  }

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
