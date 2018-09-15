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
  		body += '<div ng-if="!loading" class="uk-text-center uk-margin-bottom">';
  		body += '<h5 class="uk-text-uppercase uk-logo uk-text-muted">{{title}}</h5>';
  		body += '<div class="chart">';
  		body += '<canvas id="doughnut" chart-options="options" chart-colors="colors" class="chart chart-doughnut" chart-data="datapoints" chart-labels="labels"></canvas>';
  		body += '<span class="uk-logo label">{{data.results.length}}</span>';
  		body += '</div>';
  		body += '</div>';

  		body +=  '<div class="uk-child-width-expand@s" uk-grid ng-if="data.analysis">';
      	body += '  <div ng-repeat="metric in data.analysis" class="uk-text-center">';
        body += '	<p class="uk-text-uppercase uk-text-small uk-margin-remove uk-label">{{metric.key|uppercase}}</p>';
  		body += '	<p class="uk-logo uk-text-small">{{metric.data.length}}</p>';
        body += '  </div>';
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
      controller : function($scope,eduApi,$linq){
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
      			$scope.colors = ['#f7464a', '#1e87f0'];
      			$scope.options = {
      				//animation : false,
      				cutoutPercentage: 80
      			};
      			
      			$scope.data.analysis.forEach(function(value){

      				$scope.labels.push(value.key);

      				$scope.datapoints.push(value.data.length);
      				
      			});

      			$scope.loading = false;

      			console.log('scope analysis '+$scope.title,$scope);

			}).catch(function(error){
				console.log('eduApi error',error);
				$scope.loading = false;
				$scope.error = true;
			});
      	};

      	$scope.init();

      },
      scope : {
      	title : '=title',
      	type  : '=type',
      	data  : '=data'
      },
      restrict: 'E',
      link: function postLink(scope, element) {
        element.on('$destroy',function(){
        	scope.$destroy();
        });
      }
    };
  });
