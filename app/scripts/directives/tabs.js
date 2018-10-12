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
    	str += '	<li ng-repeat="(tab_key,tab) in tabs">';
    	str += '		<a href="#">{{tab.name}}';

    	/*str += '		<span ng-if="false">';
    	str += '			<span class="uk-margin-small-left" uk-icon="icon: triangle-down"></span>';
    	str += '			<div uk-dropdown="mode: click">';
    	str += '			<ul class="uk-nav uk-dropdown-nav" ng-repeat="filter in tab.data.source.filters">';
    	str += '				<li class="uk-active" ng-if="filter.options" ng-repeat="option in filter.options"><a class="uk-text-capitalize" ng-click="filterList(tab_key,option)">{{option.name}}</a></li>';
    	str += '			</ul>';
    	str += '			</div>';
    	str += '		</span>';*/

    	str += '		</a>';
    	str += '	</li>';
		str += '</ul>';

		str += '<ul class="uk-switcher uk-margin">';
    	str += '	<li ng-repeat="tab in tabs">';
    	str += '		<div class="uk-grid-small" uk-grid>';
    	str += '			<div class="uk-width-1-1">';
    	str += '				<list source="tab.data.source" type="tab.type"></list>';
    	str += '			</div>';
    	str += '		</div>';
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
      	controller : function($scope,modal){
      		$scope.init = function(){
      			$scope.loading = true;
      		};

      		$scope.init();

      		$scope.tab = function(){
      			$scope.selected = false;
      		};

      		$scope.filterList = function(key,filter){
      			console.log('filter',key,filter);
      		};

      		$scope.$on('selected',function(e,data){
      			console.log('selected',data);
      			$scope.selected = data;

      			var str = '';

      				if(data.user_type){
      					str += $scope.getBody(data.user_type.name);
      				}else{
      					//invoices here?
      				}

      			modal.modal({
      				body:str,
      			},$scope).then(function(){});

      			$scope.offcanvas = true;
      			
      			$scope.$broadcast('reload',$scope.user);
      		});

      		$scope.getBody = function(type){
      			var body = '';

      			switch(type){
      				case 'teacher' : 
      					body += '<instructor-courses user="selected" list="true"></instructor-courses>'; 
      					break;
      				default : 
      					body += '<my-courses user="selected"></my-courses>'; 
      					break;
      			}

      			return body;
      		};

      		//console.log('tabs',$scope);
      	},
      	link: function postLink(scope, element) {
        	element.on('$destory',function(){
        		scope.$destory();
        	});
      	}
    };
  });
