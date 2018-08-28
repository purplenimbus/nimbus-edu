'use strict';

describe('Service: format', function () {

  // load the service's module
  beforeEach(module('nimbusEmsApp'));

  // instantiate service
  var format;
  beforeEach(inject(function (_format_) {
    format = _format_;
  }));

  it('should do something', function () {
    expect(!!format).toBe(true);
  });

});
