'use strict';

/**
 * @ngdoc function
 * @name nimbusEduApp.controller:LearningCtrl
 * @description
 * # LearningCtrl
 * Controller of the nimbusEduApp
 */
angular.module('nimbusEduApp')
  .controller('LearningCtrl', function ($scope,$window,settings) {
	 
	$scope.dashboardSettings = settings.getSettings('learningDashboard');
	
	$scope.myCourses = [{
		name	:	'Physics',
		grade	:	0,
	},{
		name	:	'Chemistry',
		grade	:	0,
	},{
		name	:	'Biology',
		grade	:	0,
	}];
	
	$scope.activities = [{
		user : {
			image : 'https://getuikit.com/docs/images/avatar.jpg',
			fname : 'Anthony',
			lname : 'Akpan'
		},
		meta : {
			action : {
				type : 'registration',
				verb : 'registered for',
			},
			subject : {
				name : 'Biology',
				url : '#',
				description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
				featuredImage : 'https://cdn.colorlib.com/wp/wp-content/uploads/sites/2/restaurant-website-templates-506x344.jpg',
				images : [],
				type : 'course',
			},
		}
	}];
	 
    $scope.$on('$routeChangeStart', function() { 
	   //close any open menus or modals
		$window.UIkit.offcanvas('#side-menu').hide();
	});
  });
