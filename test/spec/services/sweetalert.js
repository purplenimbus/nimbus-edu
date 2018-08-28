'use strict';

describe('Service: sweetAlert', function () {

  // load the service's module
  beforeEach(module('nimbusEmsApp'));

  // instantiate service
  var sweetAlert;
  beforeEach(inject(function (_sweetAlert_) {
    sweetAlert = _sweetAlert_;
  }));

  it('should do something', function () {
    expect(!!sweetAlert).toBe(true);
  });

});
