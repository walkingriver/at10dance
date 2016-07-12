'use strict';
angular.module('main')
  .controller('DebugCtrl', function ($log, $scope, logCollector, dataManager) {
    var vm = this;
    vm.logs = [];

    $log.log('Hello from your Controller: LogCtrl in module main:. This is your controller:', this);

    // $scope.$watch(function () { vm.logs = logCollector.getHistory(false, 100); });

    vm.seedDatabase = dataManager.seedDatabase;
    vm.clearDatabase = dataManager.clearDatabase;
  });
