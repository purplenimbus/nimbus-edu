'use strict';

/**
 * @ngdoc service
 * @name nimbusEduApp.emsApi
 * @description
 * # emsApi
 * Factory in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
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
		var apiEndPoint = 'http://fms.nimbus.com:9090/';

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
		
		self.apiEndPoint = 'http://edu.nimbus.com:7070/api/v1/';//https://nimbus-learning-api.herokuapp.com/api/v1/';

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
	.factory('queryString', function () {		
		return { 
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
			}
		};
	});