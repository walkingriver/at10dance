'use strict';

describe('module: main, controller: StudentsCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var StudentsCtrl;
  beforeEach(inject(function ($controller) {
    StudentsCtrl = $controller('StudentsCtrl');
  }));

  it('should do something', function () {
    expect(!!StudentsCtrl).toBe(true);
  });

});
