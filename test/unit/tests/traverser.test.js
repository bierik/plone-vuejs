import { lookup } from '@/traverser/traverser';
import Traverser from '@/traverser/install';
import Vue from 'vue';
import Router from 'vue-router';
import stubRequest from '../helpers';

const { API_ROOT, PLONE_ROOT } = process.env;
const options = { ploneRoot: PLONE_ROOT, apiRoot: API_ROOT };
const router = new Router();
const traverser = {
  views: [{ view: 'view', type: 'Folder', component: { name: 'FolderViewComponent' } }],
  options,
};

describe('traverser', () => {
  stubRequest('folder', { '@type': 'Folder' });
  stubRequest('folder/@edit', { '@type': 'Folder' });
  stubRequest('event/@list', { '@type': 'Event' });
  stubRequest('event', { '@type': 'Event' });

  test('lookup', (done) => {
    const views = [
      { view: 'view', type: 'Folder', component: { name: 'FolderViewComponent' } },
      { view: 'edit', type: 'Folder', component: { name: 'FolderEditComponent' } },
      { view: 'list', type: 'Event', component: { name: 'EventListComponent' } },
      { view: 'view', type: 'Event', component: { name: 'EventViewComponent' } },
    ];

    const paths = [
      '/folder',
      '/folder/@edit',
      '/event/@list',
      '/event',
    ];

    Promise.all(paths.map(path => lookup({ views, path, options }))).then((cs) => {
      assert.deepEqual(
        cs.map(c => c.component.name),
        [
          'FolderViewComponent',
          'FolderEditComponent',
          'EventListComponent',
          'EventViewComponent',
        ],
      );
      done();
    });
  });

  test('matches given view when navigating', (done) => {
    Vue.use(Router);
    Vue.use(Traverser);

    const vm = new Vue({
      router,
      traverser,
      template: '<router-view></router-view>',
      watch: {
        $route: () => {
          assert.equal(vm.$component.name, 'FolderViewComponent');
          assert.deepEqual(
            vm.$context,
            { '@type': 'Folder' },
          );
          done();
        },
      },
    });

    router.push('/folder');
  });
});

