'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:tabs
 * @description
 * # tabs
 */
angular.module('nimbusEduApp')
  .directive('tabs', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the tabs directive');
      }
    };
  });
