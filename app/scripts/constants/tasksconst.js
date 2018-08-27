'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.tasksConst
 * @description
 * # tasksConst
 * Constant in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
	.constant('tasksConst', function(){
		return {
			statusTypes : [{
				id : 1,
				name : 'in progress'
			},{
				id : 2,
				name : 'completed'
			},{
				id : 3,
				name : 'unassigned'
			},{
				id : 4,
				name : 'deleted'
			}]
		};
	});
