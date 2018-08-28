'use strict';

describe('Service: emsApi', function () {

  // load the service's module
  beforeEach(module('nimbusEmsApp'));

  // instantiate service
  var emsApi;
  beforeEach(inject(function (_emsApi_) {
    emsApi = _emsApi_;
  }));

  it('should do something', function () {
    expect(!!emsApi).toBe(true);
  });

});
