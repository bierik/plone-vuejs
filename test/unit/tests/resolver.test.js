import resolve, { extractView, api } from '@/traverser/resolver';
import moxios from 'moxios';

const { API_ROOT, PLONE_ROOT } = process.env;

describe('resolver', () => {
  beforeEach(() => moxios.install());

  afterEach(() => moxios.uninstall());

  test('http client configuration', () => {
    assert.isTrue(
      api.defaults.headers.common.Accept.includes('*/*'),
      'For testing purposes the accept Header should contain */*',
    );
  });

  test('resolve path', (done) => {
    moxios.stubRequest('http://localhost:9000/plone/', {
      status: 200,
      response: { title: 'root' },
    });

    moxios.stubRequest('http://localhost:9000/plone/folder', {
      status: 200,
      response: { title: 'folder' },
    });

    resolve('/', { apiRoot: API_ROOT, ploneRoot: PLONE_ROOT }).then(({ res }) => {
      assert.deepEqual(res, { title: 'root' });
      moxios.uninstall();
      done();
    });

    resolve('/folder', { apiRoot: API_ROOT, ploneRoot: PLONE_ROOT }).then(({ res }) => {
      assert.deepEqual(res, { title: 'folder' });
      moxios.uninstall();
      done();
    });
  });

  test('extracts the view from path', () => {
    const paths = [
      '',
      '/',
      'plone',
      'plone/folder',
      'plone/folder/@edit',
      'plone/folder@edit',
      'plone/folder/@edit',
      'plone/folder/@edit?key=value',
      'plone/folder/edit/@list',
    ];

    assert.deepEqual(
      paths.map(extractView),
      [
        'view',
        'view',
        'view',
        'view',
        'edit',
        'view',
        'edit',
        'edit',
        'list',
      ],
    );
  });
});
