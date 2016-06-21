'use strict';

describe('module: main, service: Subscriptions', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Subscriptions;
  beforeEach(inject(function (_Subscriptions_) {
    Subscriptions = _Subscriptions_;
  }));

  it('should do something', function () {
    expect(!!Subscriptions).toBe(true);
  });

});
