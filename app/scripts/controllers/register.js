'use strict';

/**
 * @ngdoc function
 * @name nimbusEduApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the nimbusEduApp
 */
angular.module('nimbusEduApp')
  .controller('RegisterCtrl', function ($scope,$window,services,graphApi,$location) {
    $scope.registration = {
		meta : {}
	};
	
	console.log('services',services);
	
	$scope.services = services.data;
  
	$scope.cart = [];
	
	$scope.total = 0.00;
	
	$scope.selectService = function(){
		//console.log('selectService',$scope.services);
		
		$scope.cart = [];
		
		angular.forEach($scope.services,function(value){
			if(value.selected){
				$scope.cart.push(value);
			}
		});
		
		//console.log('cart',$scope.cart);
		
		$scope.calculateBill();
	};
	
	$scope.calculateBill = function(){
		$scope.total = 0.00;
		
		if($scope.cart.length){
			angular.forEach($scope.cart,function(value){
				//console.log(value);
				$scope.total += value.meta.cost;
			});
		}
		
		//console.log('calculateBill',$scope.total);
	};
	
	$scope.registerUser = function(data){
				
		$scope.loading = true;
		
		graphApi.api('POST','tenants',data).then(function(result){
			console.log('registration result',result);
			$scope.loading = false;
			$scope.errors = false;
			$window.UIkit.notification({
				message: '<span uk-icon=\'icon: check\'></span> '+result.statusText,
				status: 'primary',
				pos: 'top-right',
				timeout: 5000
			});
			
			$location.path( '/login' ).search('firstLogin', true);
		
		}).catch(function(error){
			
			$scope.errors = error.data.errors;
						
			$scope.loading = false;
						
			$window.UIkit.notification({
				message: error.data.message,
				status: 'primary',
				pos: 'top-right',
				timeout: 5000
			});
			
		});
	};
	
	$scope.completeOrder = function(data){
		console.log('registration data',data);
	};
		
  });
