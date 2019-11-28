import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Axios from 'Axios'
import store from './store'
//配置文件
import Global from '@/assets/js/gloabel.js'
//挂载
Vue.prototype.$headers=Global;
Vue.prototype.$axios=Axios;


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
// router.beforeEach((to,from,next)=>{
//   if (to.path==='/login') {
//     next();
//   } else{
//   alert('你还没有登录，请登录!');
//   next('/login');
//   }
// });
