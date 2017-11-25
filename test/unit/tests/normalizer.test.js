import normalize from '@/traverser/normalizer';

describe('normalizer', () => {
  test('test', () => {
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
});
