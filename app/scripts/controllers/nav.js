'use strict';

/**
 * @ngdoc function
 * @name nimbusEduApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the nimbusEduApp
 */
angular.module('nimbusEduApp')
  .controller('NavCtrl', function ($scope,offcanvas,modal,form,settings,$route,$rootScope,validation,$auth,auth,$location,breadcrumbs,$localStorage) {
	
	$scope.route = $route;
    $scope.offcanvas = offcanvas.offcanvas;
    $scope.user = $localStorage.auth;

    /*$scope.nav = function(){
	    $scope.user = $localStorage.auth;

	    var body =  '	<div ng-controller="NavCtrl"><user-pill user="user" name="true" label="user.user_type.name || user.access_level.name"></user-pill>';
			body += '	<ul class="uk-nav-default uk-nav-parent-icon uk-position-bottom uk-padding" uk-nav>';
			body += '		<li ng-repeat="(key , nav) in navSettings" ng-if="!nav.disabled && user.access_level.id >= nav.access_level" ng-class="nav.children ? \'uk-parent\' : \'\'">';
			body += '			<a ng-href="#!/{{ nav.url }}">';
			body += '				<span class="uk-margin-small-right" uk-icon="icon: {{ nav.icon }}"></span>'; 
			body += '				{{ key | uppercase }}';
			body += '			</a>';
			body += '			<ul class="uk-nav-sub" ng-if="nav.children">';
			body += '				<li ng-repeat="(childKey,child) in nav.children" ng-if="user.access_level.id >= child.access_level">';
			body += '					<a ng-href="#!/{{ child.url }}">';
			body += '						<span class="uk-margin-small-right" uk-icon="icon: {{ child.icon }}"></span>';
			body += '						{{ childKey | uppercase }}';
			body += '					</a>';
			body += '				</li>';
			body += '			</ul>';
			body += '		</li>';
			body += '		<li class="uk-nav-divider" ng-if="auth.isAuthenticated() && user.access_level.id >= 2"></li>';
	        body += '       <li ng-if="auth.isAuthenticated() && user.access_level.id >= 3"><a ng-href="#!/tools" class="uk-text-uppercase"><span class="uk-margin-small-right" uk-icon="icon: bolt"></span> tools</a></li>';
	        body += '       <li ng-if="auth.isAuthenticated() && user.access_level.id >= 3"><a ng-href="#!/settings" class="uk-text-uppercase"><span class="uk-margin-small-right" uk-icon="icon: cog"></span> settings</a></li>';
	        body += '       <li ng-if="auth.isAuthenticated()" class="uk-text-uppercase">';
	        body += '            <a href="#!/profile/settings/">';
	        body += '            <span class="uk-margin-small-right" uk-icon="icon: user"></span>';
	        body += '            My Account</a>';
	        body += '       </li>';
	        body += '       <li ng-if="auth.isAuthenticated()" class="uk-text-uppercase">'; 
	        body += '            <a ng-click="logout()" data-target="#signout">';
	        body += '            <span class="uk-margin-small-right" uk-icon="icon: sign-out"></span>';
	        body += '            Sign Out</a>';
	        body += '       </li>';
			body += '	</ul></div>';

	    	offcanvas.open({
		    	body:body,
		    },$scope);
    };*/
	
	$scope.logout = function() {
		offcanvas.close();
		$auth.logout();
		auth.clearUser($scope);
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
	
	$rootScope.user = $localStorage.auth;

	console.log('NavCtrl scope',$scope);
  });
