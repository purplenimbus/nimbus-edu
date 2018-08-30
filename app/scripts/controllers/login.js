'use strict';

/**
 * @ngdoc function
 * @name nimbusEduApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the nimbusEduApp
 */
angular.module('nimbusEduApp')
	.controller('LoginCtrl', function ($scope,$route,$rootScope,validation,$auth,auth,$window,$location,$http,userService,$localStorage) {
		
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
			 //Show Success Alert
			$rootScope.user = {};
			//remove spinner
			$scope.closeModal();
			$route.reload();
			
		}).catch(function(){
			$scope.authLoading = false;	
			//handle error
			//console.log('Login Error',error);
			//TO DO Add Error Message to login modal
			//remove spinner
			//Add error message
		});
		
	};
  });
