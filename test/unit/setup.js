import '../setup';

global.process.env = {
  NODE_ENV: 'test',
  API_ROOT: 'http://localhost:9000/',
  PLONE_ROOT: '/plone',
};
