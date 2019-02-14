import Vue from "vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify/lib";
import { Ripple } from "vuetify/lib/directives";
import "vuetify/src/stylus/app.styl";
import Vuelidate from "vuelidate";
import axios from "axios";
import VueAxios from "vue-axios";
import Vuex from "vuex";
import VueCookies from "vue-cookies";
import UploadButton from "vuetify-upload-button";
import { store } from "./store/vuex.js";
import App from "./App.vue";
import "vuetify/src/stylus/app.styl";
// import 'vuetify/dist/vuetify.min.css';
import "material-design-icons-iconfont/dist/material-design-icons.css";

import { router } from "./router";

Vue.use(Vuetify, { directives: { Ripple } });
Vue.use(VueRouter);
Vue.use(UploadButton);
Vue.use(Vuelidate);
Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use(VueCookies);

new Vue({
  router,
  store,
  el: "#app",
  render: h => h(App)
});
