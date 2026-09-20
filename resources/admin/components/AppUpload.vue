<script setup lang="ts">
import { computed, ref } from 'vue';
import { NButton, NFlex, NIcon, NText, NUpload, NUploadDragger, NUploadTrigger } from 'naive-ui'
import { useFileType } from '~/composables'
import { getBase64Image } from '~/helpers';

import { Close } from '@vicons/ionicons5';
import type { UploadFileInfo } from 'naive-ui'

interface AppUploadProps {
  filesType?: 'images' | 'videos'
  min?: number
}
const props = withDefaults(defineProps<AppUploadProps>(), {
  min: 1,
})
const fileList = defineModel<UploadFileInfo[]>('file-list', { required: true })

const { fileTypeValidation, imageTypes, videoTypes } = useFileType()
const types = computed(() => {
  switch (props.filesType) {
    case 'images':
      return imageTypes
    case 'videos':
      return videoTypes
    default:
      return [...imageTypes, ...videoTypes]
  }
})

const accept = computed(() => {
  switch (props.filesType) {
    case 'images':
      return '.png,.jpg,.jpeg,.webp,.svg'
    case 'videos':
      return '.mp4,.webm'
    default:
      return '.png,.jpg,.jpeg,.webp,.svg,.mp4,.webm'
  }
})

const url = ref(fileList.value[0]?.url ?? '')

const isImage = computed(() => {
  if (fileList.value[0]?.type) {
    return imageTypes.includes(fileList.value[0]?.type ?? '')
  }
  const fileType = url.value.split('.').at(-1) ?? ''

  return imageTypes.some((value) => value.includes(fileType))
})

const isVideo = computed(() => {
  if (fileList.value[0]?.type) {
    return videoTypes.includes(fileList.value[0]?.type ?? '')
  }
  const fileType = url.value.split('.').at(-1) ?? ''

  return videoTypes.some((value) => value.includes(fileType))
})

async function setMedia(fileList: UploadFileInfo[]) {
  if (fileList[0]?.file) {
    url.value = await getBase64Image(fileList[0].file)
  } else {
    url.value = ''
  }
}
</script>

<template>
  <NFlex
    vertical
    align="center"
    class="upload"
    :size="8"
  >
    <NText class="text" :depth="3">
      {{ accept.replaceAll('.', ' ') }}
    </NText>

    <NUpload
      v-model:file-list="fileList"
      abstract
      directory-dnd
      :accept="accept"
      :max="min"
      @before-upload="fileTypeValidation($event, types)"
      @update-file-list="(list) => { setMedia(list) }"
    >
      <div
        v-if="url"
        class="n-upload-file-list n-upload-file-list--grid"
      >
        <div class="n-upload-file n-upload-file--info-status n-upload-file--image-card-type">
          <div class="n-upload-file-info">
            <div class="n-upload-file-info__thumbnail">
              <img
                v-if="isImage"
                alt=""
                :src="url"
              >
              <video
                v-if="isVideo"
                loop
                muted
                autoplay
                playsinline
              >
                <source :src="url" :type="fileList[0]?.type ?? ''">
              </video>
            </div>
            <div class="n-upload-file-info__action n-upload-file-info__action--image-card-type">
              <NButton
                quaternary
                style="--n-height: 24px; --n-padding: 0 3px"
                @click="fileList = []; url = ''"
              >
                <template #icon>
                  <NIcon size="20"> <Close /> </NIcon>
                </template>
              </NButton>
            </div>
          </div>
        </div>
      </div>

      <NUploadDragger v-else>
        <NUploadTrigger>
          <slot>Click to Upload</slot>
        </NUploadTrigger>
      </NUploadDragger>
    </NUpload>
  </NFlex>
</template>

<style scoped lang="scss">
.text {
  width: 50%;
}

.upload {
  --n-item-color-hover: rgba(255, 255, 255, 0.09);
  --n-item-icon-color: rgba(255, 255, 255, 0.38);

  width: 100%;

  .n-upload-file-list.n-upload-file-list--grid {
    grid-template-columns: repeat(auto-fill, 50%);
    justify-content: center;
  }

  .n-upload-file-list .n-upload-file:hover {
    background-color: var(--n-item-color-hover);
  }

  :deep(.n-upload-file) {
    --n-item-border-image-card: 1px solid rgba(255, 255, 255, 0.24);
  }

  :deep(.n-upload-dragger) {
    --n-dragger-border: 1px dashed rgba(255, 255, 255, 0.24);
    --n-dragger-border-hover: 1px dashed #63e2b7;
    --n-dragger-color: rgba(255, 255, 255, 0.06);

    width: 50%;
    padding: 0;
  }

  .n-upload-trigger {
    display: flex;
    align-items: center;
    justify-content: center;

    aspect-ratio: 1.75;
    padding: 8px;
  }

  .n-upload-file.n-upload-file--image-card-type {
    width: 100%;
    height: auto;
    aspect-ratio: 1.75;

    :is(img, video) {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
