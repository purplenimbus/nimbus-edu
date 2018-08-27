'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.csvParser
 * @description
 * # csvParser
 * Service in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
  	.service('csvParser', function ($window,$q) {
    	this.parse = function(files){
    		var workbook = [],
    			deferred = $q.defer();
			
    		if(!files){
    			return;
    		}

    		for (var k = 0; k < files.length; k++) {
                $window.Papa.parse(files.item(k),{
                    header : true,
                    /* jshint ignore:start */
    				complete : function(result){
    					//var header = result.data.splice(0,1)[0];

    					workbook.push(result);
    				}
                    /* jshint ignore:end */
    			});
    		}

    		deferred.resolve(workbook);

    		return deferred.promise;

    	};
  	});
