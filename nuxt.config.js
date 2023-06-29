
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Sendit',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      script: [
        { src: '/jQuery/jquery.min.js', body: true },
        { src: '/bootstrap/bootstrap.bundle.min.js', body: true },
        { src: '/waypoints/waypoints.min.js', body: true },
        { src: '/magnific-popup/magnific-popup.min.js', body: true },
        { src: '/magnific-popup/magnific-popup.js', body: true },
        { src: '/js/script.js', body: true, defer: true}
      ],
      link: [
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico'},
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  modules: [
    '@nuxt/content'
  ],
  components: {
    global: true,
    dirs: ['~/components']
  },
  content: {
    documentDriven: true
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/public/bootstrap/bootstrap.min.css',
    '@/public/phosphor-icons/css/phosphor.css',
    '@/public/magnific-popup/magnific-popup.css',
    '@/assets/style/main.scss',
  ]
})
