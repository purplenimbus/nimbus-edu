'use strict';

/**
 * @ngdoc function
 * @name nimbusEduApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the nimbusEduApp
 */
angular.module('nimbusEduApp')
  	.controller('SettingsCtrl', function ($scope,$localStorage) {
  		$scope.init = function(){
  			$scope.settings = $localStorage.auth.tenant;

	  		$scope.settings.meta = {
	  			school : {
	  				terms : [{
	  					startDate:'',
	  					endDate:''
	  				}],
	  				curricula : [],
	  				classes : []
	  			}
	  		};
	  	};

  		$scope.init();

  		console.log('SettingsCtrl scope',$scope,$localStorage.auth.tenant);
  	});
