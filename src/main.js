import Vue from 'vue';
import App from '@/components/App';
import Router from 'vue-router';
import Traverser from '@/traverser/traverser';
import Folder from '@/components/Folder';

Vue.config.productionTip = false;

Vue.use(Router);
Vue.use(Traverser);

const router = new Router();

const views = [
  {
    type: 'Folder',
    view: 'view',
    component: Folder,
  },
];

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  views,
  template: '<App/>',
  components: { App },
});
