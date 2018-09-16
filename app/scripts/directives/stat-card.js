'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:statCard
 * @description
 * # statCard
 */
angular.module('nimbusEduApp')
  .directive('statCard', function (uikit3) {

  	var body = '',
  		template = '',
  		header = '';

  		header += '<div class="uk-clearfix">';
  		header += '	<div class="uk-float-left">';
  		//header += '		<h5 class="uk-text-uppercase uk-logo">{{title}}</h5>';
  		header += '	</div>';
  		header += '	<div class="uk-float-right">';
  		/*header += uikit3.icons([{
  			directive:'ng-click="init()"',
  			icon:'refresh',
  		}]);*/
  		header += '	</div>';
  		header += '</div>';

  		body += '<spinner ng-if="loading"></spinner>';

      body += '<div ng-if="!loading" class="">';
      body += ' <div class="uk-flex-middle uk-grid-small" uk-grid>';
      body += '   <div class="uk-width-auto">';
      body += '     <div class="chart">';
      body += '       <canvas id="doughnut" chart-options="options" chart-colors="colors" class="chart chart-doughnut" chart-data="datapoints" chart-labels="labels"></canvas>';
      body += '       <span class="uk-logo label">{{data.results.length}}</span>';
      body += '     </div>';
      body += '   </div>';
      body += '   <div class="uk-width-expand">';
      body += '     <h5 class="uk-text-uppercase uk-logo uk-text-muted uk-text-center">{{title}}</h5>';
      body += '   </div>';
      body += ' </div>';
      body += '</div>';

  		/*body += '<div ng-if="!loading" class="uk-text-center uk-margin-bottom">';
  		body += '<h5 class="uk-text-uppercase uk-logo uk-text-muted">{{title}}</h5>';
      body += '<div class="chart">';
  		body += '<canvas id="doughnut" chart-options="options" chart-colors="colors" class="chart chart-doughnut" chart-data="datapoints" chart-labels="labels"></canvas>';
  		body += '<span class="uk-logo label">{{data.results.length}}</span>';
  		body += '</div>';
  		body += '</div>';*/

  		body += '<div class="uk-child-width-1-1" uk-grid ng-if="data.analysis && legend">';
      body += '<ul class="uk-list uk-list-divider">';
      body += ' <li ng-repeat="metric in data.analysis" class="uk-clearfix">';
      body += '   <div class="uk-float-left">';
      body += '     <p class="uk-text-uppercase uk-text-small uk-margin-remove uk-label" style="background-color:{{colors[$index]}}">{{metric.key|uppercase}}</p>';
      body += '   </div>';
      body += '   <div class="uk-float-right">';
      body += '     <p class="uk-text-small uk-margin-remove" style="color:{{colors[$index]}}">{{metric.data.length}}</p>';
      body += '   </div>';
      body += ' </li>';
      body += '</ul>';
      //body += '  <div ng-repeat="metric in data.analysis" class="uk-text-center">';
      //body += '	<p class="uk-text-uppercase uk-text-small uk-margin-remove uk-label" style="background-color:{{colors[$index]}}">{{metric.key|uppercase}}</p>';
  		//body += '	<p class="uk-logo uk-text-small" style="color:{{colors[$index]}}">{{metric.data.length}}</p>';
      //body += '  </div>';
  		body += '</div>';

  		template += uikit3.card({
  			header : header,
  			body : body,
  			classes:{
  				header:'uk-padding-remove',
  				body:'uk-padding-remove'
  			}
  		});
  		
      	
    return {
      template: template,
      controller : function($scope,eduApi,$linq,dashboardConst){
      	$scope.init = function(){
      		
      		$scope.loading = true;
      		$scope.error = false;


      		eduApi.api('GET',$scope.data.endpoint).then(function(result){
      			//console.log('eduApi result',result);
      			$scope.data.results = result.data;

      			$scope.data.analysis = $linq.Enumerable()
      										.From($scope.data.results)
      										.GroupBy(
      											$scope.data.grouping[0],
      											$scope.data.grouping[1],
      											$scope.data.grouping[2]
      										)
      										.ToArray();
    			$scope.datapoints = [];
      			$scope.labels = [];
      			$scope.colors = dashboardConst.chart.colors;
      			$scope.options = {
      				//animation : false,
      				cutoutPercentage: 80
      			};
      			
      			$scope.data.analysis.forEach(function(value){

      				$scope.labels.push(value.key);

      				$scope.datapoints.push(value.data.length);
      				
      			});

      			$scope.loading = false;

      			//console.log('scope analysis '+$scope.title,$scope);

			}).catch(function(error){
				console.log('eduApi error',error);
				$scope.loading = false;
				$scope.error = true;
			});
      	};

      	$scope.init();

      	$scope.$on('chart-create', function (event, chart) {
		    $scope.colors = chart.config.options.colors;
		});
      },
      scope : {
      	title : '=title',
      	type  : '=type',
      	data  : '=data',
        legend  : '=legend'
      },
      restrict: 'E',
      link: function postLink(scope, element) {
        element.on('$destroy',function(){
        	scope.$destroy();
        });
      }
    };
  });
