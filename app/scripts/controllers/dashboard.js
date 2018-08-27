'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
 	.controller('DashboardCtrl', function ($scope,settings,$route,$window,$localStorage) {
 		$scope.user = JSON.parse($localStorage.auth);

	 	$scope.dashboardSettings = settings.getSettings('dashboard');


		
  	});
