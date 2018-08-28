'use strict';

/**
 * @ngdoc function
 * @name nimbusEduApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the nimbusEduApp
 */
angular.module('nimbusEduApp')
  .controller('NavCtrl', function ($scope,offcanvas,modal,form,settings,$route,$rootScope,validation,$auth,auth,$location,breadcrumbs,$localStorage,$window) {
	$scope.route = $route;
    $scope.offcanvas = offcanvas.offcanvas;
    $scope.user = $localStorage.auth;
	
	$scope.logout = function() {
		$auth.logout();
		auth.clearUser($scope);
		//$route.reload();
		$location.path('/login');
	};
	
	$scope.showSettings = function(type){
		var settingsBody = '',
			obj;
		
		settingsBody += '<ul class="uk-list uk-list-divider">';
		settingsBody += '	<li ng-repeat="(key , setting) in settings" class="uk-clearfix">';
		settingsBody += '	<div class="uk-align-left uk-margin-remove">';
		settingsBody += '		<p class="uk-margin-remove">{{ key | uppercase }}</p>';
		settingsBody += '	</div>';
		settingsBody += '	<div class="uk-align-right">';
		settingsBody += '		<input class="uk-checkbox" type="checkbox" ng-model="setting.display" ng-disabled="setting.disabled">';
		settingsBody += '	</div>';
		settingsBody += '	</li>';
		settingsBody += '</ul>';
		
		
		obj = {
			title:'Settings',
			body:settingsBody,
			footer:false
		};
		
		$scope.settings = settings.getSettings(type);
				
		modal.modal(obj,$scope).then(function(result){
			$scope.modal = result;
		});
	};	
	
	$scope.navSettings = settings.getSettings('nav');
	
	$scope.breadcrumbs = breadcrumbs.parse($location.path());
	
	$scope.auth = $auth;
	
  });
