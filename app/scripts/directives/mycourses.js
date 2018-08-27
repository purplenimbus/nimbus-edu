'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers


/**
 * @ngdoc directive
 * @name nimbusEmsApp.directive:myCourses
 * @description
 * # myCourses
 */
angular.module('nimbusEmsApp')
  .directive('myCourses', function () {
    return {
		templateUrl: 'views/templates/myCourses.html',
		restrict: 'E',
		scope:true,
		controller : function($scope,eduApi,$route,apiConst,$window,grades,$auth,$cookies,format,$rootScope,$localStorage){
						
			$scope.widgetTitle = function(fname){ return format.widgetTitle(fname); };
			
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
			
			$scope.init = function(){
				$scope.loading  = true;
				$scope.error  = false;
				
				$scope.user = JSON.parse($localStorage.auth);

				console.log('mygroup',$scope.user);
				
				//check for logged in
			 	eduApi.api('GET',$scope.user.tenant.id+'/registrations?user_id='+$scope.user.id+'&paginate='+apiConst.componentPagination+'&page=1')
			 	.then(function(result){
					console.log('eduApi course result',result);
					$scope.coursesData = result.data;
					$scope.loading  = false;
				}).catch(function(error){
					console.log('eduApi course error',error);
					$scope.error = error.statusText;
					$scope.loading  = false;
				});
			};
			
			$scope.init();
		},
		link: function postLink(scope, element) {
			element.on('$destroy', function () {
				scope.$destroy();
			});
		}
    };
  });
