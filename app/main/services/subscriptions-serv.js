'use strict';
angular.module('main')
.service('Subscriptions', function ($log, $rootScope) {

  $log.log('Hello from your Service: Subscriptions in module main');

  this.notify = notifySubscribers;

  // Private Methods
  function notifySubscribers (message, data) {
    $rootScope.$broadcast(message, data);
  }
});
