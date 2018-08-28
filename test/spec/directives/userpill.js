'use strict';

describe('Directive: userPill', function () {

  // load the directive's module
  beforeEach(module('nimbusEmsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<user-pill></user-pill>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the userPill directive');
  }));
});
