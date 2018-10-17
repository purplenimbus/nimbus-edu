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
        //template +=  '          <user-pill user="user" label="user.user_type.name"></user-pill>';
        template +=  '          <span class="uk-text-center">';
        template +=  '          <h4 class="uk-margin-bottom-small">{{ user.firstname | uppercase }} {{ user.lastname | uppercase }} {{ user.othernames | uppercase }}</h4>';
        template +=  '          <p class="uk-text-meta uk-text-uppercase">{{ user.user_type.name }}</p>';
        template +=  '        </span>';        
        template +=  '       </div>';
        template +=  '    </div>';
        template +=  '  </div>';
        template +=  '  <tabs tabs="tabs" class="uk-width-1-1" ng-if="showTabs"></tabs>';
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
        user:'=user',
        showTabs:'=tabs',
        wrapper:'=wrapper',
        showDetails:'=details'
      },
      controller : function($scope,format,card){
        $scope.format = format;
        $scope.tabs = card.userCardTabs($scope.user.user_type.name);
        console.log('usercard scope',$scope);
      },
      restrict: 'E',
      link: function postLink(scope, element) {
        element.on('$destroy', function () {
          scope.$destroy();
        });
      }
    };
  });
