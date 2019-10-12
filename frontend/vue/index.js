import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify/lib';
import { Ripple } from 'vuetify/lib/directives';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies';
import UploadButton from 'vuetify-upload-button';
import { store } from './store/vuex';
import App from './App';

import { router } from './router';
import { vuetify } from './vuetify';

import './assets/main.scss';

Vue.config.performance = process.env.NODE_ENV === 'development';

Vue.use(Vuetify, { directives: { Ripple } });
Vue.use(VueRouter);
Vue.use(UploadButton);
Vue.use(Vuelidate);
Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use(VueCookies);

export default new Vue({
  router,
  store,
  vuetify,
  el: '#app',
  render: h => h(App),
});
