'use strict';

describe('Service: eduApi', function () {

  // load the service's module
  beforeEach(module('nimbusEmsApp'));

  // instantiate service
  var eduApi;
  beforeEach(inject(function (_eduApi_) {
    eduApi = _eduApi_;
  }));

  it('should do something', function () {
    expect(!!eduApi).toBe(true);
  });

});
