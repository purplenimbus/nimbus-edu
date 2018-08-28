'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:searchFilter
 * @description
 * # searchFilter
 */
angular.module('nimbusEduApp')
  .directive('searchFilter', function (uikit3) {
  	var template = uikit3.select({
  		placeholder:'{{filter.courseGrade.label | uppercase}}',
  		cls:'uk-text-capitalize',
  		directive:'ng-change="filterResults(searchFilter)" ng-model="searchFilter" ng-options="filter as filter.name for filter in filter.courseGrade.options track by filter.id"'
  	});
    return {
      template: template,
      restrict: 'E',
      scope:{filter:'=filter'},
      controller:function($scope){
        $scope.searchFilter = $scope.filter.courseGrade.options[0];
      	$scope.filterResults = (searchFilter) => {
      		$scope.$emit('searchFilter',searchFilter);
      	};
      },
      link: function postLink(scope, element) {
        element.on('$destroy', function () {
			scope.$destroy();
		});
      }
    };
  });
