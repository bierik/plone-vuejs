import Traverser from '@/traverser/install';
import Vue from 'vue';
import Router from 'vue-router';
import moxios from 'moxios';
import stubRequest from '../helpers';

const { API_ROOT, PLONE_ROOT } = process.env;
const options = { ploneRoot: PLONE_ROOT, apiRoot: API_ROOT };
const traverser = {
  views: [{ view: 'view', type: 'Folder', component: { name: 'FolderViewComponent' } }],
  options,
};
const router = new Router();

describe('axios instance', () => {
  stubRequest('/', { '@type': 'Folder' });
  stubRequest('folder', { '@type': 'Folder' });

  Vue.use(Router);
  Vue.use(Traverser);

  test('axios instance should be accessible on the vue instance under http', () => {
    assert.isDefined(Vue.http);
  });

  test('axios instance should be accessible on vue components under http', () => {
    const vm = new Vue();
    assert.isDefined(vm.http);
  });

  test('matches given view when navigating', (done) => {
    const vm = new Vue({
      router,
      traverser,
      watch: {
        $route: () => {
          const request = moxios.requests.mostRecent();
          assert.equal(request.config.headers.Authorization, 'secrettoken');
          assert.equal(request.config.headers.RequestedWith, 'custom-header');
          done();
        },
      },
    });

    vm.http.defaults.headers.common.Authorization = 'secrettoken';
    vm.http.interceptors.request.use((request) => {
      request.headers.RequestedWith = 'custom-header';
      return request;
    });

    router.push('/folder');
  });
});
