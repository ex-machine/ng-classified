'use strict';

angular.module('appUnclassified', ['app'])

angular.module('appClassified', ['ngClassified', 'app'])

angular.module('app', ['app.constants', 'app.directives'])
.config(AppConfig);

angular.module('app.constants', [])
.constant('appConstant', { value: 'foo' })
.constant('appAnotherConstant', 'bar');

angular.module('app.directives', [])
.directive('appDirective', AppDirective);