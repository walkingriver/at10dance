'use strict';
angular.module('main')
  .controller('DebugCtrl', function ($log, $rootScope, $scope, $timeout,
    logCollector, ClassService, Messages, StudentService, Subscriptions) {
    var vm = this;
    vm.logs = [];

    $log.log('Hello from your Controller: DebugCtrl in module main:. This is your controller:', this);

    // Public methods
    vm.seedClasses = seedClasses;
    vm.seedStudents = seedStudents;
    vm.clear = clearAll;

    $timeout(refreshLogs, 5000);

    // Private methods
    function seedClasses() {
      ClassService.seed()
        .then(function () {
          Subscriptions.notify(Messages.classSaved, {});
        });
    }

    function seedStudents() {
      StudentService.seed()
        .then(function () {
          Subscriptions.notify(Messages.studentSaved, {});
        });
    }

    function refreshLogs() {
      vm.logs = logCollector.getHistory(false, 100);
      $timeout(refreshLogs, 5000);
    }

    function clearAll() {
      return StudentService.clear()
        .then(ClassService.clear)
        .then(function () {
          $log.log('Database clear complete.');
        })
        .catch(function (ex) {
          $log.error(ex);
        });
    }
  });
