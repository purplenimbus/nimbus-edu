'use strict';

/**
 * @ngdoc service
 * @name nimbusEduApp.upload
 * @description
 * # upload
 * Service in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
  	.service('upload', function ($window) {
    	this.uikit3 = function(options){
    		return $window.UIkit.upload('.js-upload', options);
    	};
  	});
