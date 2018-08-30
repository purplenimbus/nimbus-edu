'use strict';

/**
 * @ngdoc function
 * @name nimbusEduApp.controller:CourseCtrl
 * @description
 * # CourseCtrl
 * Controller of the nimbusEduApp
 */
angular.module('nimbusEduApp')
	.controller('CourseCtrl', function (
		$scope,
		$window,
		grades,
		eduApi,
		apiConst,
		modal,
		courseService,
		$localStorage,
		$route,
		sweetAlert,
		offcanvas,
		card,
		auth,
		importService) {
		$scope.init = function(params){
			$scope.loading = true;
			$scope.saving = false;
			$scope.user = $localStorage.auth;

			courseService.initCourse($scope.user,$scope,params).then(function(result){
				
				$scope.courseData = result.data;

				if($scope.courseData){
					$scope.course =  courseService.savedCourse || $scope.courseData.data[0].course;

					if($scope.course){
						$scope.pageTitle = $scope.course.name;
						$scope.pageTitle += $scope.course.code ? ' | '+$scope.course.code : '';
					}

					$scope.authorized = auth.authorized($scope.course,'instructor',$scope.course.instructor);
				}

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

		$scope.save = function(data,type){

			//console.log('save data pre',data);

    		$scope.saving = true;

    		var course_id = data.id || false,
    			payload = false;

    			data.instructor_id = data.instructor.id || false;

    			payload = courseService.trim(data,[
	    			'grade',
	    			'instructor',
	    			'uuid',
	    			'updated_at',
	    			'created_at',
	    			'code',
	    			'id'
    			]);


			console.log('save data post',data,type);

			courseService.saveCourse($scope.user,course_id,payload)
				.then(function(){
					$scope.saving = false;

					$scope.saved = true;

					offcanvas.close();

					$route.reload();
				})
				.catch(function(error){
					$scope.saving = false;
					$scope.error = error;
				});
			
		};

		$scope.edit = function(course){
			console.log('edit course',course);
			$scope.getSchema = courseService.getSchema(course.meta.course_schema);
			$scope.classes = courseService.getClasses();
			offcanvas.open({
				body : card.type('course','course',$scope,true)
			},$scope);
		};

		$scope.upload = function(data){

			var payload = [data.map(function(value){
				return { 
					id:value.id || '',
					meta:value.meta || false
				}
			})];

			$scope.saving = true;

			importService.import($scope.user,'results',payload)
  				.then(function(result){
  					console.log('upload result',result);

  					$scope.saving = false;

					$scope.saved = true;

  				})
  				.catch(function(error){
  					console.log('upload error',error);

  					$scope.saving = false;

  					$scope.error = error;
  				});
		}
		
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
		
		//$scope.course = courseService;

		console.log('course init',$scope,courseService);
		
	});
