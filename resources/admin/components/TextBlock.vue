<script setup lang="ts">
import { NFormItemGi, NGrid, NInput } from 'naive-ui'
import type { FirstTextBlock } from '~/types'

defineModel<FirstTextBlock>('textBlock', { required: true })
</script>

<template>
  <NGrid
    x-gap="12"
    cols="2"
    class="text-block"
  >
    <NFormItemGi
      path="firstTextBlock.firstText"
      label="First text"
    >
      <NInput
        v-model:value="textBlock.firstText"
        class="text-block__input"
        maxlength="255"
      />
    </NFormItemGi>

    <NFormItemGi
      path="firstTextBlock.secondText"
      label="Second text"
    >
      <NInput
        v-model:value="textBlock.secondText"
        class="text-block__input"
        maxlength="255"
      />
    </NFormItemGi>
  </NGrid>
</template>

<style scoped lang="scss">
.text-block {
  &__input {
    max-width: max(100%, 576px);
  }
}
</style>
