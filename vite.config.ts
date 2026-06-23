import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: (mode === 'development') ? '/' : '/pebble/',
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
		svgLoader({
			svgoConfig: {
				plugins: [
					{
						name: "preset-default",
						params: {
							overrides: {
								removeViewBox: false,
							},
						},
					},
				],
			},
		}),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
          @use '@/assets/scss/variables' as vars;
          @use '@/assets/scss/mixins' as mix;
        `,
      },
    },
  },
}))
