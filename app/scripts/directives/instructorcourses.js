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
  		template += '<div uk-grid="masonry: true">';
		  template += '    <div class="uk-width-1-2@s uk-width-1-3@m" ng-repeat="course in coursesList.data">';
		  template += '    	<student-list class="uk-flex uk-flex-center uk-flex-middle" course="course"  list="list"></student-list>';
		  template += '    </div>';
  		/*template += '    <ul ng-if="list" class="uk-list uk-width-1-1">';
  		template += '		<li ng-repeat="course in coursesList.data">';
  		template += '		<a href="#" class="uk-margin-remove uk-text-primary">{{ course.name }} <span class="uk-text-muted uk-text-uppercase">{{ course.code }}</span></a>';
  		template += '		</li>';
  		template += '	 </ul>';*/
	    template += '</div>';

    return {
      template: uikit3.card({body:template,classes:{card:'uk-card-default uk-padding-remove',body:'uk-padding-remove'}}),
      restrict: 'E',
      scope:{user:'=user',list:'=list'},
      controller:function($scope,courseService){

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
