'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
	.controller('AuthCtrl', function ($auth,$state,$rootScope,$scope,validation,form,elements,modal,$route,auth) {
		
		//$rootScope.loggedIn = false; //Initialize logged in flag
		
        $scope.login = function($event) {
			
			//$event.preventDefault();
			$scope.loginLoading = true;
			
			var modalContent	=	angular.element($event.currentTarget).parents()[1],
				form			=	angular.element(modalContent).find('form').serializeArray(),
				credentials		=	{
					email		:	$scope.email,
					password	: 	$scope.password
				};
			
			console.log('Login Details',credentials,$route);
				
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
						$route.reload();

						
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
		
		$scope.showLoginModal	=	function(){
			var modalType	=	'login',
				modalTitle	=	'',
				modalBody	=	form.login(),
				modalFooter	=	'';//elements.button({	type	:	'submit',	cls:	'btn teal accent-3',	ngClick	:	'login($event)'	},'Login');
				
			modal.modal(modalType,modalTitle,modalBody,modalFooter,$scope).then(function(){
				//console.log(result);
				console.log('Auth Details',$rootScope);
				
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
			$route.reload();
			
			auth.clearUser();
			//$location.path("/");
		};
		
		$scope.closeModal	=	function(){
			angular.element('#modal').hide().remove();
			angular.element('html').removeClass('uk-modal-page');
		};
	
	});
