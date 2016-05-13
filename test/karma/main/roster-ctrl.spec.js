'use strict';

describe('module: main, controller: RosterCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var RosterCtrl;
  beforeEach(inject(function ($controller) {
    RosterCtrl = $controller('RosterCtrl');
  }));

  it('should do something', function () {
    expect(!!RosterCtrl).toBe(true);
  });

});
