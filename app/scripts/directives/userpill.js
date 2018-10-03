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
				var str = '<div class="uk-grid-small uk-flex-middle" uk-grid>';
					str +=		'<div ng-class="showName ? \'uk-width-auto\' : \'\'" class="">';
					str +=			'<img ng-if="user.image" class="uk-comment-avatar uk-preserve-width uk-border-circle" src="{{user.image}}" width="40" alt="{{ user.firstname }} {{ user.lastname }}" title="{{ user.firstname }} {{ user.lastname }}"/>';
					str +=			'<letter-thumb ng-if="!user.image" user="user"></letter-thumb>';
					str +=		'</div>';
					str +=		'<div class="uk-width-expand" ng-if="showName">';
					str +=			'<p ng-if="user" class="uk-text-capitalize title uk-margin-remove">{{ user.firstname }} {{ user.lastname }}</p>';
					str +=			'<p ng-if="label" class="uk-text-meta uk-margin-remove-top uk-text-small uk-text-muted uk-text-uppercase">{{ label }}</p>';
					str +=		'</div>';
					str +=	'</div>';

				return str;
		},
		restrict: 'E',
		link: function postLink(scope, element) {			
			element.on('$destroy', function () {
				scope.$destroy();
			});
		}
    };
  });
