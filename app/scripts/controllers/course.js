'use strict';

/**
 * @ngdoc function
 * @name nimbusEduApp.controller:CourseCtrl
 * @description
 * # CourseCtrl
 * Controller of the nimbusEduApp
 */
angular.module('nimbusEduApp')
	.controller('CourseCtrl', function ($scope,$window,grades,eduApi,apiConst,modal,courseService,$localStorage,$route,sweetAlert) {
		$scope.init = function(params){
						
			$scope.user = $localStorage.auth;
			
			console.log('course init params',params);

			courseService.initCourse($scope.user,$scope,params).then(function(result){
				
				$scope.courseData = result.data;

				console.log('course result',result);

				if($scope.courseData.data){
					$scope.pageTitle = $scope.courseData.data[0].course.name;
					$scope.pageTitle += ' | '+$scope.courseData.data[0].course.code;
				}
				
				$scope.loadingHome = false;
			}).catch(function(error){
				console.log('courseService error',error);
				$scope.loadingHome = false;
				sweetAlert.alert({
							   	title: 'Somethings wrong!',
							   	icon: 'error',
							   	text : error.data || 'error',
							   	buttons:{
									confirm: sweetAlert.button({text:'ok'}),
								}
							});
				
			});
		
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
		
		$scope.loadOutline = function(){
			$scope.loadingOutline = true;
			//console.log('loadOutline',$scope,user);
			
			//TO DO do validation here
			if($scope.courseData){
				eduApi.api('GET',$scope.user.tenant.id+'/lessons?course_id='+$scope.courseData.data[0].course.id+'&paginate='+apiConst.componentPagination+'&page=1')
				.then(function(result){
					console.log('outline loaded',result);
					if(result.data.length && result.data.data){
						$scope.outline = result.data.data;
					}else{
						$scope.outlineMessage = result.statusText ? result.statusText : 'No Data';
					}
					
					$scope.loadingOutline = false;
				})
				.catch(function(error){
					$scope.outlineMessage = error.statusText ? error.statusText : 'Error';
					$scope.loadingOutline = true;
				});
			}else{
				$scope.outlineMessage = 'No Course Data';
			}
		};
		
		angular.element('.uk-switcher').on({

			'show': function(e){
				switch(angular.element(e.target).get(0).dataset.tab){
					case 'outline' : if(!$scope.outline){	$scope.loadOutline(); 	} break;
				}
			},

		});
		
		$scope.init({
			course_id : $route.current.params.id
		});
		
		$scope.course = courseService;

		console.log('course init',$scope);
		
	});
