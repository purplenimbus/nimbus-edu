'use strict';

describe('Service: eduApiConst', function () {

  // load the service's module
  beforeEach(module('nimbusEmsApp'));

  // instantiate service
  var eduApiConst;
  beforeEach(inject(function (_eduApiConst_) {
    eduApiConst = _eduApiConst_;
  }));

  it('should do something', function () {
    expect(!!eduApiConst).toBe(true);
  });

});
