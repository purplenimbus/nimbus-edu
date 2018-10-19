'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:instructorCourses
 * @description
 * # instructorCourses
 */
angular.module('nimbusEduApp')
  .directive('instructorCourses', function (uikit3) {
    return {
      template: uikit3.card({
        header:'',
        body:'<list source="source" name="name"></list>',
        classes:{
          card:'uk-padding-remove',
          header:'uk-padding-small',
          body:'uk-padding-small'
        }
      }),
      restrict: 'E',
      scope:{
        user:'=user',
        showList:'=list',
        heading:'=heading'
      },
      controller:function($scope,courseService,$localStorage,apiConst){
        $scope.label = '';//current term goes here  
      	$scope.init = function(){
          var tenant = $localStorage.auth.tenant,
              table = '';
          table += '<table ng-if="source.type === \'table\' && !loading" class="uk-table-hover uk-table uk-table-middle uk-margin-remove">';
          table += '  <thead>';
          table += '    <tr>';
          table += '      <th>id</th>';
          table += '      <th>course name</th>';
          table += '      <th>course code</th>';
          table += '    </tr>';
          table += '  </thead>';

          table += '  <tbody>';
          table += '    <tr ng-repeat="row in list.data.data | filter:search:strict" ng-click="select(row)">';
          table += '      <td>{{row.id}}</td>';
          table += '      <td class="uk-text-capitalize">{{row.name}}</td>';
          table += '      <td>{{row.code}}</td>';
          table += '    </tr>';
          table += '  </tbody>';

          table += '</table>';
          
          $scope.source = {
            type : 'table',
            showCountFilter : true,
            endpoint : tenant.id+'/courses',
            query : {
              paginate:apiConst.componentPagination,
              page:1,
              instructor_id:$scope.user.id,
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

      },
      link: function postLink(scope, element) {
        element.on('$destroy', function () {
		  scope.$destroy();
	   	});
      }
    };
  });
