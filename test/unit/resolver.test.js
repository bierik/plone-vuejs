import resolve, { extractView } from '@/traverser/resolver';
import moxios from 'moxios';
import axios from 'axios';


describe('resolver', () => {
  beforeEach(() => moxios.install());

  afterEach(() => moxios.uninstall());

  test('test', (done) => {

    moxios.stubRequest('http://fake:8080/plone/', {
      status: 200,
      response: { title: 'root' },
    });

    moxios.stubRequest('http://fake:8080/plone/folder', {
      status: 200,
      response: { title: 'folder' },
    });

    resolve('/').then(({ res }) => {
      assert.deepEqual(res, { title: 'root' })
      moxios.uninstall();
      done();
    });

    resolve('/folder').then(({ res }) => {
      assert.deepEqual(res, { title: 'folder' })
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
    ]

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
      ]
    )

  });
});
