<script setup lang="ts">
import { capitalize, computed, reactive, ref, unref } from 'vue'
import { router } from '@inertiajs/vue3'
import { NButton, NCard, NCollapse, NCollapseItem, NForm, NFormItem, NInput, useMessage } from 'naive-ui'

import { AppHero, InviteBlock, MediaSlider, TextBlock, TwoImagesBlock } from '~/components'
import type { UploadFileInfo } from 'naive-ui'
import type { MainPage } from '~/types'

const props = defineProps<{ data: MainPage }>()

const message = useMessage()
const state = reactive<MainPage>({ ...props.data })
const files = ref<Record<string, UploadFileInfo[]>>({
  bannerFirstImageSrc: [],
  bannerSecondImageSrc: [],
  bannerVideo: [],
  twoImagesBlockFirstMedia: [],
  twoImagesBlockSecondMedia: [],
  twoImagesBlockVideo: [],
  mediaSlider: [],
  inviteBlockFirstImageSrc: [],
  inviteBlockSecondImageSrc: [],
})

function objectToFormData() {
  const formData = new FormData()
  const twoImagesBlock = [
    { client: 'firstMedia', server: 'first_media' },
    { client: 'secondMedia', server: 'second_media' },
    { client: 'video', server: 'video' },
  ] as const
  const { bannerFirstImageSrc, bannerSecondImageSrc, bannerVideo, inviteBlockFirstImageSrc, inviteBlockSecondImageSrc } = unref(files)

  formData.append('settings[main_page_hero_title]', state.banner.title ?? '')
  formData.append('media[main_page_hero_first_image][src]', bannerFirstImageSrc?.[0]?.file ?? bannerFirstImageSrc?.[0]?.url ?? '')
  formData.append('media[main_page_hero_first_image][remove]', bannerFirstImageSrc?.[0]?.name ? '' : '1')
  formData.append('media[main_page_hero_second_image][src]', bannerSecondImageSrc?.[0]?.file ?? bannerSecondImageSrc?.[0]?.url ?? '')
  formData.append('media[main_page_hero_second_image][remove]', bannerSecondImageSrc?.[0]?.name ? '' : '1')
  formData.append('media[main_page_hero_video][src]', bannerVideo?.[0]?.file ?? bannerVideo?.[0]?.url ?? '')
  formData.append('media[main_page_hero_video][remove]', bannerVideo?.[0]?.name ? '' : '1')

  formData.append('settings[main_page_first_text_block_first_text]', state.firstTextBlock.firstText ?? '')
  formData.append('settings[main_page_first_text_block_second_text]', state.firstTextBlock.secondText ?? '')

  twoImagesBlock.forEach(({ client, server }) => {
    const key = `twoImagesBlock${capitalize(client)}`

    formData.append(`media[main_page_two_images_${server}_src][src]`, files.value[key]?.[0]?.file ?? files.value[key]?.[0]?.url ?? '')
    formData.append(`media[main_page_two_images_${server}_src][remove]`, files.value[key]?.[0]?.name ? '' : '1')
    formData.append(`settings[main_page_two_images_${server}_title]`, state.twoImagesBlock[client].title ?? '')
    formData.append(`settings[main_page_two_images_${server}_description]`, state.twoImagesBlock[client].description ?? '')
  })

  formData.append('settings[main_page_second_text_block_title]', state.secondTextBlock.title ?? '')

  formData.append('settings[main_page_media_slider_button_text]', state.mediaSlider.buttonText ?? '')
  formData.append('settings[main_page_media_slider_button_link]', state.mediaSlider.buttonLink ?? '')

  state.mediaSlider.items.forEach((item, i) => {
    const media = Object.values(mediaSlider.value).flat()

    formData.append(`arrays[main_page_media_slider][${i}][src]`, media?.[i]?.file ?? media?.[i]?.url ?? '')
    formData.append(`arrays[main_page_media_slider][${i}][title]`, item.title ?? '')
    formData.append(`arrays[main_page_media_slider][${i}][description]`, item.description ?? '')
  })

  formData.append('settings[main_page_invite_block_title]', state.inviteBlock.title ?? '')
  formData.append('settings[main_page_invite_block_subtitle]', state.inviteBlock.subtitle ?? '')
  formData.append('settings[main_page_invite_block_text]', state.inviteBlock.text ?? '')
  formData.append('media[main_page_invite_block_first_image][src]', inviteBlockFirstImageSrc?.[0]?.file ?? inviteBlockFirstImageSrc?.[0]?.url ?? '')
  formData.append('media[main_page_invite_block_first_image][remove]', inviteBlockFirstImageSrc?.[0]?.name ? '' : '1')
  formData.append(
    'media[main_page_invite_block_second_image][src]',
    inviteBlockSecondImageSrc?.[0]?.file ?? inviteBlockSecondImageSrc?.[0]?.url ?? '',
  )
  formData.append('media[main_page_invite_block_second_image][remove]', inviteBlockSecondImageSrc?.[0]?.name ? '' : '1')

  formData.append('settings[main_page_invite_block_first_button_text]', state.inviteBlock.firstButton.text ?? '')
  formData.append('settings[main_page_invite_block_first_button_href]', state.inviteBlock.firstButton.href ?? '')
  formData.append('settings[main_page_invite_block_second_button_text]', state.inviteBlock.secondButton.text ?? '')
  formData.append('settings[main_page_invite_block_second_button_href]', state.inviteBlock.secondButton.href ?? '')

  return formData
}

const mediaSlider = computed(() => {
  const result = files.value.mediaSlider?.reduce(
    (result, item, index) => {
      result[index] = [item]
      return result
    },
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    {} as Record<string, UploadFileInfo[]>,
  )

  return result ?? {}
})

async function send() {
  try {
    const body = objectToFormData()
    const response = await fetch('/admin/content/main/update', { method: 'post', body })
    const data = await response.json()

    if (data.status) {
      message.success(data.message)
      router.reload()
    } else {
      throw new Error(data.message)
    }
  } catch (error) {
    console.error(error)
    message.error((error as Error).message)
  }
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
            @update:file-list="files.mediaSlider = Object.values($event).flat()"
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
