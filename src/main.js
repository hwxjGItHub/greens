// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from '../src/store'
import Muse from './public/js/muse-ui.config.js'
import './public/sass/_font.scss'
import 'swiper/dist/css/swiper.css'

Vue.use(Muse);

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

store.dispatch('getMenuTypeTbl', axios);

router.push('/homePage');
