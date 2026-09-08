import { computed, h, ref } from 'vue'

import { BeerOutline, BookmarkOutline, DocumentTextOutline, ListOutline } from '@vicons/ionicons5'
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
          icon: renderIcon(ListOutline),
          children: [
            {
              key: 'main',
              label: () => h(Link, { href: '/admin/content/main' }, { default: () => 'Main' }),
              icon: renderIcon(BookmarkOutline),
            },
            {
              key: 'test',
              label: () => h(Link, { href: 'admin/content/test' }, { default: () => 'Test' }),
              icon: renderIcon(BeerOutline),
            },
          ],
        },
      ],
    },
  ])

  return { isCollapsed, items }
}

export default useSidebarOptions
