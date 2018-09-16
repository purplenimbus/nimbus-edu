'use strict';

/**
 * @ngdoc service
 * @name nimbusEduApp.notifications
 * @description
 * # notifications
 * Service in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
  	.service('notifications', function ($pusher,$window,eduApiConst,eduApi) {
	    this.pusher = function(){
	    	this.debug(true);
	    	this.client = new $window.Pusher(eduApiConst.pusher.API_KEY,{
		      cluster: eduApiConst.pusher.cluster,
		      forceTLS: true,
		      authEndpoint: eduApi.apiEndPoint+'pusher/auth',
		    });
	    	return $pusher(this.client);
	    }

	    this.debug = function(value){
	    	$window.Pusher.logToConsole = value;
	    }
		
  	});
