'use strict';
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:import
 * @description
 * # import
 */
angular.module('nimbusEduApp')
  .directive('import', function (uikit3,importService,csvParser,eduApi,user,$window,sweetAlert) {
    return {
      template: importService.render(),
      restrict: 'E',
      controller : function($scope,$timeout){
      		$scope.workbook = [];
      		$scope.importTypes = importService.importTypes();
      		//$scope.importType = false;
      		$scope.selectImportType = function(type){
      			$scope.importType = type;
      		};

  			$scope.$on('upload',function(e,files){
  				//console.log('files',files[1]);
  				$scope.loading = true;
    			csvParser.parse(files).then(function(result){
	            	$timeout(function(){
	            		$scope.workbook = result;
	            		$scope.loading = false;
	            		//console.log('csvParser scope',$scope);
	            	},1000);
	            });
        	});

  			$scope.add = function(worksheetIndex){
  				$scope.workbook[worksheetIndex].data.unshift({});
  			};

        	$scope.remove = function(worksheetIndex,row){
        		$scope.workbook[worksheetIndex].data.splice(row,1);
        	};

        	$scope.reset = function(){
        		$scope.$broadcast('reset');
        		$scope.workbook = [];
        		$scope.importType = false;
        	};

        	$scope.import = function(type){
        		$scope.loading = true;

  				var data = importService.parseWorkBook($scope.workbook,type.value);

  				console.log('import data',data);

  				sweetAlert.alert({
				   	title: 'Import '+data[0].length+' '+type.name+'?',
				   	icon: "warning",
				   	buttons:{
						cancel: sweetAlert.button({text:'Cancel',className:'uk-button uk-button-danger',value:false}),
						confirm: sweetAlert.button({text:'Import',value:true})
					}
				}).then(function(e){
					console.log('prompt choice',e);
					$scope.loading = true;
					$scope.$apply();
					if(e){
						eduApi.api('POST',user.tenant.id+'/courses/batch?type='+type.value,data)
		  				.then(function(result){
		  					console.log('import result',result);
		  					$scope.loading = false;

		  					sweetAlert.alert({
							   	title: 'Success',
							   	text : result.data.message,
							   	icon: 'success',
							   	buttons:{
									confirm: sweetAlert.button({text:'ok'})
								}
							});

							$scope.reset();
		  				})
		  				.catch(function(error){
		  					console.log('import error',error);
		  					$scope.loading = false;
		  					sweetAlert.alert({
							   	title: 'Somethings wrong!',// jshint ignore:line
							   	icon: 'error',
							   	text : error.data.message,
							   	buttons:{
									confirm: sweetAlert.button({text:'ok'}),
								}
							});
		  				});
					}

					$scope.loading = false;
				});
  			};


  			$scope.orderBy = function(key) {
  				console.log('orderBy',key);
			    $scope.workSheetOrder = key;
			};
      },
      link: function postLink(scope,element) {
        element.on('$destroy', function () {
			scope.$destroy();
		});
      }
    };
  });
