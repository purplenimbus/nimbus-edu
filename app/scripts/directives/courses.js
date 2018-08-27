'use strict';

/**
 * @ngdoc directive
 * @name nimbusEmsApp.directive:courses
 * @description
 * # courses
 */
angular.module('nimbusEmsApp')
  .directive('courses', function () {
    return {
		templateUrl: 'views/templates/courses.html',
		restrict: 'E',
		scope: true,
		controller : function($scope){
			$scope.widgetTitle = 'Courses';
		},
		link: function postLink(scope, element) {
			element.on('$destroy', function () {
				scope.$destroy();
			});
		}
    };
  });
