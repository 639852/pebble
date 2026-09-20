<script setup lang="ts">
import { NButton, NDivider, NFormItemGi, NGi, NGrid, NInput } from 'naive-ui'

import { AppUpload } from '~/components'
import type { UploadFileInfo } from 'naive-ui'
import type { MediaSlider } from '~/types'

const mediaSlider = defineModel<MediaSlider>('data', { required: true })
const fileList = defineModel<Record<string, UploadFileInfo[]>>('fileList', { required: true })

defineEmits(['update:fileList'])

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
      <NInput
        v-model:value="data.buttonText"
        maxlength="255"
      />
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
        <NInput
          v-model:value="item.title"
          maxlength="255"
        />
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
        <AppUpload
          class="media-slider__upload"
          :max="1"
          :file-list="fileList[i] ?? []"
          @update:file-list="fileList[i] = $event; $emit('update:fileList', fileList)"
        >
          Click to Upload
        </AppUpload>
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
  // &__upload {
  //   :deep(:is(.text, .n-upload-dragger)) {
  //     align-self: start;
  //   }

  //   :deep(.n-upload-file-list.n-upload-file-list--grid) {
  //     justify-content: start;
  //   }
  // }

  .justify-end {
    justify-self: end;
  }
}
</style>
