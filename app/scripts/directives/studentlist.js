'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:studentList
 * @description
 * # studentList
 */
angular.module('nimbusEduApp')
	.directive('studentList', function (uikit3) {	
		var template = '',header = '',body = '';

			header += '<div class="uk-align-left uk-margin-remove uk-width-2-3">';
			header += '	<a ng-href="#!/learning/course/{{ courseId }}" ';
			header += '	class="title uk-text-capitalize uk-text-bold uk-margin-remove uk-link-reset" ';
			header += '	href="#!/learning/course/{{ courseId }}">';
			header += '	<user-pill user="course.instructor" label="\'instructor \'+course.code" name="true"></user-pill>';
			//header += ' <span class="uk-text-muted uk-text-uppercase">{{course.code}}</span>'
			header += '	</a>';
			header += '</div>';
			header += '<div class="uk-align-right">';
			header += '	<ul class="uk-iconnav toolbar">';
			header += '		<li><a ng-click="init()" uk-icon="icon: refresh"></a></li>';
			header += '	</ul>';
			header += '</div>';

			body += '<div class="uk-card-body uk-overflow-auto uk-padding-remove">';
			body += '<spinner ng-if="loading"></spinner>';
			body += '<div ng-if="!students && !loading" class="uk-margin-remove uk-placeholder uk-text-center uk-text-capitalize uk-text-muted">no students found</div>';
			body += '<div ng-if="!list && !loading" uk-grid><user-pill user="student.user" name="false" ng-repeat="student in students" ng-if="!loading && students"></user-pill></div>'
			body += '<table class="uk-table uk-table-hover uk-table-middle uk-table-small" ng-if="!loading && students && list">';
			body += '	<thead>';
			body += '		<tr>';
			//body += '			<th class="uk-table-shrink"></th>';
			body += '			<th class="uk-table-small">Name</th>';
			body += '			<th class="uk-table-shrink uk-text-small">Grade</th>';
			body += '		</tr>';
			body += '	</thead>';
			body += '	<tbody>';
			body += '		<tr ng-repeat="student in students">';
			body += '			<td class="uk-table-link"><user-pill user="student.user" name="true"></user-pill></td>';
			//body += '			<td class="uk-table-link">';
			//body += '				<a class="uk-link-reset uk-text-capitalize" ng-href="#!/profile/{{ student.user.id }}">{{ student.user.firstname }}, {{ student.user.lastname }}</a>';
			//body += '			</td>';
			body += '			<td class="uk-text-center"><span class="uk-text-{{getGrade(student).className}}">{{getGrade(student).grade}}</span></td>';
			body += '		</tr>';
			body += '	</tbody>';
			body += '</table>';
			body += '</div>';

			template = uikit3.card({
				header : header,
				body : body,
				classes:{
					card : 'uk-card-default uk-padding-remove uk-width-1-1',
					body:'uk-padding-small',
					header : 'uk-padding-small'
				}
			});		
		return {
			template: template,
			scope:{course :'=course',list:'=list'},
			controller : function($scope,courseService,grades,$localStorage){
				
				$scope.init = function(){
					$scope.loading = true;
					courseService.initCourse($localStorage.auth,$scope,{course_id:$scope.course.id}).then(function(result){
						//console.log('studentList directive result',result);
						$scope.loading = false;
						$scope.students = result.data;
					}).catch(function(error){
						$scope.loading = false;
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
								
				$scope.init();
				
			},
			restrict: 'E',
			link: function postLink(scope, element) {			
				element.on('$destroy', function () {
					scope.$destroy();
				});
			}
		};
	});
