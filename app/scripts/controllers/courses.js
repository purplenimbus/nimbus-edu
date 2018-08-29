'use strict';

/**
 * @ngdoc function
 * @name nimbusEduApp.controller:CoursesCtrl
 * @description
 * # CoursesCtrl
 * Controller of the nimbusEduApp
 */
angular.module('nimbusEduApp')
	.controller('CoursesCtrl', function ($scope,grades,courseService,modal,form,uikit3,eduApi,$localStorage,apiConst,$window,offcanvas,card,sweetAlert) {

		$scope.getSchema = function(){
			return Object.keys($scope.asset.meta.course_schema); // jshint ignore:line
		};
						
		$scope.courseAverage = function(course){
			return grades.getAverage(course);
		};
		
		$scope.courseGrade = function(course){
			return grades.getGrade(grades.getAverage(course));
		};

		$scope.createCourse = function(){

			var header = '';

				header += '<div class="uk-clearfix uk-margin-bottom">';
				header += '	<div class="uk-float-left">';
				header += '<p class="uk-button uk-button-text title uk-text-capitalize uk-text-bold uk-margin-remove">Create Course</p>';
				header += '	</div>';
				header += '	<div class="uk-float-right">';

				header += uikit3.button({
								//icon:'upload-cloud',
								directive:'ng-click="save(asset)"',
								cls:'uk-button-primary uk-button-small',
								label:'Save'
							});

				header += uikit3.button({
								//icon:'close',
								directive:'ng-click="modal.hide()"',
								cls:'uk-button-danger uk-button-small',
								label:'Close'
							});

				header += '	</div>';
				header += '</div>';

			var obj = {
				title	:	header,
				type 	: 	'full',
				body	:	form.editCourse($scope),
				//footer	:	uikit3.button({cls:'uk-button uk-button-text uk-margin-small-bottom',icon:'upload',label:'Save',directive:'ng-click="save(this.asset)"'})
			};

			if(!$scope.createCourseInit){
				courseService.initTypeAhead($scope,[{
					name:'subjects',
					display:'name',
					endPoint:eduApi.apiEndPoint+'subjects'
				},{
					name:'instructors',
					display:'firstname',
					endPoint:eduApi.apiEndPoint+$scope.user.tenant.id+'/users?user_type=teacher'
				}]);
			}

			console.log('$scope createCourse',$scope.asset);

			modal.modal(obj,$scope).then(function(result){
				$scope.modal = result;
				$scope.createCourseInit = true;
			});
		};

		$scope.save = function(data){ 
			console.log('save course',data);
			//courseService.saveCourse(data); 
		};

		$scope.next = function(page){

			$scope.loading = true;
			courseService.getCourses($scope.user,{page:page,course_grade_id:$scope.searchFilter.id}) // jshint ignore:line
			.then(function(result){

				result.data.data = $scope.coursesList.data.concat(result.data.data);

				$scope.coursesList = result.data;

				$scope.loading = false;
			}).catch(function(error){
				console.log('eduApi error',error);
				$window.UIkit.notification({
					message: 'Couldnt get users',
					status: 'danger',
					pos: 'top-right',
					timeout: 5000
				});

				$scope.loading = false;
			});
		};

		$scope.view  = function(item,type,edit){
			
			$scope.selected = item;
			
			offcanvas.open({title:false,body:card.type(type,'selected',$scope,edit)},$scope);

			$scope.offCanvasOpen = true;

			console.log(type+' card',$scope);
		};

		$scope.init = function(page,classId){
			$scope.loading = true; 
			$scope.user = $localStorage.auth;
			$scope.showAdvanced = false;
			$scope.asset = { 
				meta : {
					course_grade_id : 1, // jshint ignore:line
					course_schema : { // jshint ignore:line
			            lab: {value:5,enabled:true},
			            exam: {value:35,enabled:true},
			            quiz: {value:10,enabled:true},
			            midterm: {value:30,enabled:true},
			            assignment: {value:15,enabled:true},
			            attendance: {value:5,enabled:true}
			        }
				} 
			};

			$scope.createCourseInit = false;

			$scope.offCanvasOpen = false;

			$scope.filter = {
				courseGrade : {
					options: courseService.getClasses(),
					label:'filter by class'
				},
				assigned : {
					value:false,
					label:'assigned'
				}
			};

			courseService.getCourses($scope.user,{page:page,course_grade_id:classId}).then(function(result){
				console.log('courseService init',result);
				$scope.coursesList = result.data;
				$scope.loading = false; 
			})
			.catch(function(error){
				$scope.loading = false; 
				sweetAlert.alert({
				   	title: 'Something\'s Wrong',
				   	text : error.data.message,
				   	icon: 'error',
				   	buttons:{
						confirm: sweetAlert.button({text:'ok'})
					}
				});
			});
		};

		$scope.$on('searchFilter', function(e,searchFilter) { 
			console.log('searchFilter',searchFilter); 
			$scope.coursesList = [];
			$scope.searchFilter = searchFilter;
			$scope.init(1,$scope.searchFilter.id);
		});
		
		$scope.searchFilter = courseService.getClasses()[0];
		
		$scope.init(1,$scope.searchFilter.id);
		
	});
