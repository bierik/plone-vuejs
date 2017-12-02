import normalize from '@/traverser/normalizer';
import { createLink } from '@/traverser/normalizer';

const { API_ROOT, PLONE_ROOT } = process.env;

describe('normalizer', () => {
  test('normalize', () => {
    assert.equal(
      normalize('http://localhost:9000/plone/', { apiRoot: API_ROOT, ploneRoot: PLONE_ROOT }),
      'http://localhost:9000/plone/',
    );

    assert.equal(
      normalize('folder/', { apiRoot: API_ROOT, ploneRoot: PLONE_ROOT }),
      'http://localhost:9000/plone/folder/',
    );

    assert.equal(
      normalize('/', { apiRoot: API_ROOT, ploneRoot: PLONE_ROOT }),
      'http://localhost:9000/plone/',
    );
  });

  test('createLink', () => {
    assert.equal(
      createLink('http://localhost:900/plone/document', { ploneRoot: PLONE_ROOT }),
      '/#/document',
    );
  });
});
