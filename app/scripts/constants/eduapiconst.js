'use strict';

/**
 * @ngdoc service
 * @name nimbusEduApp.eduApiConst
 * @description
 * # eduApiConst
 * Constant in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
  	.constant('eduApiConst', {
  		defaultCourseSchema : {
            lab: {value:5,enabled:true},
            exam: {value:35,enabled:true},
            quiz: {value:10,enabled:true},
            midterm: {value:30,enabled:true},
            assignment: {value:15,enabled:true},
            attendance: {value:5,enabled:true}
        }
  	});
