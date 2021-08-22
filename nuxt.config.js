const axios = require('axios')

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'bootstrap-nuxt-demo-next',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.9/css/all.css' },
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/styles.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/filters',
    '~/plugins/storyblokHelpers'
  ],

  // Router setup : https://nuxtjs.org/docs/2.x/directory-structure/middleware#router-middleware
  router: {
    middleware: [
      'storyblokConfigure',
      'redirectHome'
    ]
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://github.com/hpfahl/storyblok-nuxt-routes
    ['storyblok-nuxt-routes', {
      // contentTypes: 'page,article',
      // resolveLinks: 'url',
      // resolveRelations: 'page.author',
      // exclude: [ '^\/home' ]
      routeRealPath: true
    }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://github.com/storyblok/storyblok-nuxt
    'storyblok-nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        chunks: 'async',
      }
    },
    splitChunks: {
      pages: false,
      vendor: true,
      commons: true,
      runtime: true,
      layouts: false
    },
  },

  // Generat config: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate
  generate: {
    fallback: true,
    crawler: false,
    // routes: ['/']
  },

  // Storyblok config
  storyblok: {
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
    cacheProvider: 'memory'
  },

  // hooks: {
  //   generate: {
  //     route({ route, setPayload }) {
  //       console.log('--', route)
  //     },
  //     page({ route, path, html }) {
  //       console.log('>>', route, path) //, html)
  //     },
  //     routeCreated({ route, path, errors }) {
  //       console.log('++', route, path, errors)
  //     },
  //     routeFailed({ route, errors }) {
  //       console.error('!!', route, errors)
  //     }
  //   }
  // }
}
