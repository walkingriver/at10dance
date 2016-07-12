'use strict';
angular.module('main')
  .controller('StudentsCtrl', function ($log, $q, $scope, $state, StudentService) {
    $log.log('Hello from your Controller: StudentsCtrl in module main:. This is your controller:', this);

    var vm = this;
    vm.deleteStudent = deleteStudent;
    vm.selectStudent = selectStudent;
    vm.toggleDelete = toggleDelete;
    vm.showDelete = false;
    vm.showPerson = _.noop;
    vm.students = [];

    refreshStudents();

    function refreshStudents() {
      StudentService.getAll()
        .then(function (data) {
          vm.students = data;
        });
    }

    function deleteStudent(student) {
      $log.log('Deleting student.');

      StudentService.deleteStudent(student)
        .then(refreshStudents)
        .catch(function (err) {
          $log.log(err);
        });
    }

    function toggleDelete() {
      vm.showDelete = !vm.showDelete;
    }

    function selectStudent(student) {
      $state.go('tabsController.student', { id: student._id });
    }
  });
