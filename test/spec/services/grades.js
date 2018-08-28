'use strict';

describe('Service: grades', function () {

  // load the service's module
  beforeEach(module('nimbusEmsApp'));

  // instantiate service
  var grades;
  beforeEach(inject(function (_grades_) {
    grades = _grades_;
  }));

  it('should do something', function () {
    expect(!!grades).toBe(true);
  });

});
