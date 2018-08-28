'use strict';

describe('Directive: usercard', function () {

  // load the directive's module
  beforeEach(module('nimbusEmsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<usercard></usercard>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the usercard directive');
  }));
});
