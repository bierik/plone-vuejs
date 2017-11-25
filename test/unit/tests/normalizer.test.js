import normalize from '@/traverser/normalizer';
import { createLink } from '@/traverser/normalizer';

describe('normalizer', () => {
  test('normalize', () => {
    assert.equal(
      normalize('http://localhost:9000/plone/'),
      'http://localhost:9000/plone/',
    );

    assert.equal(
      normalize('folder/'),
      'http://localhost:9000/plone/folder/',
    );

    assert.equal(
      normalize('/'),
      'http://localhost:9000/plone/',
    );
  });

  test('createLink', () => {
    assert.equal(
      createLink('http://localhost:900/plone/document'),
      '/#/document',
    );
  });
});
