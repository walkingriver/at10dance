'use strict';

describe('module: main, service: DataManager', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var DataManager;
  beforeEach(inject(function (_DataManager_) {
    DataManager = _DataManager_;
  }));

  it('should do something', function () {
    expect(!!DataManager).toBe(true);
  });

});
