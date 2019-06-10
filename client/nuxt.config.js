const webpack = require('webpack')

module.exports = {
  plugins: [
    { src: '~/plugins/jquery', ssr: false },
    '~/plugins/global',
    { src: '~/plugins/globalNoSSR', ssr: false }
  ],
  modules: [
    '@nuxtjs/router'
  ],
  env: {
    baseUrl: 'https://startstack.co.uk/quizzer/api/v1'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'quizzer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    script: [
      { src: 'https://code.jquery.com/jquery-1.8.0.min.js' },
      { src: 'http://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.4/TweenLite.min.js' },
      { src: 'http://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.4/TimelineLite.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.4/plugins/CSSPlugin.min.js'},
      { src: 'http://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.2/js/toastr.min.js'},
      { src: 'http://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.4/easing/EasePack.min.js'},
      { src: 'https://use.fontawesome.com/896e9c85e6.js'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel:'stylesheet' ,href:'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' ,integrity:'sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO' ,crossorigin:'anonymous'},
      { href:'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700" rel="stylesheet'},
      { href:'assets/magicsuggest/magicsuggest-min.css" rel="stylesheet'},
      { href:'https://fonts.googleapis.com/css?family=Libre+Baskerville:400,700" rel="stylesheet'},
      { href:'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet'},
      { rel:'stylesheet', href:'https://unpkg.com/vue-toastr-2/dist/vue-toastr-2.min.css'}
    ]
  },
  script: [
    { src: '~/static/js/jquery.js', type: 'text/javascript'}
  ],
  css: [
    '@/assets/sass/objects.scss'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        '_': 'lodash'
      })
    ],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

