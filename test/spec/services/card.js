'use strict';

describe('Service: card', function () {

  // load the service's module
  beforeEach(module('nimbusEmsApp'));

  // instantiate service
  var card;
  beforeEach(inject(function (_card_) {
    card = _card_;
  }));

  it('should do something', function () {
    expect(!!card).toBe(true);
  });

});
