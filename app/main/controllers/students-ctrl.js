'use strict';
angular.module('main')
  .controller('StudentsCtrl', function ($log, $q, $state, StudentService) {

    $log.log('Hello from your Controller: StudentsCtrl in module main:. This is your controller:', this);

    var vm = this;

    vm.selectStudent = function (student) {
      $state.go('tabsController.student', { id: student._id });
    };

    vm.showPerson = _.noop;

    StudentService.getAll()
      .then(function (data) {
        $q.defer(vm.students = data);
      });
  });
