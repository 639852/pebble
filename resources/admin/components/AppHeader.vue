<script setup lang="ts">
import { ref } from 'vue';
import { Link, router } from '@inertiajs/vue3'

import { NAvatar, NBreadcrumb, NBreadcrumbItem, NCard, NIcon, NPageHeader, NSpace } from 'naive-ui'
import { PersonCircleOutline } from '@vicons/ionicons5'

function getBreadcrumbsData() {
  return location.pathname
    .split('/')
    .filter((value) => value && value !== 'content')
    .map((value) => ({ title: `${value[0]?.toUpperCase()}${value.slice(1)}`, link: `/${value}` }))
}

const breadcrumbs = ref(getBreadcrumbsData())

router.on('navigate', () => {
  breadcrumbs.value = getBreadcrumbsData()
})
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
              :key="item.link"
              :clickable="item !== breadcrumbs.at(-1)"
            >
              <Link :href="item.link">{{ item.title }}</Link>
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

  :deep(.n-breadcrumb-item:not(.n-breadcrumb-item--clickable)) {
    pointer-events: none;
  }
}
</style>
