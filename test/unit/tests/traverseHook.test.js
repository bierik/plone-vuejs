import executeHook from '@/traverser/traverseHook';
import stubRequest from '../helpers';


const { API_ROOT, PLONE_ROOT } = process.env;
const options = { ploneRoot: PLONE_ROOT, apiRoot: API_ROOT };

describe('execute hook', () => {
  stubRequest('@sharing', { title: 'sharing' });

  test('pass when no hook is given', (done) => {
    executeHook().catch(() => {
      assert(true);
      done();
    });
  });

  test('execute hook fetches the given redirect path', (done) => {
    executeHook(
      (from, to, next) => { next('@sharing'); },
      null,
      '/',
      options,
    ).then(({ data }) => {
      assert.deepEqual(data, { title: 'sharing' });
      done();
    });
  });
});
