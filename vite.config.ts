import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'
import { VitePWA } from 'vite-plugin-pwa'

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
						name: 'preset-default',
						params: {
							overrides: {
								removeViewBox: false,
							},
						},
					},
				],
			},
		}),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: { enabled: true },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg}'],
        maximumFileSizeToCacheInBytes: 5_242_880,
      },
      includeAssets: ['fonts/*.{woff,woff2}','images/*.{png,jpg,jpeg,webp}', 'videos/*.{mp4,webm}','css/*.css', 'js/*.js'],
      manifest: {
        short_name: 'Pebble',
        name: 'Pebble - 639852 pet project',
        start_url: '/',
        display: 'standalone',
        theme_color: '#575349',
        background_color: '#d7d1c6',
        orientation: 'portrait',
        lang: 'en',
        icons: [
          {
            src: '/images/icon_192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/icon_512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        prefer_related_applications: false
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
