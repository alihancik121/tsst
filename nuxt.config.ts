const title = 'token checker';
const description = 'for some skids';

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      meta: [
        { name: 'description', content: description },
        { name: 'keywords', content: 'yungouzo' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#5865F2' },
        { property: 'og:title', content: title },
        { property: 'og:type', content: 'website' },
        { property: 'og:description', content: description },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  modules: ['@nuxtjs/color-mode', '@nuxtjs/tailwindcss'],
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],

  colorMode: {
    classSuffix: '',
    preference: 'dark',
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
    viewer: false,
  },

  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-brands-svg-icons',
      '@fortawesome/vue-fontawesome',
    ],
  },

  runtimeConfig: {
    public: {
      ANALYTICS_URL: process.env.ANALYTICS_URL,
      GATEWAY_URL: process.env.GATEWAY_URL || 'https://discord.com/api/v9',
    },
  },

  nitro: {
    preset: 'vercel'
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
});