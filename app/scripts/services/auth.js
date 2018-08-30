'use strict';

/**
 * @ngdoc service
 * @name nimbusEduApp.auth
 * @description
 * # auth
 * Service in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
	.service('auth', function ($q,$http,$rootScope,$localStorage) {
    // AngularJS will instantiate a singleton by calling "new" on this function
		return	{
			clearUser : function($scope){
								
				delete $localStorage.auth;
				
				delete $rootScope.user;
				
				delete $http.defaults.headers.common.Authorization;

				delete $scope.user;

				//$scope.$apply();
												
			},
			authorized : function(resource,key,user){

				var loggedinUser = $localStorage.auth;

				return loggedinUser.access_level.id >= 3 || user.id === resource[key].id;
			}
		};
	});
