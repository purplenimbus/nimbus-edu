'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers


/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:myCourses
 * @description
 * # myCourses
 */
angular.module('nimbusEduApp')
  .directive('myCourses', function (uikit3) {
  	var template = '';
  		template += '<div>';
			  //template += '    <div class="uk-width-1-2@s uk-width-1-3@m" ng-repeat="course in coursesList.data">';
			  //template += '    	<student-list class="uk-flex uk-flex-center uk-flex-middle" course="course"  list="list"></student-list>';
			  //template += '    </div>';
	    template += '   <spinner ng-if="loading"></spinner>';
	  	template += '   <ul ng-if="!loading" class="uk-list uk-width-1-1 uk-margin-remove uk-list-divider">';
	    template += '   	<li ng-repeat="registration in registrations" class="uk-clear-fix">';
	  	template += '		<div class="uk-float-left">';
	  	template += '		 	<p class="uk-margin-remove uk-text-primary uk-text-capitalize">{{ registration.course.name }} <span class="uk-text-muted uk-text-uppercase">{{ registration.course.code }}</span></p>';
	    template += '   	</div>';
	    template += '   	<div class="uk-float-right">';
	    template += '     		<span ng-if="getTotal(registration) !== false" class="uk-margin-remove uk-text-{{getGrade(registration).className}}">{{ getTotal(registration) }}</span>';
	    template += '   	</div>';
	    template += '		</li>';
	  	template += '	 </ul>';
		template += '</div>';

    return {
		template: uikit3.card({
	        header:'<user-pill ng-if="heading" user="user" label="label" name="true" class="uk-margin-remove"></user-pill>',
	        body:template,
	        classes:{
	          card:'uk-padding-remove',
	          header:'uk-padding-small',
	          body:'uk-padding-small'
	        }
	    }),
		restrict: 'E',
		scope:{
			user:'=user',
			heading:'=heading',
		},
		controller : function($scope,eduApi,apiConst,grades){
			$scope.label = '';//current term goes here			
			
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
								
				//check for logged in
			 	eduApi.api('GET',$scope.user.tenant.id+'/registrations?user_id='+$scope.user.id)
			 	.then(function(result){
					//console.log('eduApi course result',result);
					$scope.registrations = result.data;
					$scope.loading  = false;
					//console.log('my courses',$scope.registrations);
				}).catch(function(error){
					console.log('eduApi course error',error);
					$scope.error = error.statusText;
					$scope.loading  = false;
				});
			};
			
			$scope.init();

			$scope.$on('reload',function(){
				console.log('reload mycourses');
				$scope.init();
			})

			console.log('myCourses',$scope);
		},
		link: function postLink(scope, element) {
			element.on('$destroy', function () {
				scope.$destroy();
			});
		}
    };
  });
