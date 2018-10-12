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

		table += '<table class="uk-table-hover uk-table uk-table uk-table-divider uk-table-small uk-margin-remove" ng-if="!loading">';
		table += '	<thead>';
	    table += '		<tr>';
	    table += '    		<th ng-repeat="(key , label) in list.data[0]" ng-if="source.showColumns.includes(key)">{{key}}</th>';
	    table += '		</tr>';
	   	table += '	</thead>';
	    table += '	<tbody>';

	    table += '		<tr ng-repeat="row in list.data">';
	    table += '			<td ng-click="select(row)" ng-repeat="(key,column) in row" ng-if="source.showColumns.includes(key)">';
	    //table += '				<user-pill ng-if="row.user_type" user="row" name="true" label="format.userMeta(row)"></user-pill></td>';
	    //table += '				<span ng-if="!row.user_type">';
	    table += '				{{ column }}';
	    table += '				</span>';
	    table += '			</td>';
	    table += '		</tr>';
	    table += '	</tbody>';
		table += '</table>';

	    return {
	      	template: table,
	      	restrict: 'E',
		  	scope: {
			  	type:'=type',
			  	//template:'=template',
			  	source:'=source',
		  	},
		  	controller : function(
		  		$scope,
		  		eduApi,
		  		$window,
		  		apiConst,
		  		queryString,
		  		format
		  		){

			  	console.log('source',$scope);

			  	$scope.init = function(){

			  		$scope.loading = true;

			  		var url = $scope.source.endpoint+queryString.objectToQuerystring($scope.source.query || {});

			  		eduApi.api('GET',url).then(function(result){
			  			console.log('eduApi '+$scope.type+' result',result);
			  			
			  			$scope.loading = false;
			  			$scope.list = result.data;
			  			return result.data;
			  		})
			  		.catch(function(error){
						console.log('eduApi '+$scope.type+' error',error);
						$scope.loading = false;
						return false;
					});
			  	};

			  	$scope.init();

			  	console.log('list init',$scope);

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
