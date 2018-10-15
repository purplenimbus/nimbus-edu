'use strict';

/**
 * @ngdoc function
 * @name nimbusEduApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the nimbusEduApp
 */
angular.module('nimbusEduApp')
 	.controller('DashboardCtrl', function ($scope,settings,$route,$window,$localStorage,apiConst,courseService,$compile) {
 		$scope.user = $localStorage.auth;
	 	$scope.dashboardSettings = settings.getSettings('dashboard');
	 	$scope.tabs = [{
	 		name : 'students',
	 		type : 'table',
	 		template : function(){
	 			var str = '<list source="tab.data.source" type="tab.type" name="tab.name"></list>';

	 			return str;
	 		},
	 		data : {
                source : {
                	endpoint : $scope.user.tenant.id+'/users',
                	query : {
	                	paginate:apiConst.componentPagination,
	                	page:1,
	                	user_type:'student',
	                	course_grade_id:courseService.getClasses()[6].id
	                },
	                columns : [{
	                	label:'first name',
	                	name :'firstname',
	                	show : true
	                },{
	                	label :'last name',
	                	name :'lastname',
	                	show : true
	                },{
	                	label: 'email',
	                	name : 'email',
	                	show : true
	                },/*{
	                	label:'account status',
	                	name : 'account_status',
	                	show : true,
	                	key : 'account_status.name'
	                },*/{
	                	label:'ref id',
	                	name : 'ref_id',
	                	show : true
	                }],
	                filters : [{
	                	type : 'select',
	                	label : 'Filter by Class',
	                	name : 'course_grade_id',
	                	options : courseService.getClasses(),
	                	default : courseService.getClasses()[6]
	                }],
	               	display : [{
	                	icon : 'table',
	                	label : 'table',
	                	name : 'table'
	                },{
	                	icon : 'list',
	                	label : 'list',
	                	name : 'list'
	                },{
	                	icon : 'thumbnails',
	                	label : 'cards',
	                	name : 'card'
	                }]
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
	 		type : 'card',
	 		template : '<list source="tab.data.source" type="tab.type" name="tab.name"></list>',
	 		data : {
                source : {
                	endpoint : $scope.user.tenant.id+'/users',
                	query : {
	                	paginate:apiConst.componentPagination,
	                	page:1,
	                	user_type:'teacher'
	                },
	                columns : [{
	                	label:'first name',
	                	name:'firstname',
	                	show : true
	                },{
	                	label :'last name',
	                	name:'lastname',
	                	show : true
	                },{
	                	label:'email',
	                	name:'email',
	                	show : true
	                }/*,{
	                	label:'account status',
	                	name:'account_status',
	                	show : true
	                }*/],
	                display : [{
	                	icon : 'table',
	                	label : 'table',
	                	name : 'table'
	                },{
	                	icon : 'list',
	                	label : 'list',
	                	name : 'list'
	                },{
	                	icon : 'thumbnails',
	                	label : 'cards',
	                	name : 'card'
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
	 		type : 'card',
	 		template : '<list source="tab.data.source" type="tab.type" name="tab.name"></list>',
	 		data : {
                source : {
                	endpoint : $scope.user.tenant.id+'/users',
                	query : {
	                	paginate:apiConst.componentPagination,
	                	page:1,
	                	user_type:'parent'
	                },
	                columns : [{
	                	label:'first name',
	                	name:'first_name',
	                	show : true
	                },{
	                	label :'last name',
	                	name:'last_name',
	                	show : true
	                },{
	                	label:'email',
	                	name:'email',
	                	show : true
	                }/*,{
	                	label:'account status',
	                	name:'account_status',
	                	show : true
	                }*/],
	               	display : [{
	                	icon : 'table',
	                	label : 'table',
	                	name : 'table'
	                },{
	                	icon : 'list',
	                	label : 'list',
	                	name : 'list'
	                },{
	                	icon : 'thumbnails',
	                	label : 'cards',
	                	name : 'card'
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
	 		type : 'table',
	 		template : '<list source="tab.data.source" type="tab.type" name="tab.name"></list>',
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
	                	name:'id',
	                	show : true
	                },{
	                	label :'student id',
	                	name :'student_id',
	                	show : true
	                }/*,{
	                	label :'status',
	                	name :'status',
	                	show : true
	                }*/],
	                display : [{
	                	icon : 'table',
	                	label : 'table',
	                	name : 'table'
	                },{
	                	icon : 'list',
	                	label : 'list',
	                	name : 'list'
	                },{
	                	icon : 'thumbnails',
	                	label : 'cards',
	                	name : 'card'
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
