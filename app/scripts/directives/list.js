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
		table += 	'	<div class="uk-margin-bottom"ng-if="source.showCountFilter">';
		//table += 			uikit3.button({cls:'uk-button-default',label:'filters'});
		table += 	'		<search-filter filter="countFilter"></search-filter>';
		table += 	'	</div>';

		table += 	'	<div class="uk-margin-bottom" ng-repeat="filter in source.filters" ng-if-"filter">';
		//table += 			uikit3.button({cls:'uk-button-default',label:'filters'});
		table += 	'		<search-filter filter="filter"></search-filter>';
		table += 	'	</div>';

		table += 	'	<div class="uk-button-group uk-margin-bottom" ng-if="source.type === \'table\'">';
		table += 			uikit3.buttonDropDown({cls:'uk-button-default',label:'show/hide columns <span uk-icon="icon:  triangle-down"></span>',scope:'source.columns'});
		table += 	'	</div>';
		table += 	'	<div class="" ng-if="source.display.length > 1 && source.display">';
		table += 	'		<div class="uk-button-group">';
		table += 				uikit3.button({icon:'{{d.icon}}',directive:'ng-repeat="d in source.display" ng-click="showDisplay(d)" ng-class="d.name === source.type ? \'uk-button-primary\' : \'uk-button-default\'"' , cls : ' '});
		table += 	'		</div>';
		table += 	'	</div>';
		table += 	'	<div class="">';
		table += 			uikit3.inputIcon({icon:'search',directive:'ng-model="search.$"',cls:'uk-input'});
		table += 	'	</div>';
		table += '	</form>';
		table += '	<div class="uk-float-right">';

		table += '	</div>';
		table += '</div>';

		table += '	<spinner ng-if="loading"></spinner>';

		table += ' <div class="uk-placeholder uk-text-center" ng-if="!loading && !list.data.data.length">couldnt find any {{ name }}</div>';

		table += '	<div ng-repeat="d in source.display" bind-html-compile="d.template"></div>';

		table += '<pagination ng-if="list.data.data.length" from="list.data.from" to="list.data.to" current="list.data.current_page" last="list.data.last_page" total="list.data.total" type="source.type"></pagination>';

	    return {
	      	template: table,
	      	restrict: 'E',
		  	scope: {
			  	source:'=source',
			  	name:'=name',
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
		  		$scope.selected = false;
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
			  		})
			  		.catch(function(error){
						console.log('eduApi '+$scope.source.type+' error',error);
						$scope.loading = false;
						return false;
					});
			  	};

			  	var countFilterOptions = apiConst.filterCount;

			  	$scope.countFilter = {
                	type : 'select',
                	label : 'Filter by Class',
                	name : 'paginate',
                	options : countFilterOptions,
                	default : countFilterOptions[1]
                };

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

			  	$scope.showDisplay = function(display){
			  		$scope.source.type = display.name;
			  	};

			  	$scope.$on('pagination',function(e,payload){

			  		$scope.searchFilter = Object.assign({}, $scope.searchFilter, payload);

			  		$scope.init($scope.searchFilter);
			  		
			  	});

			  	$scope.$on('searchFilter',function(e,payload){
			  		
			  		$scope.searchFilter = Object.assign({}, $scope.searchFilter, payload );
			  		$scope.searchFilter.page = 1;
			  		$scope.init($scope.searchFilter);

			  	});

			  	if($scope.source){
			  		$scope.init($scope.searchFilter);
			  	}
			  	
	      	},
	      	link: function postLink(scope, element) {
				element.on('$destroy', function () {
					scope.$destroy();
				});
	      	}
	    };
  	});
