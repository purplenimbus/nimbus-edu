'use strict';

/**
 * @ngdoc directive
 * @name nimbusEmsApp.directive:reports
 * @description
 * # reports
 */
angular.module('nimbusEmsApp')
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
