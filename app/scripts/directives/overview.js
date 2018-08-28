'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:overview
 * @description
 * # overview
 */
angular.module('nimbusEduApp')
  .directive('overview', function (uikit3) {
  	
  	var template =  '<div class="uk-grid-divider uk-child-width-expand@s" uk-grid>';
      	template += '  <div ng-repeat="(key,metric) in metrics.breakdown">';
        template += '   <h5 class="uk-text-uppercase">{{metric.count}} {{key}}</h5>'
        template += '  </div>';
  		  template += '</div>';

    return {
      template: uikit3.card({
        header:'<h4 class="uk-card-title uk-text-uppercase">overview <span class="uk-text-muted uk-text-small">{{ metrics.term.name }} {{ metrics.term.year }}</span></h4>',
        body:template,
        classes:{
          card:'uk-card-default uk-padding-remove',
          body:'uk-padding-small',
          header : 'uk-padding-small'
        }
      }),
      restrict: 'E',
      controller : function($scope){
        $scope.metrics = {
          term : {
            name : 'first term',
            year : 2018
          },
          breakdown : {
            students : {
              count : 0
            },
            teachers : {
              count : 0
            },
            courses : {
              count : 0
            }
          }
        }
      },
		  link: function postLink(scope, element) {
			   element.on('$destroy', function () {
				  scope.$destroy();
			   });
		  }
    };
  });
