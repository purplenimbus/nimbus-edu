'use strict';

/**
 * @ngdoc function
 * @name nimbusEduApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the nimbusEduApp
 */
angular.module('nimbusEduApp')
 	.controller('DashboardCtrl', function ($scope,settings,$route,$window,$localStorage) {
 		$scope.user = JSON.parse($localStorage.auth);

	 	$scope.dashboardSettings = settings.getSettings('dashboard');


		
  	});
