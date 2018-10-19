'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:coursecard
 * @description
 * # coursecard
 */
angular.module('nimbusEduApp')
  .directive('coursecard', function (uikit3) {
	var template =   '';

    template +=  '  <div class="uk-card-media-top bg-gradient">';
    template +=  '    <div class="uk-inline uk-height-small uk-width-1-1">';
    template +=  '       <div class="uk-overlay uk-light uk-position-bottom uk-padding-small">';
    template +=  '          <span class="uk-text-center">';
    template +=  '          <h4 class="uk-margin-bottom-small uk-text-capitalize">{{ courseName }}</h4>';
    template +=  '          <p class="uk-text-meta uk-text-uppercase">{{ courseCode }}</p>';
    template +=  '        </span>';        
    template +=  '       </div>';
    template +=  '    </div>';
    template +=  '  </div>';

    return {
      template: uikit3.card({
      		header: template,
	        body:'<list source="source" name="courseName"></list>',
	        classes:{
      			header:'uk-padding-remove',
      			body:'uk-width-1-1 uk-padding-small',
            	card:'uk-card-default uk-padding-remove',
            	directive:'ng-class="showDetails ? \'uk-padding-remove\' : \'uk-padding-small\'"'
      		}
	    }),
      restrict: 'E',
      scope : {
      	courseName : '=name',
      	courseId : '=id',
      	courseCode : '=code',
      },
      controller : function($scope,$localStorage,apiConst){
      	console.log('courseCard',$scope);
      	var tenant = $localStorage.auth.tenant,
			table = '';

	    	table += '<table ng-if="source.type === \'table\' && !loading && list.data.data.length" class="uk-table-hover uk-table uk-table-middle uk-margin-remove">';
			table += '	<thead>';
		    table += '		<tr>';
		    table += '		<th>student</th>';
		    table += '		<th>grade</th>';
		    table += '		</tr>';
		   	table += '	</thead>';

		    table += '	<tbody>';
		    table += '		<tr ng-repeat="row in list.data.data | filter:search:strict" ng-click="select(row)">';
		    table += '			<td><user-pill user="row.user" name="row.user.firstname+\' \'+row.user.lastname"></user-pill></td>';
			table += '     		<td><span ng-if="getTotal(row.course) !== false" class="uk-margin-remove uk-text-{{getGrade(row.course).className}}">{{ getTotal(row.course) }}</span></td>';
		    table += '		</tr>';
		    table += '	</tbody>';

			table += '</table>';

      	$scope.source = {
        	type : 'table',
        	showCountFilter : true,
        	endpoint : tenant.id+'/registrations',
        	query : {
            	paginate:apiConst.componentPagination,
            	page:1,
            	course_id:$scope.courseId,
            },
           	display : [{
            	icon : 'table',
            	label : 'table',
            	name : 'table',
            	template : table
            }],
        };
      },
      link: function postLink(scope, element) {
        element.on('$destroy', function () {
			scope.$destroy();
		});
      }
    };
  });
