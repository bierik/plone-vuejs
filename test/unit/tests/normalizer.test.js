import normalize from '@/traverser/normalizer';

describe('normalizer', () => {
  test('test', () => {
    assert.equal(
      normalize('http://fake:8080/plone/'),
      'http://fake:8080/plone/',
    );

    assert.equal(
      normalize('folder/'),
      'http://fake:8080/plone/folder/',
    );

    assert.equal(
      normalize('/'),
      'http://fake:8080/plone/',
    );
  });
});
