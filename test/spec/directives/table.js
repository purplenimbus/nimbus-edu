'use strict';

describe('Directive: table', function () {

  // load the directive's module
  beforeEach(module('nimbusEduApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<table></table>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the table directive');
  }));
});
