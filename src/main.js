import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './commons/stylus/index.styl'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false



Vue.use(VueLazyLoad,{
  loading:require('./commons/image/default.png')
})




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
