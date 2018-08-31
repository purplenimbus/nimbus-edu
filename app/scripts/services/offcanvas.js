'use strict';

/**
 * @ngdoc service
 * @name nimbusEduApp.offcanvas
 * @description
 * # offcanvas
 * Service in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
	.service('offcanvas', function ($window,uikit3,$compile) {
		// AngularJS will instantiate a singleton by calling "new" on this function		
		this.offcanvas = function(type){
			
			this.offcanvas.type = type;
						
			return $window.UIkit.offcanvas('#side-menu');
		};
				
		angular.element('#side-menu').on('hidden',function(){
			//console.log('offcanvas hidden',e);
		}).on('shown',function(){
			//console.log('offcanvas shown',e);
		});	
		
		this.open  = function(attrs,$scope){
	      angular.element('#uk-offcanvas-content')
	        .append($compile(uikit3.offcanvas(attrs))($scope));

	      	$window.UIkit.offcanvas('#'+attrs.el).show();
	      
	      	angular.element('#'+attrs.el).on('hidden',function(){
	      		$scope.offCanvasOpen = false;
	        	angular.element(this).remove();
	      	});
	    };

	    this.close = function(){
	      //if( $window.UIkit.offcanvas('.uk-offcanvas')){ 
	      	$window.UIkit.offcanvas('.uk-offcanvas').hide();
	      //}
	    };

	});
