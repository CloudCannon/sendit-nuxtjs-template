export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  router: {
    prefetchLinks: false
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Sendit',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    script: [
      { src: '/jQuery/jquery.min.js', body: true },
      { src: '/bootstrap/bootstrap.bundle.min.js', body: true },
      { src: '/waypoints/waypoints.min.js', body: true },
      { src: '/magnific-popup/magnific-popup.min.js', body: true },
      { src: 'js/script.js', body: true}

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/style/main.scss',
    '@/static/bootstrap/bootstrap.min.css',
    '@/static/phosphor-icons/css/phosphor.css',
    '@/static/magnific-popup/magnific-popup.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content',
    '@nuxt/components'
  ],
  generate: {
    async routes () {
      const { $content } = require('@nuxt/content')
      const files = await $content({ deep: true }).only(['path']).fetch()
      return files.map(file => file.path === '/index' ? '/' : file.path)
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
