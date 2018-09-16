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
        header:'<h4 class="uk-card-title uk-text-uppercase uk-text-center">{{ metrics.term.name }} {{ metrics.term.year }}</h4>',
        body:template,
        classes:{
          card:'uk-card-default uk-padding-remove',
          body:'uk-padding-small',
          header : 'uk-padding-small'
        }
      }),
      restrict: 'E',
      controller : function($scope,$localStorage,courseService){
        $scope.user = $localStorage.auth;
        $scope.classes = courseService.getClasses();
        $scope.metrics = {
          term : {
            name : 'first term',
            year : 2018
          },
          breakdown : [
            {
              title : 'students',
              data : {
                endpoint : $scope.user.tenant.id+'/users?user_type=student',
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
            },
            {
              title : 'teachers',
              data : {
                endpoint : $scope.user.tenant.id+'/users?user_type=teacher',
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
            },
            {
              title : 'invoices',
              data : {
                endpoint : $scope.user.tenant.id+'/billing',
                grouping : [
                  function(x){
                    return x.status.name;
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
            },
            /*{
              title : 'courses',
              data : {
                endpoint : $scope.user.tenant.id+'/courses',
                grouping : [
                  function(x){
                    return x.grade.name;
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
            },
            {
              title : 'registrations',
              data : {
                endpoint : $scope.user.tenant.id+'/registrations',
                grouping : [
                  function(x){
                    return x.course.code;
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
