<script setup lang="ts">
import { NFlex } from 'naive-ui'
</script>

<template>
  <NFlex
    vertical
    align="center"
    justify="center"
    class="error-page"
  >
    <h1 class="error-page__title">&#128532;</h1>
    <h2 class="error-page__subtitle">Page Not Found</h2>
  </NFlex>
</template>

<style scoped lang="scss">
.error-page {
  height: 75svh;

  &__title {
    font-size: 120px;
    line-height: 1.4;
  }

  &__subtitle {
    font-size: 100px;
    line-height: 1;
  }
}
</style>
