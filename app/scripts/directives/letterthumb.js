'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:letterThumb
 * @description
 * # letterThumb
 */
angular.module('nimbusEduApp')
  .directive('letterThumb', function () {
    return {
      template: '<div title="{{ user.firstname }} {{ user.lastname }}" class="letter-thumb uk-inline uk-border-rounded uk-section-primary"><span class="uk-logo uk-position-center uk-text-light">{{user.firstname.charAt(0) | uppercase}}</span></div>',
      scope:{user:'=user'},
      restrict: 'E',
      link: function postLink(scope, element) {			
			element.on('$destroy', function () {
				scope.$destroy();
			});
		}
    };
  });
