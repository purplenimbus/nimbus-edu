'use strict';

/**
 * @ngdoc function
 * @name nimbusEduApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the nimbusEduApp
 */
angular.module('nimbusEduApp')
 	.controller('DashboardCtrl', function ($scope,settings,$route,$window,$localStorage,$compile,courseService) {
 		$scope.user = $localStorage.auth;
	 	$scope.dashboardSettings = settings.getSettings('dashboard');
	 	$scope.classes = courseService.getClasses();
	 	$scope.tabs = [{
	 		name : 'students',
	 		body : '',//$compile('<div class="" uk-grid><div class="uk-width-1-3@m"><stat-card title="metric.title" data="metric.data" type="metric.type"></stat-card></div></div>')($scope).html(),
	 		data : {
	 			stats : {
	              	title : 'students',
	             	data : {
		                endpoint : $scope.user.tenant.id+'/users?user_type=student',
		                grouping : [
		                  	function(x){
		                    	return x.meta.course_grade_id;
		                  	},
		                  	null,
		                  	function(key,grouping){ 
			                    return {
			                      key : $scope.classes[parseInt(key)-1].name,
			                      data : grouping.source
			                    };
		                  	}
		                ]
	              	}
	            }
	 		}
	 	},{
	 		name : 'teachers',
	 		body : 'teachers body goes here',
	 		data : {
	 			stats : {
	              	title : 'teachers',
	              	data : {
		                endpoint : $scope.user.tenant.id+'/users?user_type=teacher',
		                grouping : [
		                  	function(x){
		                    	return x.account_status.name;
		                  	},
		                  	null,
		                  	function(key,grouping){ 
			                    //console.log('GroupBy result '+type,key,grouping);
			                    return {
			                      	key:key,
			                      	data:grouping.source
			                    }; 
		                  	}
		                ]
	              	}
	            }
	 		}
	 	},{
	 		name : 'invoices',
	 		body : 'invoices body goes here',
	 		data : {
	 			stats : {
	              	title : 'invoices',
	              	data : {
		                endpoint : $scope.user.tenant.id+'/billing',
		                grouping : [
		                  	function(x){
		                    	return x.status.name;
		                  	},
		                  	null,
		                  	function(key,grouping){ 
		                    //console.log('GroupBy result '+type,key,grouping);
		                    	return {
		                      		key:key,
		                      		data:grouping.source
		                    	}; 
		                  	}
		                ]
	              	}
	            }
	 		}
	 	}];

	 	console.log('Dashboard',$scope);
  	});
