'use strict';

/**
 * @ngdoc service
 * @name nimbusEduApp.breadcrumbs
 * @description
 * # breadcrumbs
 * Factory in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
  .factory('breadcrumbs', function () {
    // Service logic
    // ...

    // Public API here
    return {
      parse: function () {
        var breadcrumbs = [];
		
		return breadcrumbs;
      }
    };
  });
