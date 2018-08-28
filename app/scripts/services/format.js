'use strict';

/**
 * @ngdoc service
 * @name nimbusEduApp.format
 * @description
 * # format
 * Service in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
  .service('format', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
		return{
			widgetTitle : function(fname){
				return fname+'\'s Courses';
			}
		};
  });
