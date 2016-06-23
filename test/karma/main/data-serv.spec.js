'use strict';

describe('module: main, service: Data', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Data;
  beforeEach(inject(function (_Data_) {
    Data = _Data_;
  }));

  it('should do something', function () {
    expect(!!Data).toBe(true);
  });

});
