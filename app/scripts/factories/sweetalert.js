'use strict';

/**
 * @ngdoc service
 * @name nimbusEduApp.sweetAlert
 * @description
 * # sweetAlert
 * Factory in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
  .factory('sweetAlert', function ($window) {
    // Service logic
    return {
      alert: function(attrs){
        return $window.swal(attrs);
      },
      button: function(attrs){
        return  {
          text: attrs.text || '',
          value: attrs.value || false,
          visible: true,
          className: attrs.className || 'uk-button uk-button-primary',
          closeModal: true
        };
      }
    };
  });
