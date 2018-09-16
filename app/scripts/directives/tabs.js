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
    	str += '	<li ng-repeat="tab in tabs">';
    	str += '		<div class="uk-grid-small" uk-grid>';
    	//str += '	<div class="uk-width-1-4@m">';
    	/*str += 		uikit3.card({
				        body:'	<stat-card title="tab.data.stats.title" data="tab.data.stats.data"></stat-card>',
				        classes:{
				          card:'uk-card-default uk-padding-remove',
				          body:'uk-padding-small',
				          header : 'uk-padding-small'
				        }
			      	});*/
    	//str += '	</div>';


    	str += '		<div class="uk-width-1-4@m">';
    	str += '			<users type="tab.name" source="tab.data.stats.data.endpoint"></users>';
    	str += '		</div>';
    	str += '		<div class="uk-placeholder uk-text-center uk-width-1-2@m uk-margin-remove uk-inline" ng-if="!selected">';
    	str += '			<div class="uk-position-center uk-text-capitalize">Select {{ tab.name }}</div>';
    	str += '		</div>';
    	str += '		<div class="uk-width-1-2@m" ng-if="selected">';
    	str += '			<my-courses user="selected"></my-courses>';
    	/*str += 		uikit3.card({
				        body:'	{{selected}}',
				        classes:{
				          card:'uk-card-default uk-padding-remove',
				          body:'uk-padding-small',
				          header : 'uk-padding-small'
				        }
			      	});*/
    	str += '		</div>';
    	str += '	</div>';
	    str += '	</li>';
		str += '</ul>';

    return {
      	template: uikit3.card({
  			//header : header,
  			body : str,
  			classes:{
  				header:'uk-padding-remove',
  				body:'uk-padding-remove'
  			}
  		}),
      	restrict: 'E',
      	scope : {
      		tabs : '=tabs'
      	},
      	controller : function($scope){
      		$scope.init = function(){
      			$scope.loading = true;
      		};

      		$scope.init();

      		$scope.tab = function(){
      			$scope.selected = false;
      		};

      		$scope.$on('selected',function(e,data){
      			console.log('selected',e,data);
      			$scope.selected = data;
      			$scope.$broadcast('reload',$scope.user);
      		});

      		console.log('tabs',$scope);
      	},
      	link: function postLink(scope, element) {
        	element.on('$destory',function(){
        		scope.$destory();
        	});
      	}
    };
  });
