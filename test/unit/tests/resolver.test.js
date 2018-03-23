import resolve, { extractObjectPath, extractView } from '@/traverser/resolver';
import { api } from '@/traverser/install';
import stubRequest from '../helpers';

const { API_ROOT, PLONE_ROOT } = process.env;
const options = { apiRoot: API_ROOT, ploneRoot: PLONE_ROOT };

describe('resolver', () => {
  test('http client configuration', () => {
    assert.isTrue(
      api.defaults.headers.common.Accept.includes('*/*'),
      'For testing purposes the accept Header should contain */*',
    );
  });

  test('resolve path', (done) => {
    stubRequest('/', { title: 'root' });

    stubRequest('folder', { title: 'folder' });

    resolve('/', options).then(({ res }) => {
      assert.deepEqual(res, { title: 'root' });
      done();
    });

    resolve('/folder', options).then(({ res }) => {
      assert.deepEqual(res, { title: 'folder' });
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

  test('extracts object path from path', () => {
    const paths = [
      '',
      '/',
      'plone',
      'plone/folder',
      'plone/folder/@edit',
      'plone/folder@edit',
      'plone/folder/@edit?key=value',
      'plone/folder/edit/@list',
    ];

    assert.deepEqual(
      paths.map(extractObjectPath),
      [
        '',
        '/',
        'plone',
        'plone/folder',
        'plone/folder',
        'plone/folder@edit',
        'plone/folder',
        'plone/folder/edit',
      ],
    );
  });
});
