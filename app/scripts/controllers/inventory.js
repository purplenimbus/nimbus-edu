'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:InventoryCtrl
 * @description
 * # InventoryCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
	.controller('InventoryCtrl', function ($scope,$window) {
		$scope.inventoryData = [{
			sku:'0000-0001',
			description : 'crates of fanta',
			quantity : 5,
			price : 1000.00
		},{
			sku:'0000-0002',
			description : 'crates of eggs',
			quantity : 5,
			price : 1500.00
		}];
		
		$scope.$on('$routeChangeStart', function() { 
		   //close any open menus or modals
			$window.UIkit.offcanvas('#side-menu').hide();
		});
	});
