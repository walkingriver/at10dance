'use strict';

describe('module: main, service: Class-service', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var ClassService;
  beforeEach(inject(function (_ClassService_) {
    ClassService = _ClassService_;
  }));

  it('should do something', function () {
    expect(!!ClassService).toBe(true);
  });

});
