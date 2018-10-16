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
      //placeholder:'{{filter.label | uppercase}}',
      cls:'uk-text-capitalize',
      directive:'ng-change="filterResults(searchFilter)" ng-model="searchFilter" ng-options="filter as filter.name for filter in filter.options track by filter.id"'
    });

    return {
      template: template,
      restrict: 'E',
      scope:{filter:'=filter'},
      controller:function($scope){
        $scope.init = function(){
          //console.log('search filter scope',$scope);
          if($scope.filter && $scope.filter.options){
            $scope.searchFilter = $scope.filter.default || $scope.filter.options[0];
          }
          
        };

        $scope.init();

        //console.log('searchFilter scope',$scope);

      	$scope.filterResults = function(searchFilter){
          var payload = {};

          payload[$scope.filter.name] = searchFilter.id;

      		$scope.$emit('searchFilter',payload);
      	};
      },
      link: function postLink(scope, element) {
        element.on('$destroy', function () {
			   scope.$destroy();
		    });
      }
    };
  });
