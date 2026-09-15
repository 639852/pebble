<script setup lang="ts">
import { AppHero, AppNotification, InviteBlock, MediaSlider, SecondTextBlock, SplitImages, TextBlock } from '@/components'
import type { MainPage } from '~/types'

defineProps<{ data: MainPage }>()
</script>

<template>
  <AppHero :data="data.banner" />
  <TextBlock :data="data.firstTextBlock" />
  <SplitImages :data="data.twoImagesBlock" />
  <SecondTextBlock :data="data.secondTextBlock" />
  <MediaSlider :data="data.mediaSlider" />
  <InviteBlock :data="data.inviteBlock" />
  <AppNotification />
</template>

<style scoped lang="scss"></style>
