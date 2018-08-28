'use strict';

describe('Controller: LearningCtrl', function () {

  // load the controller's module
  beforeEach(module('nimbusEmsApp'));

  var LearningCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LearningCtrl = $controller('LearningCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LearningCtrl.awesomeThings.length).toBe(3);
  });
});
