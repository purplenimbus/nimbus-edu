'use strict';

describe('Service: dashboardConst', function () {

  // load the service's module
  beforeEach(module('nimbusEduApp'));

  // instantiate service
  var dashboardConst;
  beforeEach(inject(function (_dashboardConst_) {
    dashboardConst = _dashboardConst_;
  }));

  it('should do something', function () {
    expect(!!dashboardConst).toBe(true);
  });

});
