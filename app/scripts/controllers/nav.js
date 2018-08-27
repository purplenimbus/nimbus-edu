'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
  .controller('NavCtrl', function ($scope,offcanvas,modal,form,settings,$route,$rootScope,validation,$auth,auth,$location,breadcrumbs,user,$window) {
	$scope.route = $route;
	$scope.loggedin = false;
    $scope.offcanvas = offcanvas.offcanvas;
	$scope.showLogin = function(){
		var obj = {
			title:'Login',
			body:form.login(),
			footer:false
		};
		modal.modal(obj,$scope).then(function(result){
			$scope.modal = result;
		});
	};
	
	$scope.closeModal = function(){
		$window.UIkit.modal('#modal').hide();
	};
	
	$scope.login = function(creds,$event) {
		
		//console.log('Login Events',angular.element($event.currentTarget).parents());
		//$event.preventDefault();
		$scope.loginLoading = true;
		
		var form	=	angular.element($event.currentTarget).parents()[1];
		
		var credentials = {
			email : creds.email,
			password : creds.password,
			//tenant : user.tenant.username
		};
		
		//console.log('Login Details',credentials,$location);
			
		validation.validate(form).then(function(result){
			
			console.log(result);
			angular.element('#modal .uk-modal-spinner').removeClass('uk-hidden');
			if(result.valid){											
				//Use Satellizer's $auth service to login
				$auth.login(credentials).then(function(result) {
					$scope.loginLoading = false;
					console.log('Data',result);
					
					angular.element('#modal .uk-modal-dialog').removeClass('error')
											.addClass('success');
											
					angular.element('#modal .uk-alert')
							.removeClass('uk-hidden uk-alert-danger')
							.addClass('uk-alert-success')
							.children('p')
							.html('Logged In Successfully'); //Show Success Alert
							
					$rootScope.user = {};
					console.log('Logged in Rootscope',$rootScope);
					console.log('Logged in Auth',$auth.isAuthenticated());
					console.log('Logged in token',$auth.getToken());
					console.log('Logged in payload',$auth.getPayload());
					auth.setCookie('auth',JSON.stringify(result.data.user),9);
					$rootScope.user.info = result.data.user;
					angular.element('#modal .uk-modal-spinner').addClass('uk-hidden');//remove spinner
					$scope.closeModal();
					
					/*if($location.path() !== '/' || $location.path() !== '/login'){ 
						$route.reload(); 
					}else{ 
						$location.path('/'); 
					}*/
					$location.path('/');
					
				}).catch(function(error){
					$scope.loginLoading = false;
					console.log('Login Error',error);
					//TO DO Add Error Message to login modal
					angular.element('#modal .uk-modal-dialog').removeClass('success')
											.addClass('error');
											
					angular.element('#modal .uk-modal-spinner').addClass('uk-hidden'); //remove spinner
					angular.element('#modal .uk-alert')
							.removeClass('uk-hidden uk-alert-success')
							.addClass('uk-alert-danger')
							.children('p')
							.html('Invalid Login');//Add error message
				});
				
			}else{
				console.log(result);
				//TO DO Add Validation Error Message to login modal
			}	
			
		});
		
		
	};
	
	$scope.authenticate = function(provider) {
		$auth.authenticate(provider).then(function(result){
			console.log('Auth Data',result);
			$scope.authLoading = false;		
			angular.element('#modal .uk-modal-dialog').removeClass('error')
									.addClass('success');
									
		angular.element('#modal.login form input')
				.removeClass('uk-form-danger')
				.addClass('uk-form-success');
									
			angular.element('#modal .uk-alert')
					.removeClass('uk-hidden uk-alert-danger')
					.addClass('uk-alert-success')
					.children('p')
					.html('Logged In Successfully'); //Show Success Alert
					
					
			$rootScope.user = {};
			console.log('Logged in Rootscope',$rootScope);
			console.log('Logged in Auth',$auth.isAuthenticated());
			console.log('Logged in token',$auth.getToken());
			console.log('Logged in payload',$auth.getPayload());
			auth.setCookie('auth',JSON.stringify(result.data.user),9);
			$rootScope.user.info = result.data.user;
			angular.element('#modal .uk-modal-spinner').addClass('uk-hidden');//remove spinner
			$scope.closeModal();
			$route.reload();
			
		}).catch(function(error){
			$scope.authLoading = false;	
			//handle error
			//console.log('Login Error',error);
			//TO DO Add Error Message to login modal
			angular.element('#modal .uk-modal-dialog').removeClass('success')
									.addClass('error');
									
			angular.element('#modal.login form input')
				.removeClass('uk-form-success')
				.addClass('uk-form-danger');
									
			angular.element('#modal .uk-modal-spinner').addClass('uk-hidden'); //remove spinner
			angular.element('#modal .uk-alert')
					.removeClass('uk-hidden uk-alert-success')
					.addClass('uk-alert-danger');
					
			if(error){  angular.element('#modal .uk-alert').children('p').html(error); }//Add error message
		});
	};
	
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
	//console.log('Nav breadcrumbs',$scope.auth);
  });
