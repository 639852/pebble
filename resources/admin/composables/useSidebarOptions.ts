import { computed, h, ref } from 'vue'

import {
  AlbumsOutline,
  BeerOutline,
  BookmarkOutline,
  BrowsersOutline,
  CaretDownCircleOutline,
  CaretUpCircleOutline,
  DocumentTextOutline,
  ListOutline,
  SettingsOutline,
} from '@vicons/ionicons5'
import { renderIcon } from '~/helpers'

import type { MenuOption } from 'naive-ui'
import { Link } from '@inertiajs/vue3'

function useSidebarOptions() {
  const isCollapsed = ref(false)
  const items = computed<MenuOption[]>(() => [
    {
      type: isCollapsed.value ? undefined : 'group',
      key: 'content',
      label: 'Content',
      icon: isCollapsed.value ? renderIcon(DocumentTextOutline) : undefined,
      children: [
        {
          label: 'Pages',
          key: 'pages',
          icon: renderIcon(BrowsersOutline),
          children: [
            {
              key: 'main',
              label: () => h(Link, { href: '/admin/content/main' }, { default: () => 'Main' }),
              icon: renderIcon(BookmarkOutline),
            },
            {
              key: 'test',
              label: () => h(Link, { href: '/admin/content/test' }, { default: () => 'Test' }),
              icon: renderIcon(BeerOutline),
            },
          ],
        },
        {
          label: 'Common blocks',
          key: 'common',
          icon: renderIcon(AlbumsOutline),
          children: [
            {
              key: 'header',
              label: () => h(Link, { href: '/admin/content/header' }, { default: () => 'Header' }),
              icon: renderIcon(CaretUpCircleOutline),
            },
            {
              key: 'footer',
              label: () => h(Link, { href: '/admin/content/footer' }, { default: () => 'Footer' }),
              icon: renderIcon(CaretDownCircleOutline),
            },
          ],
        },
      ],
    },
    {
      type: isCollapsed.value ? undefined : 'group',
      key: 'settings',
      label: 'Settings',
      icon: isCollapsed.value ? renderIcon(ListOutline) : undefined,
      children: [
        {
          key: 'settings-page',
          label: () => h(Link, { href: '/admin/settings' }, { default: () => 'Settings' }),
          icon: renderIcon(SettingsOutline),
        },
      ],
    },
  ])

  return { isCollapsed, items }
}

export default useSidebarOptions
