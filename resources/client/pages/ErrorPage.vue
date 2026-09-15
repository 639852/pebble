<script setup lang="ts"></script>

<template>
  <div class="error-page">
    <h1 class="error-page__title">&#128532;</h1>
    <h2 class="error-page__subtitle">Page Not Found</h2>
  </div>
</template>

<style scoped lang="scss">
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 100svh;

  &__title {
    margin: 0;

    font-size: 120px;
    line-height: 1.4;
  }

  &__subtitle {
    margin: 0;

    font-size: 100px;
    line-height: 1;
  }
}
</style>
