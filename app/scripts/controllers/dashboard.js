'use strict';

/**
 * @ngdoc function
 * @name nimbusEduApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the nimbusEduApp
 */
angular.module('nimbusEduApp')
 	.controller('DashboardCtrl', function ($scope,settings,$route,$window,$localStorage,apiConst,courseService,$compile,uikit3) {
 		$scope.user = $localStorage.auth;
	 	$scope.dashboardSettings = settings.getSettings('dashboard');

        var invoiceTemplate = '';

		invoiceTemplate += '<table ng-if="source.type === \'table\'" class="uk-table-hover uk-table uk-table-middle uk-margin-remove">';
		invoiceTemplate += '	<thead>';
	    invoiceTemplate += '		<tr>';
	    invoiceTemplate += '    		<th ng-repeat="(key , label) in list.data.data[0]" ng-if="getColumn(key).show">{{ getColumn(key).label }}</th>';
	    invoiceTemplate += '		</tr>';
	   	invoiceTemplate += '	</thead>';

	    invoiceTemplate += '	<tbody ng-if="!loading">';
	    invoiceTemplate += '		<tr ng-repeat="row in list.data.data | filter:search:strict" ng-click="select(row)">';
	    invoiceTemplate += '			<td ng-repeat="(key,column) in row" ng-if="getColumn(key).show">';
	    invoiceTemplate += '				<span ng-if="key !== \'status\'">{{ column }}</span>';
	    invoiceTemplate += '				<span ng-if="key === \'status\'">{{ column.name }}</span>';
	    invoiceTemplate += '			</td>';
	    invoiceTemplate += '		</tr>';
	    invoiceTemplate += '	</tbody>';

		invoiceTemplate += '</table>';

	 	$scope.tabs = [{
	 		name : 'students',
	 		template : '<list source="tab.data.source" name="tab.name"></list>',
	 		data : {
                source : {
                	type : 'card',
                	endpoint : $scope.user.tenant.id+'/users',
                	query : {
	                	paginate:apiConst.componentPagination,
	                	page:1,
	                	user_type:'student',
	                	course_grade_id:courseService.getClasses()[6].id
	                },
	                filters : [{
	                	type : 'select',
	                	label : 'Filter by Class',
	                	name : 'course_grade_id',
	                	options : courseService.getClasses(),
	                	default : courseService.getClasses()[6]
	                }],
	               	display : [{
	                	icon : 'thumbnails',
	                	label : 'cards',
	                	name : 'card',
	                	template : uikit3.dataTable({
	                		name : 'card',
	                		info : 'students'
		                })
	                }],
                },
          	}
	 	},{
	 		name : 'teachers',
	 		template : '<list source="tab.data.source" name="tab.name"></list>',
	 		data : {
                source : {
                	type : 'card',
                	endpoint : $scope.user.tenant.id+'/users',
                	query : {
	                	paginate:apiConst.componentPagination,
	                	page:1,
	                	user_type:'teacher'
	                },
	                display : [{
	                	icon : 'thumbnails',
	                	label : 'cards',
	                	name : 'card',
	                	template : uikit3.dataTable({
	                		name : 'card',
	                		info : 'teachers'
		                })
	                }],
                },
          	}
	 	},{
	 		name : 'parents',
	 		template : '<list source="tab.data.source" name="tab.name"></list>',
	 		data : {
                source : {
                	type : 'card',
                	endpoint : $scope.user.tenant.id+'/users',
                	query : {
	                	paginate:apiConst.componentPagination,
	                	page:1,
	                	user_type:'parent'
	                },
	               	display : [{
	                	icon : 'thumbnails',
	                	label : 'cards',
	                	name : 'card',
	                	template : uikit3.dataTable({
	                		name : 'card',
	                		info : 'parents'
		                })
	                }],
                },
          	}
	 	},{
	 		name : 'invoices',
	 		template : '<list source="tab.data.source" name="tab.name"></list>',
	 		data : {
                source : {
                	type : 'table',
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
	                },{
	                	label :'status',
	                	name :'status',
	                	show : true
	                },{
	                	label :'created',
	                	name :'created_at',
	                	show : true
	                },{
	                	label :'term id',
	                	name :'term_id',
	                	show : true
	                }],
	                display : [{
	                	icon : 'table',
	                	label : 'table',
	                	name : 'table',
	                	template : uikit3.dataTable({
	                		name : 'table',
	                		info : 'invoices',
	                		template : invoiceTemplate
		                })
	                }]
                },	
          	}
	 	}];

  	});
