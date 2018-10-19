'use strict';

describe('Directive: coursecard', function () {

  // load the directive's module
  beforeEach(module('nimbusEduApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<coursecard></coursecard>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the coursecard directive');
  }));
});
