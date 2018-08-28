'use strict';

/**
 * @ngdoc service
 * @name nimbusEduApp.grades
 * @description
 * # grades
 * Service in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
	.service('grades', function () {
		return {
			getGrade : function(total){
				
				var grade = {};
				
				if( total >= 90 ){ 
					grade.grade = 'A'; 
					grade.className = 'success'; 
				}else if( total >= 70 && total <= 89 ){ 
					grade.grade = 'B'; 
					grade.className = 'primary'; 
				}else if( total >= 50 && total <= 69 ){ 
					grade.grade = 'C'; 
					grade.className = 'muted'; 
				}else if( total >= 45 && total <= 49 ){ 
					grade.grade = 'D';
					grade.className = 'muted';					
				}else if( total >= 40 && total <= 44 ){ 
					grade.grade = 'E'; 
					grade.className = 'warning';
				}else{ 
					grade.grade = 'F'; 
					grade.className = 'danger';
				}
				
				return grade;
			},
			getTotal : function(grades,markingScheme){
				var total = 0;
												
				angular.forEach(markingScheme,function(value,key){
					total += grades[key];
				});
				
				return total;
			},
			getAverage : function(data){
				var total = 0,self = this;
				
				angular.forEach(data.registrations,function(value){
					total += self.getTotal(value.meta.grades,data.meta.course_schema); // jshint ignore:line
				});
								
				return Math.ceil(total/data.registrations.length);
			}
		};
		
	});
