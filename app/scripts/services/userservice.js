'use strict';

/**
 * @ngdoc service
 * @name nimbusEduApp.userService
 * @description
 * # userService
 * Service in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
  	.service('userService', function (eduApi,$localStorage,$rootScope) {
    	this.saveUser = function(data){
    		return eduApi.api('POST',$localStorage.auth.tenant.id+'/users/'+data.id,data);
    	};

    	this.updateLocalUser = function(user){
    		$localStorage.auth = user;
    		$rootScope.user = user || false;
    	};
  	});
