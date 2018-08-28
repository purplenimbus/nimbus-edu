'use strict';

describe('Directive: employees', function () {

  // load the directive's module
  beforeEach(module('nimbusEmsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<employees></employees>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the employees directive');
  }));
});
