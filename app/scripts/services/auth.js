'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.auth
 * @description
 * # auth
 * Service in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
	.service('auth', function ($q,$http,$rootScope,$localStorage) {
    // AngularJS will instantiate a singleton by calling "new" on this function
		return	{
			objectToQuerystring : function(obj) {
				var str = '';
								
				if(obj !== 'undefined'){
					str = '?';
					
					for(var prop=0; prop < Object.keys(obj).length; prop++){
													
						str += Object.keys(obj)[prop]+'='+obj[Object.keys(obj)[prop]];
				
						str += Object.keys(obj)[prop + 1] ? '&' : '';
					}
						
				}
				
				return encodeURI(str);
			},
			clearUser : function(){
								
				delete $localStorage.auth;
				
				delete $rootScope.user;
				
				delete $http.defaults.headers.common.Authorization;
												
			}
		};
	});
