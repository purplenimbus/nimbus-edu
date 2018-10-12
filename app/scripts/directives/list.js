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

		table += '<table class="uk-table-hover uk-table uk-table uk-table-divider uk-table-small uk-margin-remove">';
		table += '	<thead>';
	    table += '		<tr>';
	    table += '    		<th ng-repeat="(key , label) in list.data.data[0]" ng-if="source.showColumns.includes(key)">{{key}}</th>';
	    table += '		</tr>';
	   	table += '	</thead>';

	    table += '	<tbody ng-if="!loading">';
	    table += '		<tr ng-repeat="row in list.data.data">';
	    table += '			<td ng-click="select(row)" ng-repeat="(key,column) in row" ng-if="source.showColumns.includes(key)">';
	    //table += '				<user-pill ng-if="row.user_type" user="row" name="true" label="format.userMeta(row)"></user-pill></td>';
	    //table += '				<span ng-if="!row.user_type">';
	    table += '				{{ column }}';
	    table += '				</span>';
	    table += '			</td>';
	    table += '		</tr>';
	    table += '	</tbody>';

		table += '</table>';
		table += '<pagination ng-if="list.data" from="list.data.from" to="list.data.to" current="list.data.current_page" last="list.data.last_page"></pagination>';

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

			  	$scope.init = function(page){

			  		$scope.loading = true;

			  		if(page){
			  			$scope.source.query.page = page;
			  		}

			  		var url = $scope.source.endpoint+queryString.objectToQuerystring($scope.source.query || {});

			  		//console.log('',$scope);

			  		eduApi.api('GET',url).then(function(result){
			  			console.log('eduApi '+$scope.type+' result',result);
			  			$scope.loading = false;
			  			$scope.list = result;
			  		})
			  		.catch(function(error){
						console.log('eduApi '+$scope.type+' error',error);
						$scope.loading = false;
						return false;
					});
			  	};

			  	$scope.init();

			  	$scope.select = function(item){
			  		$scope.$emit('selected',item);
			  	};

			  	$scope.format = format;

			  	$scope.$on('pagination',function(e,payload){
			  		$scope.init(payload.page);
			  	});
	      	},
	      	link: function postLink(scope, element) {
				element.on('$destroy', function () {
					scope.$destroy();
				});
	      	}
	    };
  	});
