'use strict';

describe('Directive: tasks', function () {

  // load the directive's module
  beforeEach(module('nimbusEmsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<tasks></tasks>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tasks directive');
  }));
});
