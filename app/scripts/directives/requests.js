'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:requests
 * @description
 * # requests
 */
angular.module('nimbusEduApp')
  .directive('requests', function (modal,form,tasks,tasksConst,uikit3) {
    return {
      templateUrl: 'views/templates/requests.html',
      restrict: 'E',
	  scope: true,
	  controller : function($scope){
		$scope.widgetTitle = 'Requests';
		$scope.selected = [];
		$scope.init = function(){
			$scope.requests = [
					{ 
						name: 'Provisions needed for the secondary school',
						items : [
							{ description:'Carton of Juice',quantity:10,cost:2.00 },
							{ description:'Crates of Beer',quantity:5,cost:10.00 },
							{ description:'Bread',quantity:12,cost:1.25 },
							{ description:'Diesel',quantity:1,cost:150.00 }
						]
					},
					{ 
						name: 'two',
						items : []
					},
					{ 
						name: 'three',
						items : []
					},
					{ 
						name: 'four',
						items : []						
					}
				];
		};
		
		$scope.showAddRequest = function(request){
			
			if(request){				
				$scope.newAsset = request;
			}else{
				$scope.newAsset = {
					items : [{ description:'',quantity:1,cost:0 }]
				};
			}			
			
			var obj,
				title,
				footer,
				label,
				icon,
				directive;
			
			title = request ? 'Edit Request' : 'Add Request';
			
			label = request ? 'Edit' : 'Submit';
			
			icon = request ? 'pencil' : 'plus';
			
			directive = request ? 'ng-click="submitRequest(newAsset)"' : 'ng-click="addRequest(newAsset)"';
			
			footer = '	<div class="uk-margin">';
			footer += 		uikit3.button({cls:'uk-margin-small-bottom uk-button-primary',icon:icon,label:label,directive:directive});
			footer += 		uikit3.button({cls:'uk-margin-small-bottom uk-button-default',icon:'cloud-upload',label:'save request',directive:'ng-click="saveRequest(newAsset)"'});
			footer += '	</div>';
			
			obj = {
				title:title,
				body: form.addRequest($scope.newAsset.items),
				footer:footer,
				wrapperCls : 'uk-modal-container'
			};
			
			
			modal.modal(obj,$scope).then(function(result){
				$scope.modal = result;
			});
			
		};
		
		$scope.addRow = function(){
			$scope.newAsset.items.push({ description:'',quantity:1 });
			$scope.calculateRequestTotal();
		};
		
		$scope.removeRow = function(index){
			$scope.newAsset.items.splice(index, 1);
			$scope.calculateRequestTotal();
		};

		$scope.addRequest = function(request){
			console.log('addRequest',request);
			//show spinner
			
			//send to database
			
			//save task to scope
			$scope.requests.push(request);
			
			//Reset newAsset
			$scope.newAsset = {};
			
			//close modal
			$scope.modal.hide();
			
			//$scope.resetTypeAhead();
			
			$scope.reset();
		};
		
		$scope.removeRequest = function(index){
			console.log('removeRequest',$scope.requests[index]);
			//send to database
			
			//remove from scope
			$scope.requests.splice(index, 1);
		};
		
		$scope.completeRequest = function(index){
			console.log('completeRequest',$scope.requests[index]);
			//send to database
			
			$scope.requests[index].completed = true;
		};
		
		$scope.saveRequest = function(request){
			console.log('saveRequest',request);
			//send to database
			//close modal
			$scope.modal.hide();
			
			$scope.reset();
		};
		
		$scope.reset = function(){
			console.log('Scope Reset');
			$scope.newAsset = {};
			
			//$scope.$apply();
		};

		$scope.selectAll = function(requests,event){
			var selected = [];
			
			requests.map(function(value,index){
				value.selected = angular.element(event.target).get(0).checked;
				selected.push(index);
			});
			
			$scope.selected = selected;
			
		};
		
		$scope.completeSelected = function(selected){
			console.log('completeSelected',selected);
		};
		
		$scope.removeSelected = function(selected){
			console.log('removeSelected',selected);
		};
		
		$scope.selectRequest = function(index,event){
			
			console.log('selectRequest',angular.element(event.target).get(0).checked);
			
			var checked = angular.element(event.target).get(0).checked;
			if(checked){
				$scope.selected.push(index);
			}else{
				$scope.selected.splice(index,1);
			}
			
		};
		
		$scope.calculateRequestTotal = function(){
		  var total = 0;
		  
		  $scope.newAsset.items.map(function(value){
			total += (value.cost * value.quantity);
		  });
		  
		  $scope.requestTotal = total;
		  
		};
	
		$scope.init();
		
	  },
      link: function postLink(scope,element) {
        element.on('$destroy', function () {
			scope.$destroy();
		});
      }
    };
  });
