import Vue from 'vue';
import chai from 'chai';

Vue.config.productionTip = false;

chai.config.truncateThreshold = 0;
global.assert = chai.assert;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
