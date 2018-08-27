'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.emsApi
 * @description
 * # emsApi
 * Factory in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
	.factory('graphApi', function ($http) {
		var self = this;
		// Service logic
		self.apiEndPoint = 'http://graph.nimbus.com:8000/v1/';

		// Public API here
		return {
			apiEndPoint : self.apiEndPoint,
			api : function(requestType,parameters,data){
							
				switch(requestType){
					case 'GET' : return $http.jsonp(self.apiEndPoint+parameters,{method:requestType});
					case 'POST' : return $http.jsonp(self.apiEndPoint+parameters,{method:requestType,data:data}); 
				}
			}
		};
	})
	.factory('fmsApi', function ($http) {
		// Service logic
		var apiEndPoint = 'http://fms.nimbus.com:9090/';//'http://fms-api-v1.herokuapp.com/v1/';

		// Public API here
		return {
			api : function(requestType,parameters,data){
				
				switch(requestType){
					case 'GET' : return $http.get(apiEndPoint+parameters);
					case 'POST' : return $http.post(apiEndPoint+parameters,data); 
				}
			}
		};
	})
	.factory('eduApi', function ($http) {
		var self = this;
		self.apiEndPoint = 'https://nimbus-learning-api.herokuapp.com/api/v1/';
		return {
			apiEndPoint : self.apiEndPoint,
			api : function(requestType,parameters,data){
								
				switch(requestType){
					case 'GET' : return $http.get(self.apiEndPoint+parameters);
					case 'POST' : return $http.post(self.apiEndPoint+parameters,data);
				}
				
			}
		};
	})
	.factory('user', function ($localStorage) {
		var user = $localStorage.auth ? JSON.parse($localStorage.auth) : false;
		
		return user;
	});