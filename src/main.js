// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from '@/App'
import router from '@/router'
import store from '@/store'

import VueQriously from 'vue-qriously'

import VueSocketio from 'vue-socket.io-extended'
import io from 'socket.io-client'

Vue.use(VueSocketio, io(process.env.SOCKET_SERVER))
Vue.use(Vuex)
Vue.use(VueQriously)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
