export default defineNuxtConfig({
  typescript: { strict: true },
  ssr: false,

  runtimeConfig: {
    public: {
      env: '',
      accessToken: 'access-token',
      name: 'Midas Starter Project',
      apiUrl: '',
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      title: 'Starter Project',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Starter Project' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  modules: ['@nuxt/ui', 'dayjs-nuxt', '@nuxtjs/i18n', '@vueuse/nuxt'],

  colorMode: {
    preference: 'light',
  },

  i18n: { vueI18n: './i18n.config.ts' },

  dayjs: {
    locales: ['th'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'th',
    defaultTimezone: 'Asia/Bangkok',
  },

  css: ['@/assets/css/main.scss'],
  postcss: { plugins: { tailwindcss: {}, autoprefixer: {} } },

  vite: {
    ssr: {
      noExternal: ['lodash'],
    },
  },

  compatibilityDate: '2024-09-17',
})