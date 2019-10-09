import Vue from 'vue'
import App from './App.vue'
import router from './router'
import  './styles/index.scss'
import store from './store/index'
import { Dialog,Checkbox,CheckboxGroup } from 'vant';
Vue.use(Dialog).use(Checkbox).use(CheckboxGroup)


import {InputNumber} from 'element-ui'
Vue.use(InputNumber)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
