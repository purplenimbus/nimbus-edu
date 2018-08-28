'use strict';

describe('Service: import', function () {

  // load the service's module
  beforeEach(module('nimbusEmsApp'));

  // instantiate service
  var import;
  beforeEach(inject(function (_import_) {
    import = _import_;
  }));

  it('should do something', function () {
    expect(!!import).toBe(true);
  });

});
