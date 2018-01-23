import Traverser from '@/traverser/install';
import Vue from 'vue';
import Router from 'vue-router';
import moxios from 'moxios';
import stubRequest from '../helpers';

const { API_ROOT, PLONE_ROOT } = process.env;
const options = { ploneRoot: PLONE_ROOT, apiRoot: API_ROOT };
const router = new Router();
const traverser = {
  views: [{ view: 'view', type: 'Folder', component: { name: 'FolderViewComponent' } }],
  options,
};

describe('Traverser traverser', () => {
  Vue.use(Router);
  Vue.use(Traverser);

  test('traverse function should be accessible on the vue components under traverse', () => {
    const vm = new Vue({ traverser, router });
    assert.isDefined(vm.traverse);
  });

  test('matches given view when navigating', (done) => {
    const item = { '@id': 'http://localhost:9000/plone/folder' };

    stubRequest('folder', { '@type': 'Folder' });

    const vm = new Vue({
      router,
      traverser,
      watch: {
        $route: () => {
          const request = moxios.requests.mostRecent();
          assert.equal(request.config.url, 'http://localhost:9000/plone/folder');
          done();
        },
      },
    });

    vm.traverse(item);
  });
});
