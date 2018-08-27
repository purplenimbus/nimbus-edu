'use strict';

/**
 * @ngdoc directive
 * @name nimbusEmsApp.directive:studentList
 * @description
 * # studentList
 */
angular.module('nimbusEmsApp')
	.directive('studentList', function () {			
		return {
			scope:true,
			controller : function($scope,courseService,grades){
				var courseId;
				
				$scope.init = function(){
					console.log('studentList directive courseId',$scope);
					//To Do , if no courseId , throw exception?
					courseId = $scope.$parent.courseId; //hack?
					return courseService.initCourse($scope,{id:courseId});	
				};
				
				$scope.getTotal = function(course){	
					if(course.meta){
						return 	grades.getTotal(course.meta.grades,course.course.meta.course_schema); // jshint ignore:line
					}else{
						return false;
					}
				};
				
				$scope.getGrade = function(course){
					if(course.meta){
						return grades.getGrade(grades.getTotal(course.meta.grades,course.course.meta.course_schema)); // jshint ignore:line
					}else{
						return false;
					}
				};
								
				$scope.init();
				
			},
			templateUrl: 'views/templates/studentList.html',
			restrict: 'E',
			link: function postLink(scope, element) {			
				element.on('$destroy', function () {
					scope.$destroy();
				});
			}
		};
	});
