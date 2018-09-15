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
  		body += '<div ng-if="!loading" class="uk-text-center">';
  		body += '<h5 class="uk-text-uppercase uk-logo">{{title}}</h5>';
  		//body += '<canvas id="doughnut" class="chart chart-doughnut" chart-data="data" chart-labels="labels"></canvas>';
  		body += '<span class="uk-logo">{{data.results.length}}</span>';
  		body += '</div>';

  		body +=  '<div class="uk-grid-divider uk-child-width-expand@s" uk-grid ng-if="data.analysis">';
      	body += '  <div ng-repeat="metric in data.analysis" class="uk-text-center">';
        body += '	<h5 class="uk-text-uppercase uk-text-small">{{classes[metric.course_grade_id-1].name|uppercase}}</h5>';
  		body += '	<span class="uk-logo">{{metric.data.length}}</span>';
        body += '  </div>';
  		body += '</div>';

  		template += uikit3.card({
  			header : header,
  			body : body,
  			classes:{
  				header:'uk-padding-remove'
  			}
  		});
  		
      	
    return {
      template: template,
      controller : function($scope,eduApi,$linq,courseService){
      	$scope.init = function(){
      		
      		$scope.loading = true;
      		$scope.error = false;
      		$scope.classes = courseService.getClasses();

      		eduApi.api('GET',$scope.data.endpoint).then(function(result){
      			console.log('eduApi result',result);
      			$scope.data.results = result.data;

      			$scope.data.analysis = $scope.group($scope.type,$scope.data.results);

      			$scope.loading = false;

      			console.log('scope analysis '+$scope.title,$scope.data);

			}).catch(function(error){
				console.log('eduApi error',error);
				$scope.loading = false;
				$scope.error = true;
			});
      	};

      	$scope.group = function(type,data){
      		var group = [];

      		switch(type){
      			case 'students' : 
      				group = $linq.Enumerable().From(data)
					.GroupBy(
						function(x){
							return x.meta.course_grade_id;
						},
						null,
						function(key,grouping){ 
							return {
								course_grade_id : parseInt(key),
								data : grouping.source
							};
						})
					.ToArray();
					break;
				case 'registrations' : 
      				group = $linq.Enumerable().From(data)
					.GroupBy(
						function(x){
							return x.user_id;
						},
						null,
						function(key,grouping){ 
							//console.log('GroupBy result '+type,key,grouping);
							return {user_id:key,registrations:grouping.source}; 
						}
					)
					.ToArray();
					break;
      			case 'teachers' : break;
      			//default : break;
      		}

      		return group;
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
