'use strict';
angular.module('main')
.controller('MessageCtrl', function ($log) {

  $log.log('Hello from your Controller: MessageCtrl in module main:. This is your controller:', this);

});
