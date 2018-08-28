'use strict';

/**
 * @ngdoc service
 * @name nimbusEduApp.tasksConst
 * @description
 * # tasksConst
 * Constant in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
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
