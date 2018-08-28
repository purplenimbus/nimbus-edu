'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:searchFilter
 * @description
 * # searchFilter
 */
angular.module('nimbusEduApp')
  .directive('searchFilter', function (uikit3) {
  	var template = 'yoo';
    return {
      template: template,
      restrict: 'E',
      //scope:true,
      controller:function($scope){
      	console.log('searchFilter scope',$scope);
      },
      link: function postLink(scope, element) {
      	console.log('searchFilter link',scope);
        element.on('$destroy', function () {
			scope.$destroy();
		});
      }
    };
  });
