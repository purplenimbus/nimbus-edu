'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:table
 * @description
 * # table
 */

angular.module('nimbusEduApp')
  	.directive('list', function () {
		var table = '<spinner ng-if="loading"></spinner>';

		//table += '<table datatable="ng" class="uk-table-hover uk-table uk-table uk-table-divider uk-table-small uk-margin-remove" ng-if="!loading">';
		table =  '<table ng-table="data">';
		table += '	<thead>';
	    /*table += '		<tr>';
	    table += '    		<th uk-grid><search-filter filters="source.filters"></search-filter></th>';
	    table += '    		<th>#</th>';
	    table += '		</tr>';*/
	    table += '	</thead>';
	    table += '	<tbody>';
	    table += '	<tr ng-repeat="row in $data track by row.id">';
	    table += '	<td>{{row}}';
	    table += '	</td>';
	    table += '	</tr>';

	    /*table += '		<tr ng-repeat="item in list.data">';
	    table += '		<td ng-click="select(item)">';
	    table += '		<user-pill ng-if="item.user_type" user="item" name="true" label="format.userMeta(item)"></user-pill></td>';
	    table += '		<span ng-if="!item.user_type">';
	    table += '		{{ item }}';
	    table += '		</span>';
	    table += '		<td></td>';
	    table += '		</tr>';*/
	    table += '	</tbody>';
		table += '</table>';

	    return {
	      	template: table,
	      	restrict: 'E',
		  	scope: {
			  	type:'=type',
			  	template:'=template',
			  	source:'=source',
		  	},
		  	controller : function($scope,eduApi,$window,apiConst,queryString,format,NgTableParams){

			  	console.log('source',$scope);

			  	$scope.init = function(){
			  		$scope.loading = true;
			  		$scope.data = new NgTableParams({
					    count: apiConst.componentPagination 
					}, {
      					getData: function(params) {
					  		var url = $scope.source.endpoint+queryString.objectToQuerystring($scope.source.query || {});
					  		
					  		console.log('getData',params);	

					  		return eduApi.api('GET',url).then(function(result){
					  			console.log('eduApi '+$scope.type+' result',result);
					  			
					  			$scope.loading = false;
					  			params.total(result.data.length);
					  			return result.data;
					  		})
					  		.catch(function(error){
								console.log('eduApi '+$scope.type+' error',error);
								$scope.loading = false;
								return false;
							});
					  	}
					});
			  	};

			  	$scope.init();

			  	$scope.select = function(item){
			  		$scope.$emit('selected',item);
			  	};

			  	$scope.format = format;
	      	},
	      	link: function postLink(scope, element) {
				element.on('$destroy', function () {
					scope.$destroy();
				});
	      	}
	    };
  	});
