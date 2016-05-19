'use strict';

describe('module: main, service: StudentService', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var StudentService;
  beforeEach(inject(function (_StudentService_) {
    StudentService = _StudentService_;
  }));

  it('should do something', function () {
    expect(!!StudentService).toBe(true);
  });

});
