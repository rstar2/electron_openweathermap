import Vue from 'vue';
import './plugins/vuetify';

import App from './App.vue';
import router from './router';
import store from './store';

import axios from 'axios';
axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),

  // attach global options for all Vue components
  OPENWEATHERMAP_API_KEY: process.env.VUE_APP_OPENWEATHERMAP_API_KEY
}).$mount('#app');
