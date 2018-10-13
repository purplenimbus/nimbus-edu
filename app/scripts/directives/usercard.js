'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:usercard
 * @description
 * # usercard
 */
angular.module('nimbusEduApp')
  .directive('usercard', function (uikit3) {

  	var template = '<user-pill user="user" name="true" label=""></user-pill>';
  		//template += '{{ user.firstname | uppercase }} {{ user.lastname | uppercase }} {{ user.othernames | uppercase }}';
  		//template += '<p class="uk-text-meta uk-text-uppercase">{{ user.user_type.name }}</p>';
  	
    return {
      template: uikit3.card({
      		body:template,
      		classes:{
      			body:'uk-padding-small',
            card:'uk-card-default'
      		}
      }),
      scope : {user:'=user'},
      controller : function($scope,format){$scope.format = format},
      restrict: 'E',
      link: function postLink(scope, element) {
        element.on('$destroy', function () {
          scope.$destroy();
        });
      }
    };
  });
