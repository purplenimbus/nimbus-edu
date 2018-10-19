'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:coursecard
 * @description
 * # coursecard
 */
angular.module('nimbusEduApp')
  .directive('coursecard', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the coursecard directive');
      }
    };
  });
