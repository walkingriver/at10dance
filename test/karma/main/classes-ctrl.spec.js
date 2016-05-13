'use strict';

describe('module: main, controller: ClassesCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var ClassesCtrl;
  beforeEach(inject(function ($controller) {
    ClassesCtrl = $controller('ClassesCtrl');
  }));

  it('should do something', function () {
    expect(!!ClassesCtrl).toBe(true);
  });

});
