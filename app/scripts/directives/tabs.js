'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:tabs
 * @description
 * # tabs
 */
angular.module('nimbusEduApp')
  .directive('tabs', function (uikit3) {
  	var str = '';

  		str += '<ul uk-tab>';
    	str += '	<li ng-repeat="tab in tabs"><a href="#">{{tab.name}}</a></li>';
		str += '</ul>';

		str += '<ul class="uk-switcher uk-margin">';
    	str += '	<li ng-repeat="tab in tabs" class="uk-grid-width-small" uk-grid>';
    	str += '<div class="uk-width-1-3@m">';
    	str += uikit3.card({
			        body:'	<stat-card title="tab.data.stats.title" data="tab.data.stats.data"></stat-card>',
			        classes:{
			          card:'uk-card-default uk-padding-remove',
			          body:'uk-padding-small',
			          header : 'uk-padding-small'
			        }
			      });
    	str += '</div>';


    	str += '		<div class="uk-width-2-3@m">';
    	str += '			<users type="tab.name" source="tab.data.stats.data.endpoint"></users>';
    	str += '		</div>';
	    str += '	</li>';
		str += '</ul>';

    return {
      	template: str,
      	restrict: 'E',
      	scope : {
      		tabs : '=tabs'
      	},
      	controller : function($scope){
      		$scope.init = function(){
      			$scope.loading = true;
      		};

      		$scope.init();
      		console.log('tabs',$scope);
      	},
      	link: function postLink(scope, element) {
        	element.on('$destory',function(){
        		scope.$destory();
        	});
      	}
    };
  });
