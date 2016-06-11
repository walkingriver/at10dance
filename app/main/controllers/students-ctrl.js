'use strict';
angular.module('main')
  .controller('StudentsCtrl', function ($log, $q, $scope, $state, StudentService) {

    $log.log('Hello from your Controller: StudentsCtrl in module main:. This is your controller:', this);

    var vm = this;
    vm.deleteStudent = deleteStudent;
    vm.seedStudents = seedStudents;

    $scope.$watch(refreshStudents);
    refreshStudents();

    function refreshStudents() {
      StudentService.getAll()
        .then(function (data) {
          $q.defer(vm.students = data);
        });
    }

    function deleteStudent(id) {
      $log.log('Deleting student.');

      StudentService.deleteStudent(id)
        .then(refreshStudents)
        .catch(function (err) {
          $log.log(err);
        });
    }

    function seedStudents() {
      StudentService.seed()
        .then(refreshStudents);
    }

    vm.selectStudent = function (student) {
      $state.go('tabsController.student', { id: student._id });
    };

    vm.showPerson = _.noop;

  });
