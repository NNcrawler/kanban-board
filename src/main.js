// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import firebase from '@firebase/app';
import '@firebase/database';
import VueBootstrap from 'bootstrap-vue';
import VueFire from 'vuefire';
import Vue from 'vue';
import App from './App';
import router from './router';


const config = {
  apiKey: 'AIzaSyDDhJ1j8GJyYqm7oIamfsl10JMWTO1dVik',
  authDomain: 'kanban-board-19952.firebaseapp.com',
  databaseURL: 'https://kanban-board-19952.firebaseio.com',
  projectId: 'kanban-board-19952',
  messagingSenderId: '1065944349182',
};
const app = firebase.initializeApp(config);

const db = app.database();

Vue.config.productionTip = false;
Vue.use(VueFire);
Vue.prototype.$db = db;
Vue.use(VueBootstrap);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
