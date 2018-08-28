'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:usercard
 * @description
 * # usercard
 */
angular.module('nimbusEduApp')
  .directive('usercard', function (uikit3) {

  	var template = '';
  		template += '{{ user.firstname | uppercase }} {{ user.lastname | uppercase }} {{ user.othernames | uppercase }}';
  		template += '<p class="uk-text-meta uk-text-uppercase">{{ user.user_type.name }}</p>';
  	
    return {
      template: uikit3.card({
      		body:template,
      		classes:{
      			body:'uk-text-center uk-padding-small',
      		}
      }),
      scope : {user:'=user'},
      controller : function($scope,$localStorage){
      },
      restrict: 'E',
      link: function postLink(scope, element) {
        element.on('$destroy', function () {
          scope.$destroy();
        });
      }
    };
  });
