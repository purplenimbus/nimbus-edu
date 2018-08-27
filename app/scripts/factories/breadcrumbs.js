'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.breadcrumbs
 * @description
 * # breadcrumbs
 * Factory in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
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
