import Vue from 'vue';
import App from '@/components/App';
import Router from 'vue-router';
import Traverser from '@/traverser/traverser';
import Folder from '@/components/Folder';
import PloneSite from '@/components/PloneSite';
import Document from '@/components/Document';
import NewsItem from '@/components/NewsItem';
import EventItem from '@/components/EventItem';

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
  {
    type: 'Plone Site',
    view: 'view',
    component: PloneSite,
  },
  {
    type: 'Document',
    view: 'view',
    component: Document,
  },
  {
    type: 'News Item',
    view: 'view',
    component: NewsItem,
  },
  {
    type: 'Event',
    view: 'view',
    component: EventItem,
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
