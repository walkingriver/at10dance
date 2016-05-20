'use strict';
angular.module('main')
  .controller('ClassesCtrl', function ($log, $q, ClassService) {

    $log.log('Hello from your Controller: ClassesCtrl in module main:. This is your controller:', this);

    var vm = this;
    ClassService.getAll()
      .then(function (data) {
        $q.defer(vm.classes = data);
      });
  });
