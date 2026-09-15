export interface TextWithMedia {
  src: string | null
  title: string | null
  description: string | null
}

export interface Banner {
  title: string | null
  firstImageSrc: string | null
  secondImageSrc: string | null
  video: string | null
}

export interface FirstTextBlock {
  firstText: string | null
  secondText: string | null
}

export interface TwoImagesBlock {
  firstMedia: TextWithMedia
  secondMedia: TextWithMedia
  video: TextWithMedia
}

export interface MediaSlider {
  buttonText: string | null
  buttonLink: string | null
  items: TextWithMedia[]
}

export interface Button {
  href: string | null
  text: string | null
}

export interface InviteBlock {
  title: string | null
  subtitle: string | null
  text: string | null
  firstImageSrc: string | null
  secondImageSrc: string | null
  firstButton: Button
  secondButton: Button
}

export interface MainPage {
  banner: Banner
  firstTextBlock: FirstTextBlock
  twoImagesBlock: TwoImagesBlock
  secondTextBlock: { title: string | null }
  mediaSlider: MediaSlider
  inviteBlock: InviteBlock
}

export type { MainPage as default }
