import Vue from 'vue';
import App from './App.vue';

// index.html → npm  run buid → ./dist/index.html ← main.jsが組み込まれる
// main.jsがアプリのエントリーポイント
// new Vue() によって Vue App を立ち上げる

// Vue Router
import router from '@/router/index.js';

// Vuex
import store from '@/store/index.js';

// Vue toasted
import Toasted from 'vue-toasted';
var options = {
  position: 'top-center',
  duration: 4000,
  fullWidth: true,
  type: 'error'
}
Vue.use(Toasted, options);

// Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Firebase Auth
import firebase from './firebase';
firebase.init();
firebase.onAuth();

// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

// Google Map API
import * as GoogleMaps from 'vue2-google-maps';
Vue.use(GoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
    libraries: 'places',
    region: 'JP',
    language: 'ja'
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then set installComponents to 'false'.
  //// If you want to automatically install all the components this property must be set to 'true':
  // installComponents: true
});

Vue.config.productionTip = false; // 開発中は true にしたほうがいいかも、true の場合の方が開発者向けのメッセージがコンソールによりたくさん出るようです。

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
