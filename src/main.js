// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {
  Button,
  Message,
  MessageBox
} from 'element-ui';


import App from './App'
import router from './router'
import 'lib-flexible'
import store from './vuex/store'
import request from '@/axios/request.js'

import axios from 'axios';



import '@/assets/styles/reset.css'
import 'element-ui/lib/theme-chalk/index.css';
import wx from 'weixin-jsapi';

import '@/assets/js/sha1.js'

// import {wx} from '@/assets/js/jweixin-1.4.0.js';

Vue.config.productionTip = false

Vue.use(Button);

Vue.component(Message.name, Message)
Vue.prototype.$message = Message
Vue.prototype.$request = request;
Vue.prototype.$axios = axios;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
