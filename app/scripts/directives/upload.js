'use strict';

/**
 * @ngdoc directive
 * @name nimbusEmsApp.directive:upload
 * @description
 * # upload
 */
angular.module('nimbusEmsApp')
  .directive('upload', function (uikit3) {
    return {
      	template: uikit3.upload({}),
      	restrict: 'E',
      	controller : function($scope,upload){
          $scope.files = [];
      		var options = {
		        url: '',
		        multiple: true,
		        beforeAll: function (el,files) {
              $scope.files = files;
		        	$scope.$emit('upload',files);
		        },
		      };

      		$scope.upload = upload.uikit3(options);

          $scope.$on('reset',function(){
            console.log('reset files event');
            $scope.files = [];
          });
      	},
      	link: function postLink(scope,element) {
        	element.on('$destroy', function () {
            scope.$destroy();
          });
      	}
    };
  });
