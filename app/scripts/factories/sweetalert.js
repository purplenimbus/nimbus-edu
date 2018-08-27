'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.sweetAlert
 * @description
 * # sweetAlert
 * Factory in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
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
          className: attrs.className || "uk-button uk-button-primary",
          closeModal: true
        };
      }
    };
  });
