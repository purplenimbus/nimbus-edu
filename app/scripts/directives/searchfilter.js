'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:searchFilter
 * @description
 * # searchFilter
 */
angular.module('nimbusEduApp')
  .directive('searchFilter', function (uikit3) {
  	var template = '',
        directive = '',
        inputs = [{
          name : 'input'
        },{
          name : 'select'
        },{
          name : 'checkbox'
        }];

      //template += '<div uk-grid>';

      //inputs.forEach(function(value){

        template += '<div ng-repeat="filter in filters" class="uk-child-width-1-4" uk-grid>';

        //directive += 'ng-change="filterResults(searchFilter)" ng-model="searchFilter" ';
        //directive += 'ng-if="'+value.name+'" ng-options="filter as filter.name for filter in filter.options track by filter.id"';  

        template += '{{filter.template}}'
        /*template += uikit3.input({
    		  placeholder:'{{filter.label | uppercase}}',
    		  cls:'uk-text-capitalize',
    		  directive:directive
    	  });*/

        template += '</div>';

      //});

      //template += '</div>';

    return {
      template: template,
      restrict: 'E',
      scope:{filters:'=filters'},
      controller:function($scope){
        $scope.init = function(){
          $scope.select = $scope.checkbox = $scope.input =  false;

          /*switch($scope.filter.type){
            case 'checkbox' : 
              $scope.checkbox = true;
              break;

            case 'select' : 
              $scope.select = true;
              $scope.searchFilter = $scope.filter.options[0];
              break;

            default : 
              $scope.input = true;
              break;
          }*/

        };

        $scope.init();

        console.log('searchFilter scope',$scope);

      	$scope.filterResults = function(searchFilter){
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
