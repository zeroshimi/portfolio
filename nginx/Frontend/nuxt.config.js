require('dotenv').config()
const { BASE_URL, API_URL } = process.env

export default {
  loading: {
    loading: '~/components/loading.vue'
  },
  vue: {
    devtools: true
  },
  server: {
    host: 'localhost',
    port: 3000
  },
  env: {
    BASE_URL,
    API_URL
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    { src: '@assets/scss/style.scss', lang: 'scss' },
    { src: '@assets/scss/normalized.scss', lang: 'scss' }
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '@plugins/util.js', ssr: false }
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/fontawesome'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/device',
    'nuxt-webfontloader',
    '@nuxtjs/auth'
  ],
  fontawesome: {
    component: 'fa'
  },
  webfontloader: {
    google: {
      families: ['Bangers', 'Caveat', 'Kaushan+Script']
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://172.0.0.1:3000'
  },
  serverMiddleware: [
    { path: '/api', handler: '~/api/index.js' }
  ],
  /*auth: {
    cookie: false,
    redirect: {
      login: '/login', // 未ログイン時に認証ルートへアクセスした際のリダイレクトURL
      logout: '/login', // ログアウト時のリダイレクトURL
      callback: false, // Oauth認証等で必要となる コールバックルート
      home: '/' // ログイン後のリダイレクトURL
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth/jwt/create/', method: 'post', propertyName: 'access' },
          user: { url: 'api/auth/users/', method: 'get', propertyName: false },
          logout: false
        }
      }
    }
  },
  router: {
    middleware: ['auth']
  },*/
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  configureWebpack: {
    devtool: 'source-map'
  },
  build: {
  }
}
