'use strict';
angular.module('main')
  .controller('StudentCtrl', function ($log, $q, $state, $stateParams, StudentService) {

    $log.log('Hello from your Controller: StudentCtrl in module main:. This is your controller:', this);

    var vm = this;
    vm.studentId = $stateParams.id;
    vm.student = {};
    vm.saveStudent = saveStudent;
    vm.assignedClasses = [];

    init();

    function init() {
      StudentService.getById(vm.studentId)
        .then(function (data) {
          vm.student = data;
          StudentService.getClassesForStudent(vm.student)
            .then(function (data) {
              vm.assignedClasses = data;
            });
        });
    }

    function saveStudent() {
      $log.log('Saving Student.');

      StudentService.save(vm.student)
        .then(function () {
          $state.go('tabsController.students');
        })
        .catch(function (err) {
          $log.log(err);
        });
    }
  });
