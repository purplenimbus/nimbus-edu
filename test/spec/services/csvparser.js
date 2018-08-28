'use strict';

describe('Service: csvParser', function () {

  // load the service's module
  beforeEach(module('nimbusEmsApp'));

  // instantiate service
  var csvParser;
  beforeEach(inject(function (_csvParser_) {
    csvParser = _csvParser_;
  }));

  it('should do something', function () {
    expect(!!csvParser).toBe(true);
  });

});
