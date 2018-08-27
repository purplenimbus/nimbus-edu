'use strict';

/**
 * @ngdoc directive
 * @name nimbusEmsApp.directive:userPill
 * @description
 * # userPill
 */
angular.module('nimbusEmsApp')
  .directive('userPill', function () {
	var user = {fname:'tony'};
    return {
		scope:true,
		controller : function($scope,format,$localStorage){
			//console.log('$auth',$localStorage.auth);
			$scope.user = JSON.parse($localStorage.auth);
			$scope.widgetTitle = function(fname){ return format.widgetTitle(fname); };
		},
		template: function(){ 
				return '<div class="uk-grid-small uk-flex-middle" uk-grid>'+
							'<div class="uk-width-auto">'+
								'<img class="uk-comment-avatar uk-preserve-width uk-border-circle" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" width="40" alt="" />'+
							'</div>'+
							'<div class="uk-width-expand">'+
								'<p class="uk-text-capitalize title">{{ widgetTitle(user.firstname) }}</p>'+
								'<p class="uk-text-meta uk-margin-remove-top uk-hidden"><time datetime="2016-04-01T19:00">April 01, 2016</time></p>'+
							'</div>'+
						'</div>';
		},
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
			user.fname = attrs.fname;
			
			element.on('$destroy', function () {
				scope.$destroy();
			});
		}
    };
  });
