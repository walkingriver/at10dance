'use strict';

describe('module: main, controller: StudentCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var StudentCtrl;
  beforeEach(inject(function ($controller) {
    StudentCtrl = $controller('StudentCtrl');
  }));

  it('should do something', function () {
    expect(!!StudentCtrl).toBe(true);
  });

});
