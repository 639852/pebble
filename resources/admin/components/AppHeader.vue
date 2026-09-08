<script setup lang="ts">
import { NAvatar, NBreadcrumb, NBreadcrumbItem, NCard, NIcon, NPageHeader, NSpace } from 'naive-ui'
import { PersonCircleOutline } from '@vicons/ionicons5'
</script>

<template>
  <NCard>
    <NPageHeader class="header">
      <template #header>
        <NSpace
          align="center"
          justify="space-between"
        >
          <NBreadcrumb>
            <NBreadcrumbItem>Podcast</NBreadcrumbItem>
            <NBreadcrumbItem>Best Collection</NBreadcrumbItem>
            <NBreadcrumbItem>Ultimate Best Collection</NBreadcrumbItem>
            <NBreadcrumbItem>Anyway.FM</NBreadcrumbItem>
          </NBreadcrumb>

          <NAvatar round>
            <NIcon>
              <PersonCircleOutline />
            </NIcon>
          </NAvatar>
        </NSpace>
      </template>
    </NPageHeader>
  </NCard>
</template>

<style scoped lang="scss">
.header {
  :deep(.n-page-header-header) {
    &:only-child {
      margin-bottom: 0;
    }
  }
}
</style>
