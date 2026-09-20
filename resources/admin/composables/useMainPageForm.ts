import { capitalize, computed, unref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { useMessage } from 'naive-ui'

import type { Ref } from 'vue'
import type { UploadFileInfo } from 'naive-ui'
import type { MainPage } from '~/types'

function useMainPageForm(data: MainPage, files: Ref<Record<string, UploadFileInfo[]>>) {
  const message = useMessage()

  const state = useForm<MainPage>({ ...data })

  function objectToFormData() {
    const formData = new FormData()
    const twoImagesBlock = [
      { client: 'firstMedia', server: 'first_media' },
      { client: 'secondMedia', server: 'second_media' },
      { client: 'video', server: 'video' },
    ] as const
    const { bannerFirstImageSrc, bannerSecondImageSrc, bannerVideo, inviteBlockFirstImageSrc, inviteBlockSecondImageSrc, mediaSlider: slides } = unref(files)

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
      formData.append(`arrays[main_page_media_slider][${i}][src]`, slides?.[i]?.file ?? slides?.[i]?.url ?? '')
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
    const result = files.value.mediaSlider?.reduce<Record<string, UploadFileInfo[]>>(
      (result, item, index) => {
        result[index] = (item) ? [item] : []
        return result
      },
      {},
    )

    return result ?? {}
  })

  function send() {
    try {
      state.transform(() => objectToFormData())
        .post('/admin/content/main/update', {
          onSuccess: (data) => {
            message.success(data.flash.message as string)
          },
          onError: (errors) => {
            Object.values(errors).forEach((value) => {
              message.error(value)
            })
          },
        })
    } catch (error) {
      console.error(error)
      message.error((error as Error).message)
    }
  }

  return { state, files, mediaSlider, send }
}

export default useMainPageForm
