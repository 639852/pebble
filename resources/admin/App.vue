<script setup lang="ts">
import { darkTheme, NConfigProvider, NGlobalStyle, NLayout, NLayoutContent, NLayoutHeader, NLayoutSider, NMessageProvider } from 'naive-ui'
import { useSidebarOptions } from '~/composables'

import { AppHeader, AppSider } from '~/components'

const { isCollapsed, items } = useSidebarOptions()
</script>

<template>
  <!-- inertia props from backend -->
  {{ console.log('props', $page.props) }}

  <NConfigProvider :theme="darkTheme">
    <NMessageProvider>
      <NLayout
        has-sider
        position="absolute"
      >
        <NLayoutSider
          v-if="$page.component !== 'LoginPage'"
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="300"
          @collapse="isCollapsed = true"
          @expand="isCollapsed = false"
        >
          <AppSider
            :collapsed="isCollapsed"
            :items="items"
          />
        </NLayoutSider>

        <NLayout
          class="layout"
          content-class="layout__container"
        >
          <NLayoutHeader
            v-if="$page.component !== 'LoginPage'"
            class="layout__header"
          >
            <AppHeader />
          </NLayoutHeader>
          <NLayoutContent class="layout__content">
            <slot></slot>
          </NLayoutContent>
        </NLayout>
      </NLayout>
      <NGlobalStyle />
    </NMessageProvider>
  </NConfigProvider>
</template>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  :is(h1, h2, h3, h4, h5, h6, p) {
    margin: 0;
    padding: 0;
  }
}

.layout {
  min-height: 100svh;

  &__container {
    padding: 24px;
  }

  &__content:has(.login-page) {
    height: 100%;
  }

  &__header {
    width: 100%;
    margin-bottom: 24px;
  }
}
</style>
