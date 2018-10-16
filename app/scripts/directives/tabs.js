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
    	str += '		</a>';
    	str += '	</li>';
		str += '</ul>';

		str += '<ul class="uk-switcher uk-margin">';
    	str += '	<li ng-repeat="tab in tabs">';
    	str += '		<div class="uk-grid-small" uk-grid>';
    	str += '			<div class="uk-width-1-1">';
    	str += '				<div ng-bind-html="tab.template"></div>';
    	str += '				<list source="tab.data.source" type="tab.type" name="tab.name"></list>';
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
      			
      			$scope.$broadcast('reload',$scope.user);
      		});

      		$scope.getBody = function(type){
      			var body = '';

      			switch(type){
      				case 'teacher' : 
      					body += '<usercard user="selected" list="true" tabs="false" type="'+type+'"></usercard>'; 
      					break;
      				default : 
      					body += '<usercard user="selected" tabs="true" type="'+type+'"></usercard>'; 
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
