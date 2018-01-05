import createAPILink, { createLink, createTraverserLink } from '@/traverser/normalizer';

const { API_ROOT, PLONE_ROOT } = process.env;

describe('normalizer', () => {
  test('createAPILink', () => {
    assert.equal(
      createAPILink('http://localhost:9000/plone/', { apiRoot: API_ROOT, ploneRoot: PLONE_ROOT }),
      'http://localhost:9000/plone/',
    );

    assert.equal(
      createAPILink('folder/', { apiRoot: API_ROOT, ploneRoot: PLONE_ROOT }),
      'http://localhost:9000/plone/folder/',
    );

    assert.equal(
      createAPILink('/', { apiRoot: API_ROOT, ploneRoot: PLONE_ROOT }),
      'http://localhost:9000/plone/',
    );
  });

  test('createLink', () => {
    assert.equal(
      createLink('http://localhost:900/plone/document', { ploneRoot: PLONE_ROOT }),
      '#/document',
    );
  });

  test('createTraverserLink', () => {
    assert.equal(
      createTraverserLink({ '@id': 'http://localhost:900/plone/document' }, { ploneRoot: PLONE_ROOT }),
      '/document',
    );

    assert.equal(
      createTraverserLink({ '@id': 'http://localhost:900/plone/document/doc1' }, { ploneRoot: PLONE_ROOT }),
      '/document/doc1',
    );
  });
});
