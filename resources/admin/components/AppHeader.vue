<script setup lang="ts">
import { NAvatar, NBreadcrumb, NBreadcrumbItem, NCard, NIcon, NPageHeader, NSpace } from 'naive-ui'
import { PersonCircleOutline } from '@vicons/ionicons5'

const breadcrumbs = location.pathname
  .split('/')
  .filter((value) => value && value !== 'content')
  .map((value) => `${value[0]?.toUpperCase()}${value.slice(1)}`)
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
            <NBreadcrumbItem
              v-for="item of breadcrumbs"
              :key="item"
            >
              {{ item }}
            </NBreadcrumbItem>
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
