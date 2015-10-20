'use strict';

require('angular');
require('angular-mocks');

require('../src/ng-classified');

require('expose?AppConfig!./app-config-class.es7');
require('expose?AppDirective!./app-directive-class.es7');
require('./apps');

// has to be transpiled in order to be uglified
require('babel!./specs/common.spec.es6');
require('babel!./specs/transpiled.spec.es6');
require('babel!./specs/maxified.spec.es6');
