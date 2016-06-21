'use strict';

describe('module: main, service: Uuid', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Uuid;
  beforeEach(inject(function (_Uuid_) {
    Uuid = _Uuid_;
  }));

  it('should do something', function () {
    expect(!!Uuid).toBe(true);
  });

});
