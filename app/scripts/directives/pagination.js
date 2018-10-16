'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:pagination
 * @description
 * # pagination
 */
angular.module('nimbusEduApp')
  .directive('pagination', function () {
  	var str = '';
  		str += '<ul class="uk-pagination uk-margin-top">';
  		str += '	<li><button ng-disabled="current <= 1" ng-click="paginate(current-1)" ng-class="current <= 1 ? \'uk-button-default\' : \'\'" class="uk-button"><span class="uk-margin-small-right" uk-pagination-previous></span> Previous</button></li>';
      str += '  <li class=" uk-text-muted uk-inline uk-text-uppercase uk-width-expand">'
      str += '    <span class="uk-position-center">Showing {{from}} to {{to}} of {{total}} entries</span>';
      str += '  </li>';
  		str += '	<li class="uk-margin-auto-left"><button ng-disabled="current === last" ng-click="paginate(current+1)" ng-class="current === last ? \'uk-button-default\' : \'\'" class="uk-button">Next <span class="uk-margin-small-left" uk-pagination-next></span></button></li>';
  		str += '</ul>';
    return {
      	template: str,
      	restrict: 'E',
      	scope: {
  	  		from:'=from',
  	  		to:'=to',
  	  		current:'=current',
          last:'=last',
          total:'=total',
  	  		type:'=type',
  	  	},
  	  	controller : function($scope){
  	  		$scope.paginate = function(payload){
  	  			$scope.$emit('pagination',{page:payload});
  	  		};
  	  	},
		link: function postLink(scope, element) {
			element.on('$destroy', function () {
				scope.$destroy();
			});
      	}
    };
  });
