/**
 * @noformat
 */

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import inertia from '@inertiajs/vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: (mode === 'development') ? '/' : '/pebble/',
  plugins: [
    laravel({
			buildDirectory: "app/client",
      input: ['resources/client/app.ts'],
      refresh: true,
    }),
    inertia(),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
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
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,webp,svg,mp4,webm,woff,woff2}'],
        maximumFileSizeToCacheInBytes: 5_242_880,
      },
      includeAssets: ['fonts/*.{woff,woff2}','images/*.{png,jpg,jpeg,webp}', 'videos/*.{mp4,webm}','css/*.css', 'js/*.js'],
      manifest: {
        short_name: 'Pebble',
        name: 'Pebble - 639852 pet project',
        start_url: '/pebble',
        display: 'standalone',
        theme_color: '#575349',
        background_color: '#d7d1c6',
        orientation: 'portrait',
        lang: 'en',
        icons: [
          {
            src: `${(mode === 'development') ? '' : '/pebble'}/images/icon_192x192.png`,
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: `${(mode === 'development') ? '' : '/pebble'}/images/icon_512x512.png`,
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: `${(mode === 'development') ? '' : '/pebble'}/images/icon_512x512.png`,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        prefer_related_applications: false
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./resources/client', import.meta.url)),
      '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
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
	build: {
		manifest: 'manifest.json',
		chunkSizeWarningLimit: 1600,
	},
  server: {
    watch: {
      ignored: [
        '**/.agents/**',
        '**/.claude/**',
        '**/.cursor/**',
        '**/.junie/**',
        '**/vendor/**',
      ],
    },
  },
}))
