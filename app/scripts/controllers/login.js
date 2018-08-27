'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
	.controller('LoginCtrl', function ($scope,$route,$rootScope,validation,$auth,auth,$window,user,$location,$http,userService) {
		
	if(!$auth.isAuthenticated){
		auth.clearUser();
	}
		
	//console.log('http headers',	$http.defaults.headers.common);
		
    $scope.signin = function(creds,$event) {
		
		//console.log('Login Events',angular.element($event.currentTarget).parents());
		//$event.preventDefault();
		$scope.loginLoading = true;
		
		var credentials = {
			email : creds.email,
			password : creds.password,
			//tenant : user.tenant.username
		};
		
		var form	=	angular.element($event.currentTarget).parents()[1];
					
		validation.validate(form).then(function(result){
			
			if(result.valid){											
				$auth.login(credentials).then(function(result) {
					$scope.loginLoading = false;
					console.log('Data',result,$location);
					userService.updateLocalUser(result.data.user);
					$location.path('/');
				}).catch(function(error){
					$scope.loginLoading = false;
					console.log('Login Error',error);
					$scope.loginError = error.data;
					//TO DO Add Error Message to login modal
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
			//console.log('Logged in Rootscope',$rootScope);
			//console.log('Logged in Auth',$auth.isAuthenticated());
			//console.log('Logged in token',$auth.getToken());
			//console.log('Logged in payload',$auth.getPayload());
			//auth.setCookie('auth',JSON.stringify(result.data.user),9);
			////$rootScope.user.info = result.data.user;
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
		
		$scope.$on('$routeChangeStart', function() { 
			//close any open menus or modals
			$scope.$on('$routeChangeStart', function() { 
			   //close any open menus or modals
				$window.UIkit.offcanvas('#side-menu').hide();
			});
		});
	};
  });
