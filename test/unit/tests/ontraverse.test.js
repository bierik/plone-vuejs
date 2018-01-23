import Traverser from '@/traverser/install';
import Vue from 'vue';
import Router from 'vue-router';
import moxios from 'moxios';
import stubRequest from '../helpers';


const { API_ROOT, PLONE_ROOT } = process.env;
const options = { ploneRoot: PLONE_ROOT, apiRoot: API_ROOT };

const router = new Router();

describe('onTraverse hook', () => {
  stubRequest('@sharing', { title: 'sharing' });
  stubRequest('/', { '@type': 'Folder', title: 'root' });
  stubRequest('news', { '@type': 'News', title: 'news' });
  stubRequest('news/@sharing', { title: 'sharing' });

  Vue.use(Router);
  Vue.use(Traverser);

  test('onTraverse hook is called initially', (done) => {
    const traverser = {
      views: [
        {
          view: 'view',
          type: 'Folder',
          component: {
            name: 'FolderViewComponent',
            onTraverse(from, to, next) {
              assert.equal(from, null);
              assert.equal(to, '/');
              next('@sharing');
            },
          },
        },
        { view: 'view', type: 'News', component: { name: 'NewsViewComponent' } },
      ],
      options,
    };

    // eslint-disable-next-line no-new
    const vm = new Vue({
      router,
      traverser,
    });

    moxios.wait(() => {
      if (moxios.requests.mostRecent().url.includes('@sharing')) {
        assert.deepEqual(vm.$context['@sharing'], { title: 'sharing' });
        done();
      }
    });
  });

  test('onTraverse hook is called on route change', (done) => {
    const traverser = {
      views: [
        {
          view: 'view',
          type: 'Folder',
          component: {
            name: 'FolderViewComponent',
          },
        },
        {
          view: 'view',
          type: 'News',
          component: {
            name: 'NewsViewComponent',
            onTraverse(from, to, next) {
              assert.equal(from, null);
              assert.equal(to, '/news');
              next('@sharing');
            },
          },
        },
      ],
      options,
    };

    // eslint-disable-next-line no-new
    const vm = new Vue({
      router,
      traverser,
    });

    moxios.wait(() => {
      if (moxios.requests.mostRecent().url.includes('@sharing')) {
        assert.deepEqual(vm.$context['@sharing'], { title: 'sharing' });
        done();
      }
    });

    router.push('/news');
  });
});
