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
  	var template = '';
  		template += '<div>';
	    template += '	<list source="source" name="name"></list>'
		template += '</div>';

    return {
		template: uikit3.card({
	        body:template,
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

				   	//table += '	<spinner ng-if="loading"></spinner>';
				    table += '	<tbody>';
				    table += '		<tr ng-repeat="row in list.data.data | filter:search:strict" ng-click="select(row)">';
				    table += '			<td>{{row.id}}</td>';
				    table += '			<td>{{row.course.name}}</td>';
				    table += '			<td>{{row.course.code}}</td>';
	    			table += '     		<td><span ng-if="getTotal(row.course) !== false" class="uk-margin-remove uk-text-{{getGrade(row.course).className}}">{{ getTotal(row.course) }}</span></td>';
				    table += '		</tr>';
				    table += '	</tbody>';

					table += '</table>';				
				//check for logged in
				$scope.source = {
                	type : 'table',
                	endpoint : tenant.id+'/registrations',
                	query : {
	                	paginate:apiConst.widgetPagination,
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
			 	/*eduApi.api('GET',tenant.id+'/registrations?user_id='+$scope.userId)
				 	.then(function(result){
						//console.log('eduApi course result',result);
						$scope.registrations = result.data;
						$scope.loading  = false;
						//console.log('my courses',$scope.registrations);
					}).catch(function(error){
						console.log('eduApi course error',error);
						$scope.error = error.statusText;
						$scope.loading  = false;
					});*/
			};
			
			$scope.init();

			$scope.$on('reload',function(){
				console.log('reload mycourses');
				$scope.init();
			});

			console.log('myCourses',$scope);
		},
		link: function postLink(scope, element) {
			element.on('$destroy', function () {
				scope.$destroy();
			});
		}
    };
  });
