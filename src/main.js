import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import  'amfe-flexible'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false
Vue.use(Mint);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
