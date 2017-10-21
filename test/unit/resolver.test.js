import resolve from '@/traverser/resolver';
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

    resolve('/').then((res) => {
      assert.deepEqual(res, { title: 'root' })
      moxios.uninstall();
      done();
    });

    resolve('/folder').then((res) => {
      assert.deepEqual(res, { title: 'folder' })
      moxios.uninstall();
      done();
    });
  });
});

