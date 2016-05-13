'use strict';

describe('module: main, controller: ClassCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var ClassCtrl;
  beforeEach(inject(function ($controller) {
    ClassCtrl = $controller('ClassCtrl');
  }));

  it('should do something', function () {
    expect(!!ClassCtrl).toBe(true);
  });

});
