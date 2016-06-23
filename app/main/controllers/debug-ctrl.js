'use strict';
angular.module('main')
  .controller('DebugCtrl', function ($log, $rootScope, $scope, $timeout,
    logCollector, dataservice) {
    var vm = this;
    vm.logs = [];

    $log.log('Hello from your Controller: DebugCtrl in module main:. This is your controller:', this);

    // Public methods
    vm.seed = seed;
    vm.clear = clearAll;

    $timeout(refreshLogs, 5000);

    // Private methods
    function seed() {
      dataservice.seed();
    }

    function refreshLogs() {
      vm.logs = logCollector.getHistory(false, 100);
      $timeout(refreshLogs, 5000);
    }

    function clearAll() {
      return dataservice.clear()
        .then(function () {
          $log.log('Database clear complete.');
        })
        .catch(function (ex) {
          $log.error(ex);
        });
    }
  });
