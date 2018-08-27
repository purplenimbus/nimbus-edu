'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.upload
 * @description
 * # upload
 * Service in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
  	.service('upload', function ($window) {
    	this.uikit3 = function(options){
    		return $window.UIkit.upload('.js-upload', options);
    	};
  	});
