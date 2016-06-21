'use strict';
angular.module('main')
  .controller('DebugCtrl', function ($log, $rootScope, $scope, logCollector, ClassService, StudentService) {
    var vm = this;
    vm.logs = [];

    $log.log('Hello from your Controller: LogCtrl in module main:. This is your controller:', this);

    $scope.$watch(function () { vm.logs = logCollector.getHistory(false, 100); });
    vm.seedStudents = StudentService.seed;
    vm.seedClasses = ClassService.seed;
    vm.clear = function () {
      return StudentService.clear()
        .then(ClassService.clear)
        .then($log.log('Database clear complete.'))
        .catch(function (ex) {
          $log.error(ex);
        });
    };
  });
