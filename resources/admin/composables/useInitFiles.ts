import { ref } from 'vue'

import type { UploadFileInfo } from 'naive-ui'
import type { MainPage } from '~/types'

function useInitFiles(data: MainPage) {
  const initValue = {
    bannerFirstImageSrc: [],
    bannerSecondImageSrc: [],
    bannerVideo: [],
    twoImagesBlockFirstMedia: [],
    twoImagesBlockSecondMedia: [],
    twoImagesBlockVideo: [],
    mediaSlider: [],
    inviteBlockFirstImageSrc: [],
    inviteBlockSecondImageSrc: [],
  }
  const files = ref<Record<keyof typeof initValue, UploadFileInfo[]>>(initValue)

  if (data.banner.firstImageSrc) {
    files.value.bannerFirstImageSrc.push({
      id: '1',
      name: `first_background_image.png`,
      status: 'finished',
      url: data.banner.firstImageSrc,
    })
  }

  if (data.banner.secondImageSrc) {
    files.value.bannerSecondImageSrc.push({
      id: '1',
      name: `second_background_image.png`,
      status: 'finished',
      url: data.banner.secondImageSrc,
    })
  }

  if (data.banner.video) {
    files.value.bannerVideo.push({
      id: '1',
      name: `banner_video.png`,
      status: 'finished',
      url: data.banner.video,
    })
  }

  if (data.twoImagesBlock.firstMedia.src) {
    files.value.twoImagesBlockFirstMedia.push({
      id: '1',
      name: `${data.twoImagesBlock.firstMedia.title}.png`,
      status: 'finished',
      url: data.twoImagesBlock.firstMedia.src,
    })
  }

  if (data.twoImagesBlock.secondMedia.src) {
    files.value.twoImagesBlockSecondMedia.push({
      id: '1',
      name: `${data.twoImagesBlock.secondMedia.title}.png`,
      status: 'finished',
      url: data.twoImagesBlock.secondMedia.src,
    })
  }

  if (data.twoImagesBlock.video.src) {
    files.value.twoImagesBlockVideo.push({
      id: '1',
      name: `${data.twoImagesBlock.video.title}.png`,
      status: 'finished',
      url: data.twoImagesBlock.video.src,
    })
  }

  data.mediaSlider.items.forEach(({ src, title }, i) => {
    // @ts-expect-error mediaSlider transform in object in component
    if (!src) files.value.mediaSlider.push(null)
    else {
      files.value.mediaSlider.push({
        id: `${i + 1}`,
        name: `${title}.png`,
        status: 'finished',
        url: src,
      })
    }
  })

  if (data.inviteBlock.firstImageSrc) {
    files.value.inviteBlockFirstImageSrc.push({
      id: '1',
      name: `first_background_image.png`,
      status: 'finished',
      url: data.inviteBlock.firstImageSrc,
    })
  }

  if (data.inviteBlock.secondImageSrc) {
    files.value.inviteBlockSecondImageSrc.push({
      id: '1',
      name: `second_background_image.png`,
      status: 'finished',
      url: data.inviteBlock.secondImageSrc,
    })
  }

  return { files }
}

export default useInitFiles
