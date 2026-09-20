<script setup lang="ts">
import { NButton, NCard, NCollapse, NCollapseItem, NForm, NFormItem, NInput } from 'naive-ui'
import { useInitFiles, useMainPageForm } from '~/composables'

import { AppHero, InviteBlock, MediaSlider, TextBlock, TwoImagesBlock } from '~/components'
import type { UploadFileInfo } from 'naive-ui'
import type { MainPage } from '~/types'

const props = defineProps<{ data: MainPage }>()

const { files } = useInitFiles(props.data)
const { state, mediaSlider, send } = useMainPageForm(props.data, files)

function setMediaSlider(fileList: Record<string, UploadFileInfo[]>) {
  // @ts-expect-error mediaSlider transform in object in component
  files.value.mediaSlider = Object.values(fileList).flatMap(((value) => (value.length === 0) ? null : value))
}
</script>

<template>
  <NCard class="main-page">
    <NForm :model="state">
      <NCollapse
        accordion
        arrow-placement="right"
        display-directive="show"
        class="main-page__collapse"
      >
        <NCollapseItem
          name="banner"
          title="Main banner"
        >
          <AppHero
            v-model:data="state.banner"
            v-model:first-file-list="files.bannerFirstImageSrc!"
            v-model:second-file-list="files.bannerSecondImageSrc!"
            v-model:video-file-list="files.bannerVideo!"
          />
        </NCollapseItem>

        <NCollapseItem
          name="text-block"
          title="Text block"
        >
          <TextBlock v-model:text-block="state.firstTextBlock" />
        </NCollapseItem>

        <NCollapseItem
          name="two-images"
          title="Two images block"
        >
          <TwoImagesBlock
            v-model:data="state.twoImagesBlock"
            v-model:first-file-list="files.twoImagesBlockFirstMedia!"
            v-model:second-file-list="files.twoImagesBlockSecondMedia!"
            v-model:video-file-list="files.twoImagesBlockVideo!"
          />
        </NCollapseItem>

        <NCollapseItem
          name="second-text-block"
          title="Second text block"
        >
          <NFormItem
            path="secondTextBlock.title"
            label="Text block title"
          >
            <NInput
              v-model:value="state.secondTextBlock.title"
              class="main-page__input"
              maxlength="255"
            />
          </NFormItem>
        </NCollapseItem>

        <NCollapseItem
          name="media-slider"
          title="Media slider"
        >
          <MediaSlider
            v-model:data="state.mediaSlider"
            :file-list="mediaSlider"
            @update:file-list="setMediaSlider"
          />
        </NCollapseItem>

        <NCollapseItem
          name="invite-block"
          title="Invite block"
        >
          <InviteBlock
            v-model:data="state.inviteBlock"
            v-model:first-file-list="files.inviteBlockFirstImageSrc!"
            v-model:second-file-list="files.inviteBlockSecondImageSrc!"
          />
        </NCollapseItem>
      </NCollapse>
    </NForm>

    <template #action>
      <NButton
        secondary
        type="primary"
        size="large"
        @click="send"
      >
        Save
      </NButton>
    </template>
  </NCard>
</template>

<style scoped lang="scss">
.main-page {
  &__collapse {
    :deep(.n-collapse-item__header-main) {
      font-size: 18px;
    }

    &.n-collapse :deep(.n-collapse-item-arrow) {
      font-size: 20px;
    }
  }

  &__input {
    max-width: max(50% - 6px, 576px);
  }
}
</style>
