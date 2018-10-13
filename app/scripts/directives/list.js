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

		table += '<div class="uk-clearfix">';
		table += '	<form class="uk-grid-small uk-float-left" uk-grid>';
		table += 	'	<div class="uk-margin-bottom">';
		//table += 			uikit3.button({cls:'uk-button-default',label:'filters'});
		table += 	'		<search-filter filter="countFilter"></search-filter>';
		table += 	'	</div>';

		table += 	'	<div class="uk-margin-bottom">';
		//table += 			uikit3.button({cls:'uk-button-default',label:'filters'});
		table += 	'		<search-filter ng-if-"source.filters[0]" filter="source.filters[0]"></search-filter>';
		table += 	'	</div>';

		table += 	'	<div class="uk-button-group uk-margin-bottom" ng-if="type === \'table\'">';
		table += 			uikit3.buttonDropDown({cls:'uk-button-default',label:'show/hide columns <span uk-icon="icon:  triangle-down"></span>',scope:'source.columns'});
		table += 	'	</div>';
		table += 	'	<div class="">';
		table += 			uikit3.inputIcon({icon:'search',directive:'ng-model="search.$"',cls:'uk-input'});
		table += 	'	</div>';
		table += '	</form>';
		table += '	<div class="uk-float-right">';

		table += '	</div>';
		table += '</div>';

		table += '	<spinner ng-if="loading"></spinner>';

		table += '<div ng-if="type === \'card\'">';
		table += '<ul ng-if="!loading" class="uk-grid-small uk-child-width-1-4@m uk-child-width-1-2@s" uk-grid>';
		table += '	<li ng-repeat="row in list.data.data | filter:search:strict"">';
		table += '		<usercard user="row"></usercard>';
		table += '	</li>';
		table += '</ul>';
		table += '</div>';

		table += '<div ng-if="type === \'list\'">';
		table += '<ul ng-if="!loading" class="uk-list uk-list-divider">';
		table += '	<li ng-repeat="row in list.data.data | filter:search:strict"">';
		table += '		<user-pill user="row" name="true" label="format.userMeta(row)"></user-pill>';
		table += '	</li>';
		table += '</ul>';
		table += '</div>';

		table += '<table ng-if="type === \'table\'" class="uk-table-hover uk-table uk-table-middle uk-margin-remove">';
		table += '	<thead>';
	    table += '		<tr>';
	    table += '    		<th ng-repeat="(key , label) in list.data.data[0]" ng-if="getColumn(key).show">{{ getColumn(key).label }}</th>';
	    table += '		</tr>';
	   	table += '	</thead>';

	   	//table += '	<spinner ng-if="loading"></spinner>';
	    table += '	<tbody ng-if="!loading">';
	    table += '		<tr ng-repeat="row in list.data.data | filter:search:strict">';
	    table += '			<td ng-click="select(column)" ng-repeat="(key,column) in row" ng-if="getColumn(key).show">';
	    table += '				{{ column.key || column }}';
	    table += '			</td>';
	    table += '		</tr>';
	    table += '	</tbody>';

		table += '</table>';
		table += '<pagination ng-if="list.data" from="list.data.from" to="list.data.to" current="list.data.current_page" last="list.data.last_page" total="list.data.total" type="type"></pagination>';

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
		  		$scope.searchFilter = {};

			  	$scope.init = function(query){

			  		$scope.loading = true;

			  		if(query){
			  			$scope.source.query = Object.assign({}, $scope.source.query, query );
			  		}

			  		var url = $scope.source.endpoint+queryString.objectToQuerystring($scope.source.query || {});

			  		console.log('query url', url);

			  		eduApi.api('GET',url).then(function(result){
			  			$scope.loading = false;
			  			$scope.list = result;
			  			//console.log($scope.list);
			  		})
			  		.catch(function(error){
						console.log('eduApi '+$scope.type+' error',error);
						$scope.loading = false;
						return false;
					});
			  	};

			  	var countFilterOptions = [
			  			{name:5,id:5},
                		{name:10,id:10},
                		{name:20,id:20},
                		{name:50,id:50},
                		{name:100,id:100}
                	];

			  	$scope.countFilter = {
                	type : 'select',
                	label : 'Filter by Class',
                	name : 'paginate',
                	options : countFilterOptions,
                	default : countFilterOptions[0]
                }

			  	$scope.select = function(item){
			  		$scope.$emit('selected',item);
			  	};

			  	$scope.format = format;

			  	$scope.getColumn = function(key){

		  			var index = $scope.source.columns.findIndex(function(column){
			  			return column.name === key;
			  		});

		  			return $scope.source.columns[index] || false;

			  	};

			  	$scope.$on('pagination',function(e,payload){

			  		$scope.searchFilter = Object.assign({}, $scope.searchFilter, payload);

			  		$scope.init($scope.searchFilter);
			  		
			  	});

			  	$scope.$on('searchFilter',function(e,payload){
			  		
			  		$scope.searchFilter = Object.assign({}, $scope.searchFilter, payload );

			  		//console.log('searchFilter',$scope.searchFilter);

			  		$scope.init($scope.searchFilter);
			  	});

			  	$scope.init($scope.searchFilter);
	      	},
	      	link: function postLink(scope, element) {
				element.on('$destroy', function () {
					scope.$destroy();
				});
	      	}
	    };
  	});
