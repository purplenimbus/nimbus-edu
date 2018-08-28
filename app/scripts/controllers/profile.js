'use strict';
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

/**
 * @ngdoc function
 * @name nimbusEduApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the nimbusEduApp
 */
angular.module('nimbusEduApp')
	.controller('ProfileCtrl', function ($scope,$window,$route,graphApi,modal,$localStorage,user) {
		
		$scope.init = function(){
			$scope.profileData = user;
			$scope.initiated = true;
		};
		
		if(!$scope.initiated){
			$scope.init();
			console.log('profileData',$scope.profileData);
		}
		
		$scope.next = function(page){
			$scope.loading = true;
			
			var params = $route.current.params;
			
			graphApi.api('GET',params.tenant_id+'/activities?user_id='+params.user_id+'&page='+page).then(function(result){ // jshint ignore:line
				
				console.log('next page:'+page,result.data.data);
				
				$scope.profileData = result.data;
				
				//var newArray = $scope.usersList.concat(result.data.data);
				
				//$scope.usersList = newArray;
				
				//list.initialize(true);
				
				$scope.loading = false;
				
			}).catch(function(error){
				console.log('graphApi error',error);
				$window.UIkit.notification({
					message: 'Couldnt get users',
					status: 'danger',
					pos: 'top-right',
					timeout: 5000
				});
			});
		};
		
		$scope.modal = modal;
		
		$scope.$on('$routeChangeStart', function() { 
		   //close any open menus or modals
			$window.UIkit.offcanvas('#side-menu').hide();
		});
	});
