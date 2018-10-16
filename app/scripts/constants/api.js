'use strict';

/**
 * @ngdoc service
 * @name nimbusEduApp.apiConst
 * @description
 * # apiConst
 * Constant in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
	.constant('apiConst', {
		componentPagination : 10, 
		widgetPagination : 5, 
		defaultTenantId : 3220,
		filterCount : [
  			{name:5,id:5},
    		{name:10,id:10},
    		{name:20,id:20},
    		{name:50,id:50},
    		{name:100,id:100}
    	] 
	});
