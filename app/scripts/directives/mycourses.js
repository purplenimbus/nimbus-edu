'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers


/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:myCourses
 * @description
 * # myCourses
 */
angular.module('nimbusEduApp')
  .directive('myCourses', function (uikit3) {
    return {
		template: uikit3.card({
	        body:'<list source="source" name="name"></list>',
	        classes:{
	          card:'uk-padding-remove',
	          header:'uk-padding-small',
	          body:'uk-padding-small uk-card-default'
	        }
	    }),
		restrict: 'E',
		scope:{
			userId:'=id',
			heading:'=heading',
		},
		controller : function($scope,eduApi,apiConst,grades,$localStorage){
			$scope.label = '';//current term goes here			
			
			$scope.getTotal = function(course){	
				if(course.meta){
					return 	grades.getTotal(course.meta.grades,course.course.meta.course_schema); // jshint ignore:line
				}else{
					return false;
				}
			};
			
			$scope.getGrade = function(course){
				if(course.meta){
					return grades.getGrade(grades.getTotal(course.meta.grades,course.course.meta.course_schema)); // jshint ignore:line
				}else{
					return false;
				}
			};
			
			$scope.init = function(){
				var tenant = $localStorage.auth.tenant,
					table = '';

			    	table += '<table ng-if="source.type === \'table\' && !loading" class="uk-table-hover uk-table uk-table-middle uk-margin-remove">';
					table += '	<thead>';
				    table += '		<tr>';
				    table += '		<th>id</th>';
				    table += '		<th>course name</th>';
				    table += '		<th>course code</th>';
				    table += '		<th>grade</th>';
				    table += '		</tr>';
				   	table += '	</thead>';

				    table += '	<tbody>';
				    table += '		<tr ng-repeat="row in list.data.data | filter:search:strict" ng-click="select(row)">';
				    table += '			<td>{{row.id}}</td>';
				    table += '			<td class="uk-text-capitalize">{{row.course.name}}</td>';
				    table += '			<td>{{row.course.code}}</td>';
	    			table += '     		<td><span ng-if="getTotal(row.course) !== false" class="uk-margin-remove uk-text-{{getGrade(row.course).className}}">{{ getTotal(row.course) }}</span></td>';
				    table += '		</tr>';
				    table += '	</tbody>';

					table += '</table>';				
				//check for logged in
				$scope.source = {
                	type : 'table',
                	showCountFilter : true,
                	endpoint : tenant.id+'/registrations',
                	query : {
	                	paginate:apiConst.componentPagination,
	                	page:1,
	                	user_id:$scope.userId,
	                },
	               	display : [{
	                	icon : 'table',
	                	label : 'table',
	                	name : 'table',
	                	template : table
	                }],
                };
			};
			
			$scope.init();

			$scope.$on('reload',function(){
				$scope.init();
			});

		},
		link: function postLink(scope, element) {
			element.on('$destroy', function () {
				scope.$destroy();
			});
		}
    };
  });
