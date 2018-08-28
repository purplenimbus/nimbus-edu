'use strict';

describe('Service: tasksConst', function () {

  // load the service's module
  beforeEach(module('nimbusEmsApp'));

  // instantiate service
  var tasksConst;
  beforeEach(inject(function (_tasksConst_) {
    tasksConst = _tasksConst_;
  }));

  it('should do something', function () {
    expect(!!tasksConst).toBe(true);
  });

});
