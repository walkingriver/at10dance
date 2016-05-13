'use strict';

describe('module: main, controller: MessageCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var MessageCtrl;
  beforeEach(inject(function ($controller) {
    MessageCtrl = $controller('MessageCtrl');
  }));

  it('should do something', function () {
    expect(!!MessageCtrl).toBe(true);
  });

});
