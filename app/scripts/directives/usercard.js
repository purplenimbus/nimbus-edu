'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:usercard
 * @description
 * # usercard
 */
angular.module('nimbusEduApp')
  .directive('usercard', function (uikit3) {

  	var template =   '<user-pill user="user" name="true" label=""></user-pill>';
        template +=  '<tabs tabs="tabs" class="uk-width-1-1" ng-if="showTabs"></tabs>';
  		//template += '{{ user.firstname | uppercase }} {{ user.lastname | uppercase }} {{ user.othernames | uppercase }}';
  		//template += '<p class="uk-text-meta uk-text-uppercase">{{ user.user_type.name }}</p>';
  	
    return {
      template: uikit3.card({
      		body:template,
      		classes:{
      			body:'uk-padding-small uk-width-1-1',
            card:'uk-card-default',
      		}
      }),
      scope : {
        user:'=user',
        showTabs:'=tabs',
        wrapper:'=wrapper'
      },
      controller : function($scope,format){
        $scope.format = format;
        $scope.tabs = [{
          name : 'grades',
          template : 'this is a grades tab'
        },{
          name : 'invoices',
          template : 'this is an invoices tab'
        }];
        //console.log('usercard scope',$scope);
      },
      restrict: 'E',
      link: function postLink(scope, element) {
        element.on('$destroy', function () {
          scope.$destroy();
        });
      }
    };
  });
