import Vue from 'vue';
import Router from 'vue-router';
import Traverser from '@/traverser/traverser';
import moxios from 'moxios';


describe('traverser-view', () => {

  beforeEach(() => moxios.install());

  afterEach(() => moxios.uninstall());

  test('render matched routes component', (done) => {
    Vue.use(Router);
    Vue.use(Traverser)

    const router = new Router();

    moxios.stubRequest('http://fake:8080/plone/folder', {
      status: 200,
      response: {
        '@type': 'Folder',
        title: 'Title',
        text: 'text',
      },
    });

    const vm = new Vue({
      router: router,
      views: [
        { view: 'view', type: 'Folder', component: { name: 'FolderViewComponent' } },
      ],
      template: "<traverser-view></traverser-view>",
      watch: {
        '$route': () => {
          done();
        }
      }
    });

    router.push('/folder');
  });
});
