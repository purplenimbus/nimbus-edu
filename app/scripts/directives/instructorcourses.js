'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:instructorCourses
 * @description
 * # instructorCourses
 */
angular.module('nimbusEduApp')
  .directive('instructorCourses', function () {
  	var template = '';
  		template += '<div uk-grid="masonry: true">';
		template += '    <div class="uk-width-1-2@s uk-width-1-3@m" ng-repeat="course in coursesList.data">';
		template += '    	<student-list class="uk-flex uk-flex-center uk-flex-middle" course="course"  list="false"></student-list>';
		template += '    </div>';
	    template += '</div>';

    return {
      template: template,
      restrict: 'E',
      scope:{user:'=user'},
      controller:function($scope,courseService){

      	$scope.init = function(){
      		$scope.loading = true;

      		var params = {
      			instructor_id : $scope.user.id
      		};

      		courseService.getCourses($scope.user,params).then(function(result){
				console.log('instructorCourses courseService init',result);
				$scope.coursesList = result.data;
				$scope.loading = false; 
			})
			.catch(function(error){
				$scope.loading = false; 
				$scope.error = error;
			});	
      	};

      	$scope.init();

      	console.log('instructorCourses',$scope);
      },
      link: function postLink(scope, element) {
        element.on('$destroy', function () {
		  scope.$destroy();
	   	});
      }
    };
  });
