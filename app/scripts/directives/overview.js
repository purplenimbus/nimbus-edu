'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:overview
 * @description
 * # overview
 */
angular.module('nimbusEduApp')
  .directive('overview', function (uikit3) {
  	
  	var template =  '<div class="uk-grid-divider uk-child-width-expand@s" uk-grid>';
      	template += '  <div ng-repeat="metric in metrics.breakdown">';
        template += '   <stat-card title="metric.title" data="metric.data" type="metric.type"></stat-card>';
        template += '  </div>';
  		  template += '</div>';

    return {
      template: uikit3.card({
        header:'<h4 class="uk-card-title uk-text-uppercase"><span class="uk-text-muted uk-text-small">{{ metrics.term.name }} {{ metrics.term.year }}</span></h4>',
        body:template,
        classes:{
          card:'uk-card-default uk-padding-remove',
          body:'uk-padding-small',
          header : 'uk-padding-small'
        }
      }),
      restrict: 'E',
      controller : function($scope,$localStorage){
        $scope.user = $localStorage.auth;
        $scope.metrics = {
          term : {
            name : 'first term',
            year : 2018
          },
          breakdown : [
            {
              title : 'students',
              type : 'students',
              data : {
                endpoint : $scope.user.tenant.id+'/users?user_type=student'
              }
            },
            {
              title : 'teachers',
              type : 'teachers',
              data : {
                endpoint : $scope.user.tenant.id+'/users?user_type=teacher'
              }
            },
            /*{
              title : 'registrations',
              type : 'registrations',
              data : {
                endpoint : $scope.user.tenant.id+'/registrations'
              }
            }*/
          ]
        };
      },
		  link: function postLink(scope, element) {
			   element.on('$destroy', function () {
				  scope.$destroy();
			   });
		  }
    };
  });
