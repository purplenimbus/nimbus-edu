'use strict';

/**
 * @ngdoc function
 * @name nimbusEduApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the nimbusEduApp
 */
angular.module('nimbusEduApp')
 	.controller('DashboardCtrl', function ($scope,settings,$route,$window,$localStorage,$compile,courseService,apiConst,uikit3) {
 		$scope.user = $localStorage.auth;
	 	$scope.dashboardSettings = settings.getSettings('dashboard');
	 	$scope.tabs = [{
	 		name : 'students',
	 		type : 'user',
	 		data : {
                source : {
                	endpoint : $scope.user.tenant.id+'/users',
                	query : {
	                	//paginate:apiConst.componentPagination,
	                	//page:1,
	                	user_type:'student'
	                },
	                filters : [{
						//value: '',
						//label:'filter by name',
						//name : 'name',
						//type : 'text',
						template : uikit3.input({
			    		  placeholder:'filter by name',
			    		  cls:'uk-text-capitalize',
			    		  directive:''
			    	  	})
					},{
						options: courseService.getClasses(),
						//label:'filter by class',
						//name : 'Class',
						//type : 'select',
						value: courseService.getClasses()[0],
						template : uikit3.select({
			    		  placeholder:'filter by class',
			    		  cls:'uk-text-capitalize',
			    		  directive:''
			    	  	})
					}]
                },
                grouping : [
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
                ]
          	}
	 	},{
	 		name : 'teachers',
	 		type : 'user',
	 		data : {
                source : {
                	endpoint : $scope.user.tenant.id+'/users',
                	query : {
	                	//paginate:apiConst.componentPagination,
	                	//page:1,
	                	user_type:'teacher'
	                },
	                filters : [{
						//value:false,
						//label:'assigned',
						//type : 'checkbox',
						//name : 'assigned',
						template : uikit3.select({
			    		  placeholder:'filter by assigned',
			    		  cls:'uk-text-capitalize',
			    		  directive:''
			    	  	})
					}]
                },
                grouping : [
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
                ]
          	}
	 	},{
	 		name : 'invoices',
	 		type : 'invoice',
	 		data : {
                source : {
                	endpoint : $scope.user.tenant.id+'/billing',
                	query : {
                		//paginate:apiConst.componentPagination,
                		//page:1,
                	},
                	filters : []
                },	
                grouping : [
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
                ]
          	}
	 	}];

	 	//console.log('Dashboard',$scope);
  	});
