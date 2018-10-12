'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:table
 * @description
 * # table
 */

angular.module('nimbusEduApp')
  	.directive('list', function (uikit3) {
		var table = '';

		table = '<div class="uk-button-group uk-margin-bottom">';
		//table += 	uikit3.button({cls:'uk-button-default',label:'dropdown'});
		table += 	uikit3.buttonDropDown({cls:'uk-button-default',label:'Filter <span uk-icon="icon:  triangle-down"></span>',scope:'source.columns'});
		table += '</div>';

		table += '<table class="uk-table-hover uk-table uk-table-middle uk-table-divider uk-table-small uk-margin-remove">';
		table += '	<thead>';
	    table += '		<tr>';
	    table += '    		<th ng-repeat="(key , label) in list.data.data[0]" ng-if="showColumn(key).show">{{key}}</th>';
	    table += '		</tr>';
	   	table += '	</thead>';

	   	table += '	<spinner ng-if="loading"></spinner>';
	    table += '	<tbody ng-if="!loading">';
	    table += '		<tr ng-repeat="row in list.data.data">';
	    table += '			<td ng-click="select(column)" ng-repeat="(key,column) in row" ng-if="showColumn(key).show">';
	    table += '				<user-pill ng-if="column.user_type" user="column" name="true" label="format.userMeta(column)"></user-pill>';
	    table += '				<span ng-if="!column.user_type">';
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

			  	$scope.showColumn = function(key){

		  			var index = $scope.source.columns.findIndex(function(column){
			  			return column.label === key;
			  		});

		  			if($scope.source.columns[index]){
		  				//console.log('showColumn',$scope.source.columns[index]);
		  				return $scope.source.columns[index];
		  			}else{
		  				return false;
		  			}
			  	}

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
