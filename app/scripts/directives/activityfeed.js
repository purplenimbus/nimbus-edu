'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:activityFeed
 * @description
 * # activityFeed
 */
angular.module('nimbusEduApp')
	.directive('activityFeed', function () {
		return {
			templateUrl: 'views/templates/activityFeed.html',
			restrict: 'E',
			scope: true,
			controller : function($scope){
				$scope.widgetTitle = 'Activities';
			},
			link: function postLink(scope, element) {
				element.on('$destroy', function () {
					scope.$destroy();
				});
			}
		};
	});
