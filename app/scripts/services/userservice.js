'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.userService
 * @description
 * # userService
 * Service in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
  	.service('userService', function (eduApi,$localStorage,$rootScope) {
  		var user = JSON.parse($localStorage.auth);
      console.log('save user',user);
    	this.saveUser = function(data){
    		return eduApi.api('POST',user.tenant.id+'/users/'+data.id,data);
    	};

    	this.updateLocalUser = function(user){
    		$localStorage.auth = JSON.stringify(user);
    		$rootScope.user = user || false;
    	};
  	});
