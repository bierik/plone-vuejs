import Vue from 'vue';
import chai from 'chai';

Vue.config.productionTip = false;

chai.config.truncateThreshold = 0;
global.assert = chai.assert;
global.process.env = {
  NODE_ENV: 'test',
  API_ROOT: 'http://localhost:9000/',
  PLONE_ROOT: '/plone',
};
