import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import 'element-ui/lib/theme-chalk/index.css'
import element from './utils/element'
import { DatetimePicker } from 'vant';


import './utils/request'
import './assets/common.css'

Vue.use(element)

Vue.use(DatetimePicker);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
