'use strict';

/**
 * @ngdoc service
 * @name nimbusEduApp.tasks
 * @description
 * # tasks
 * Service in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
  .service('tasks', function ($http) {
	this.endpoint = 'http://localhost:8000';
		
    // AngularJS will instantiate a singleton by calling "new" on this function
	this.getTasks = function (query) {
		return $http({
			method : query.method,
			url : this.endpoint+'/'+query.companyId+'/'+query.userId+'/tasks'
		});
	};
	
	this.getCompanyTasks = function (query) {
		return $http({
			method : query.method,
			url : this.endpoint+'/'+query.companyId+'/tasks'
		});
	};
  });
