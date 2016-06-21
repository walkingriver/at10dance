'use strict';

describe('module: main, controller: DebugCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var DebugCtrl;
  beforeEach(inject(function ($controller) {
    DebugCtrl = $controller('DebugCtrl');
  }));

  it('should do something', function () {
    expect(!!DebugCtrl).toBe(true);
  });

});
