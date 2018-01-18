import Vue from 'vue'
import VueRouter from 'vue-router'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import App from './App.vue'
import routes from './routes'

if (process.env.NODE_ENV === 'production') {
  Vue.config.devtools = false
  Vue.config.debug = false
  Vue.config.silent = true
}

Vue.use(VueLodash, lodash)

// For use routers
Vue.use(VueRouter)
export const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
