'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:userPill
 * @description
 * # userPill
 */
angular.module('nimbusEduApp')
  .directive('userPill', function () {
    return {
		scope:{user:'=user',label:'=label',showName:'=name'},
		controller : function($scope,format){
			$scope.widgetTitle = function(fname){ return format.widgetTitle(fname); };
		},
		template: function(){ 
				return '<div class="uk-grid-small uk-flex-middle" uk-grid>'+
							'<div ng-class="showName ? \'uk-width-auto\' : \'\'" class="">'+
								'<img class="uk-comment-avatar uk-preserve-width uk-border-circle" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" width="40" alt="{{ user.firstname }} {{ user.lastname }}" title="{{ user.firstname }} {{ user.lastname }}"/>'+
							'</div>'+
							'<div class="uk-width-expand" ng-if="showName">'+
								'<p ng-if="user" class="uk-text-capitalize title uk-margin-remove">{{ user.firstname }} {{ user.lastname }}</p>'+
								'<p ng-if="label" class="uk-text-meta uk-margin-remove-top uk-text-small uk-text-muted uk-text-uppercase">{{ label }}</p>'+
							'</div>'+
						'</div>';
		},
		restrict: 'E',
		link: function postLink(scope, element) {			
			element.on('$destroy', function () {
				scope.$destroy();
			});
		}
    };
  });
