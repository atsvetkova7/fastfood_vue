// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'

import VueFire from 'vuefire'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import VuejsDialog from "vuejs-dialog"
import Notifications from 'vue-notification'

Vue.use(VueFire);
Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(VuejsDialog);
Vue.use(Notifications);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import firebase from './firebase/index'
import {dbRef} from './firebase/index'

Vue.config.productionTip = false

let app;

firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      firebase: {
        points: {
          source: dbRef,
          asObject: true
        }
      },
      router
    })
  }
});

