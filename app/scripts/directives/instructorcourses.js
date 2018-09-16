'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:instructorCourses
 * @description
 * # instructorCourses
 */
angular.module('nimbusEduApp')
  .directive('instructorCourses', function (uikit3) {
  	var template = '';
  		template += '<div>';
		  //template += '    <div class="uk-width-1-2@s uk-width-1-3@m" ng-repeat="course in coursesList.data">';
		  //template += '    	<student-list class="uk-flex uk-flex-center uk-flex-middle" course="course"  list="list"></student-list>';
		  //template += '    </div>';
      template += '   <spinner ng-if="loading"></spinner>';
  		template += '   <ul ng-if="list && !loading" class="uk-list uk-width-1-1 uk-margin-remove uk-list-divider">';
      template += '   <li ng-repeat="course in coursesList.data" class="uk-clear-fix">';
  		template += '		<div class="uk-float-left">';
  		template += '		 <a href="#!/learning/course/{{course.id}}" class="uk-margin-remove uk-text-primary uk-text-capitalize">{{ course.name }} <span class="uk-text-muted uk-text-uppercase">{{ course.code }}</span></a>';
      template += '   </div>';
      template += '   <div class="uk-float-right">';
      template += '     <p class="uk-margin-remove uk-text-muted uk-text-uppercase">{{course.registrations.length}} students</p>';
      template += '   </div>';
      template += '		</li>';
  		template += '	 </ul>';
	    template += '</div>';

    return {
      template: uikit3.card({
        header:'<user-pill user="user" label="label" name="true" class="uk-margin-remove"></user-pill>',
        body:template,
        classes:{
          card:'uk-card-default uk-padding-remove',
          header:'uk-padding-small',
          body:'uk-padding-small'
        }
      }),
      restrict: 'E',
      scope:{user:'=user',list:'=list'},
      controller:function($scope,courseService){
        $scope.label = '';//current term goes here  
      	$scope.init = function(){
      		$scope.loading = true;

      		var params = {
      			instructor_id : $scope.user.id
      		};

      		courseService.getCourses($scope.user,params).then(function(result){
    				//console.log('instructorCourses courseService init',result);
    				$scope.coursesList = result.data;
    				$scope.loading = false; 
    			})
    			.catch(function(error){
    				$scope.loading = false; 
    				$scope.error = error;
    			});	
      	};

      	$scope.init();

      	//console.log('instructorCourses',$scope);
      },
      link: function postLink(scope, element) {
        element.on('$destroy', function () {
		  scope.$destroy();
	   	});
      }
    };
  });
