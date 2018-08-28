'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:overview
 * @description
 * # overview
 */
angular.module('nimbusEduApp')
  .directive('overview', function () {
  	
  	var template = '<div class="uk-grid-divider uk-child-width-expand@s" uk-grid>';
    	template += '<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>';
    	template += '<div>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>';
    	template += '<div>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>';
		template += '</div>';

    return {
      	template: template,
      	restrict: 'E',
		link: function postLink(scope, element) {
			element.on('$destroy', function () {
				scope.$destroy();
			});
		}
    };
  });
