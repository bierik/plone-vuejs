// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import router from './router';
import Traverser from '@/traverser/traverser';
import FolderComponent from '@/components/FolderComponent';


Vue.use(Traverser, [
  {
    view: 'view',
    type: 'Folder',
    component: FolderComponent,
  },
]);

Vue.use(VueRouter);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
