import chai from 'chai';


chai.config.truncateThreshold = 0;
global.assert = chai.assert;
global.process.env.API_ROOT = 'http://fake:8080/plone/';
