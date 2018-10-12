'use strict';

/**
 * @ngdoc function
 * @name nimbusEduApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the nimbusEduApp
 */
angular.module('nimbusEduApp')
 	.controller('DashboardCtrl', function ($scope,settings,$route,$window,$localStorage,apiConst) {
 		$scope.user = $localStorage.auth;
	 	$scope.dashboardSettings = settings.getSettings('dashboard');
	 	$scope.tabs = [{
	 		name : 'students',
	 		type : 'user',
	 		data : {
                source : {
                	endpoint : $scope.user.tenant.id+'/users',
                	query : {
	                	paginate:apiConst.componentPagination,
	                	page:1,
	                	user_type:'student'
	                },
	                columns : [{
	                	label:'firstname',
	                	hide : false
	                },{
	                	label :'lastname',
	                	hide : false
	                },{
	                	label:'email',
	                	hide : false
	                },{
	                	label:'ref_id',
	                	hide : false
	                }],
                },
                /*grouping : [
                  	function(x){
                    	return x.meta.course_grade_id;
                  	},
                  	null,
                  	function(key,grouping){ 
	                    return {
	                      key : courseService.getClasses(parseInt(key)-1).name,
	                      data : grouping.source
	                    };
                  	}
                ]*/
          	}
	 	},{
	 		name : 'teachers',
	 		type : 'user',
	 		data : {
                source : {
                	endpoint : $scope.user.tenant.id+'/users',
                	query : {
	                	paginate:apiConst.componentPagination,
	                	page:1,
	                	user_type:'teacher'
	                },
	                columns : [{
	                	label:'firstname',
	                	hide : false
	                },{
	                	label :'lastname',
	                	hide : false
	                },{
	                	label:'email',
	                	hide : false
	                }]
                },
                /*grouping : [
                  	function(x){
                    	return x.account_status.name;
                  	},
                  	null,
                  	function(key,grouping){ 
	                    return {
	                      	key:key,
	                      	data:grouping.source
	                    }; 
                  	}
                ]*/
          	}
	 	},{
	 		name : 'parents',
	 		type : 'user',
	 		data : {
                source : {
                	endpoint : $scope.user.tenant.id+'/users',
                	query : {
	                	paginate:apiConst.componentPagination,
	                	page:1,
	                	user_type:'parent'
	                },
	                columns : [{
	                	label:'firstname',
	                	hide : false
	                },{
	                	label :'lastname',
	                	hide : false
	                },{
	                	label:'email',
	                	hide : false
	                }]
                },
                /*grouping : [
                  	function(x){
                    	return x.account_status.name;
                  	},
                  	null,
                  	function(key,grouping){ 
	                    return {
	                      	key:key,
	                      	data:grouping.source
	                    }; 
                  	}
                ]*/
          	}
	 	},{
	 		name : 'invoices',
	 		type : 'invoice',
	 		data : {
                source : {
                	endpoint : $scope.user.tenant.id+'/billing',
                	query : {
                		paginate:apiConst.componentPagination,
                		page:1,
                	},
                	showColumns : ['id','student_id','status'],
                	columns : [{
	                	label:'id',
	                	hide : false
	                },{
	                	label :'student_id',
	                	hide : false
	                },{
	                	label:'status',
	                	hide : false
	                }]
                },	
                /*grouping : [
                  	function(x){
                    	return x.student_id;
                  	},
                  	null,
                  	function(key,grouping){ 
                    	return {
                      		key:key,
                      		data:grouping.source
                    	}; 
                  	}
                ]*/
          	}
	 	}];

  	});
