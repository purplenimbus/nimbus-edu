'use strict';

/**
 * @ngdoc service
 * @name nimbusEduApp.format
 * @description
 * # format
 * Service in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
  .service('format', function (courseService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
		return{
			widgetTitle : function(fname){
				return fname+'\'s';
			},
			userMeta : function(user){
				//console.log('format meta',user);
				var str = [];

				if(user.user_type.name){ 
					str.push(user.user_type.name); 
				}

				if(user.meta.course_grade_id){ 
					str.push(courseService.getClasses(user.meta.course_grade_id).name); 
				}
				
				return str.join(' | ');
			}
		};
  });
