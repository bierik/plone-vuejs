import { viewsToRoutes } from '@/traverser/traverser';
import Traverser from '@/traverser/traverser';
import Vue from 'vue';
import Router from 'vue-router';


describe('traverser', () => {
  test('viewsToRoutes', () => {
    const views = [
      { view: 'view', type: 'Folder', component: {} },
      { view: 'edit', type: '*', component: {} },
    ]

    assert.deepEqual(
      viewsToRoutes(views),
      [
        { path: '*/@view', component: {} },
        { path: '*/@edit', component: {} },
      ]
    );
  });

  test('vue router has to be installed', () => {
    Vue.use(Router);

    assert.throws(
      Vue.use(Traverser),
      Error,
      'vue-router has to be installed',
    );
  });
});

