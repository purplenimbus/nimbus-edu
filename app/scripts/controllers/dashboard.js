'use strict';

/**
 * @ngdoc function
 * @name nimbusEduApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the nimbusEduApp
 */
angular.module('nimbusEduApp')
 	.controller('DashboardCtrl', function ($scope,settings,$route,$window,$localStorage,$compile,courseService,apiConst) {
 		$scope.user = $localStorage.auth;
	 	$scope.dashboardSettings = settings.getSettings('dashboard');
	 	$scope.classes = courseService.getClasses();
	 	$scope.tabs = [{
	 		name : 'students',
	 		type : 'user',
	 		data : {
	 			stats : {
	              	title : 'students',
	             	data : {
		                source : {
		                	endpoint : $scope.user.tenant.id+'/users',
		                	query : {
			                	paginate:apiConst.componentPagination,
			                	page:1,
			                	user_type:'student'
			                }
		                },
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
	 		type : 'user',
	 		data : {
	 			stats : {
	              	title : 'teachers',
	              	data : {
		                source : {
		                	endpoint : $scope.user.tenant.id+'/users',
		                	query : {
			                	paginate:apiConst.componentPagination,
			                	page:1,
			                	user_type:'teacher'
			                }
		                },
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
	 		type : 'invoice',
	 		data : {
	 			stats : {
	              	title : 'invoices',
	              	data : {
		                source : {
		                	endpoint : $scope.user.tenant.id+'/billing',
		                	query : {
		                		paginate:apiConst.componentPagination,
		                		page:1,
		                	}
		                },	
		                grouping : [
		                  	function(x){
		                    	return x.student_id;
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

	 	//console.log('Dashboard',$scope);
  	});
