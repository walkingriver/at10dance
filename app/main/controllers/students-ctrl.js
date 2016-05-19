'use strict';
angular.module('main')
  .controller('StudentsCtrl', function ($log, $q, StudentService) {

    $log.log('Hello from your Controller: StudentsCtrl in module main:. This is your controller:', this);

    var vm = this;
    StudentService.getAll()
      .then(function (data) {
        $q.defer(vm.students = data);
      });
  });
