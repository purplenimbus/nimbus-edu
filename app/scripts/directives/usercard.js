'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:usercard
 * @description
 * # usercard
 */
angular.module('nimbusEduApp')
  .directive('usercard', function (uikit3) {

    var template =   '<user-pill ng-if="!showDetails" user="user" name="showDetails ? true : false" label="user.user_type.name"></user-pill>';
        template +=  '<div ng-if="showDetails">';
        template +=  '  <div class="uk-card-media-top bg-gradient">';
        template +=  '    <div class="uk-inline uk-height-small uk-width-1-1">';
        template +=  '       <div class="uk-overlay uk-light uk-position-bottom uk-padding-small">';
        template +=  '          <span class="uk-text-center">';
        template +=  '          <h4 class="uk-margin-bottom-small uk-text-capitalize">{{ user.firstname | uppercase }} {{ user.lastname | uppercase }} {{ user.othernames | uppercase }}</h4>';
        template +=  '          <p class="uk-text-meta uk-text-uppercase">{{ user.user_type.name }}</p>';
        template +=  '        </span>';        
        template +=  '       </div>';
        template +=  '    </div>';
        template +=  '  </div>';
        template +=  '  <my-courses ng-if="user.user_type.name === \'student\'" list="true" id="user.id" heading="false"></my-courses>';
        template +=  '  <instructor-courses ng-if="user.user_type.name === \'teacher\'" list="true" id="user.id" user="user" heading="false"></instructor-courses>';
        template +=  '</div>';

    return {
      template: uikit3.card({
      		body:template,
      		classes:{
      			body:'uk-width-1-1 uk-padding-remove',
            card:'uk-card-default',
            directive:'ng-class="showDetails ? \'uk-padding-remove\' : \'uk-padding-small\'"'
      		}
      }),
      scope : {
        user:'=data',
        showTabs:'=tabs',
        wrapper:'=wrapper',
        showDetails:'=details'
      },
      controller : function($scope,format,card){
        $scope.format = format;

        console.log('usercard scope',$scope);

        $scope.tabs = card.userCardTabs($scope.user.user_type.name);
        
      },
      restrict: 'E',
      link: function postLink(scope, element) {
        element.on('$destroy', function () {
          scope.$destroy();
        });
      }
    };
  });
