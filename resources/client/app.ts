import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'

import AppLayout from '@/App.vue'
import type { DefineComponent } from 'vue'

import '@/assets/js/smooth-scroller.js'
import 'normalize.css'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

void createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  progress: {
    color: '#4B5563',
  },
  resolve: (name) => {
    const pages = import.meta.glob<DefineComponent>('./pages/**/*.vue', { eager: true })
    const page = pages[`./pages/${name}.vue`]!

    page.default.layout ??= AppLayout
    return page
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el)
  },
})
