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

			courseService.initCourse($scope.user,$scope,params).then(function(result){
				
				$scope.courseData = result.data;

				$scope.course = $scope.courseData.data[0].course;

				if($scope.courseData.data){
					$scope.pageTitle = $scope.course.name;
					$scope.pageTitle += ' | '+$scope.course.grade.alias;
				}

				$scope.authorized = $scope.user.id === $scope.course.instructor.id ? true : false;

				$scope.loading = false;

			}).catch(function(error){
				console.log('courseService error',error);
				$scope.loading = false;
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
				
		$scope.getGrade = function(scores){
			
			if(scores){
				return grades.getGrade(grades.getTotal(scores,$scope.course.meta.course_schema)); // jshint ignore:line
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

		$scope.save = function(data){
    		$scope.loading = true;

			console.log('save data',data);

			sweetAlert.alert({
			   	title: 'save course?',
			   	icon: "warning",
			   	buttons:{
					cancel: sweetAlert.button({text:'Cancel',className:'uk-button uk-button-danger',value:false}),
					confirm: sweetAlert.button({text:'Import',value:true})
				}
			}).then(function(e){
				console.log('prompt choice',e);
				$scope.loading = true;
				$scope.$apply();
				if(e){
					/*eduApi.api('POST',$scope.user.tenant.id+'/courses/batch?type='+type.value,data)
	  				.then(function(result){
	  					console.log('import result',result);
	  					$scope.loading = false;

	  					sweetAlert.alert({
						   	title: 'Success',
						   	text : result.data.message,
						   	icon: 'success',
						   	buttons:{
								confirm: sweetAlert.button({text:'ok'})
							}
						});

						$scope.reset();
	  				})
	  				.catch(function(error){
	  					console.log('import error',error);
	  					$scope.loading = false;
	  					sweetAlert.alert({
						   	title: 'Somethings wrong!',// jshint ignore:line
						   	icon: 'error',
						   	text : error.data.message,
						   	buttons:{
								confirm: sweetAlert.button({text:'ok'}),
							}
						});
	  				});*/
				}else{
					$scope.loading = false;
				}

			});
		};
		
		angular.element('.uk-switcher').on({

			'show': function(e){
				switch(angular.element(e.target).get(0).dataset.tab){
					case 'outline' : if(!$scope.outline){	$scope.loadOutline(); 	} break;
				}
			},

		});
		
		$scope.init({
			course_id : $route.current.params.id,
			paginate : 10
		});
		
		$scope.course = courseService;

		console.log('course init',$scope);
		
	});
