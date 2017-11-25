import Traverser, { lookup } from '@/traverser/traverser';
import Vue from 'vue';
import Router from 'vue-router';
import moxios from 'moxios';


describe('traverser', () => {
  beforeEach(() => moxios.install());

  afterEach(() => moxios.uninstall());

  test('lookup', (done) => {
    moxios.stubRequest('http://localhost:9000/plone/folder', {
      status: 200,
      response: { '@type': 'Folder' },
      'content-type': 'application/json',
    });

    moxios.stubRequest('http://localhost:9000/plone/folder/@edit', {
      status: 200,
      response: { '@type': 'Folder' },
    });

    moxios.stubRequest('http://localhost:9000/plone/event/@list', {
      status: 200,
      response: { '@type': 'Event' },
    });

    moxios.stubRequest('http://localhost:9000/plone/event', {
      status: 200,
      response: { '@type': 'Event' },
    });

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

    Promise.all(paths.map(p => lookup(views, p))).then((cs) => {
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
    moxios.stubRequest('http://localhost:9000/plone/folder', {
      status: 200,
      response: {
        '@type': 'Folder',
        title: 'Title',
        text: 'text',
      },
    });

    Vue.use(Router);
    Vue.use(Traverser);

    const router = new Router();

    const vm = new Vue({
      router,
      views: [
        { view: 'view', type: 'Folder', component: { name: 'FolderViewComponent' } },
      ],
      template: '<router-view></router-view>',
      watch: {
        $route: () => {
          assert.equal(vm.$component.name, 'FolderViewComponent');
          assert.deepEqual(
            vm.$context,
            {
              '@type': 'Folder',
              title: 'Title',
              text: 'text',
            },
          );
          done();
        },
      },
    });

    router.push('/folder');
  });
});

