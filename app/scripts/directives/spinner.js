'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:spinner
 * @description
 * # spinner
 */
angular.module('nimbusEduApp')
  .directive('spinner', function () {
    return {
      template: '<div uk-spinner class="uk-width-1-1 uk-text-center"></div>',
      restrict: 'E',
      link: function postLink(scope, element) {
        element.on('$destroy', function () {
    			scope.$destroy();
    		});
      }
    };
  });
