'use strict';

require('angular');
require('angular-mocks');

require('../src/ng-classified');

require('expose?AppConfig!./app-config-class.es6');
require('expose?AppDirective!./app-directive-class.es6');
require('./apps');

require('./specs/common.spec.es6');
require('./specs/maxified.spec.es6');

