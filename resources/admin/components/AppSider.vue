<script setup lang="ts">
import { ref } from 'vue'
import { NMenu, NSpace } from 'naive-ui'

import type { MenuOption } from 'naive-ui'

interface AppSiderProps {
  collapsed?: boolean
  items: MenuOption[]
}
defineProps<AppSiderProps>()

const activeKey = ref<string>()
</script>

<template>
  <NSpace
    vertical
    class="sider"
    :class="{ '--collapsed': collapsed }"
  >
    <h1 class="sider__title">A<template v-if="!collapsed">dmin panel</template></h1>

    <NMenu
      v-model:value="activeKey"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="24"
      :options="items"
      :root-indent="12"
      :indent="12"
    />
  </NSpace>
</template>

<style scoped lang="scss">
.sider {
  $this: &;

  padding: 24px;

  &.--collapsed {
    display: contents !important;

    #{$this}__title {
      padding: 24px;
    }
  }

  &__title {
    white-space: nowrap;
  }
}
</style>
