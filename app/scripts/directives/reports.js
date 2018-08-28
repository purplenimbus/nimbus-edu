'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:reports
 * @description
 * # reports
 */
angular.module('nimbusEduApp')
  .directive('reports', function () {
    return {
      templateUrl: 'views/templates/reports.html',
      restrict: 'E',
	  scope: true,
	  controller : function($scope){
		$scope.widgetTitle = 'reports';
	  },
      link: function postLink(scope, element) {
        element.on('$destroy', function () {
			scope.$destroy();
		});
      }
    };
  });
