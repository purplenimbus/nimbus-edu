'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.format
 * @description
 * # format
 * Service in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
  .service('format', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
		return{
			widgetTitle : function(fname){
				return fname+'\'s Courses';
			}
		};
  });
