'use strict';
angular.module('main')
  .controller('StudentsCtrl', function ($log, $q, $rootScope, $scope, $state, StudentService) {

    $log.log('Hello from your Controller: StudentsCtrl in module main:. This is your controller:', this);

    // Public binadable properties
    var vm = this;
    vm.deleteStudent = deleteStudent;
    vm.selectStudent = selectStudent;
    vm.showPerson = _.noop;

    refreshStudents();

    // Private methods below
    function refreshStudents() {
      StudentService.getAll()
        .then(function (data) {
          vm.students = data;
        });
    }

    function deleteStudent(id) {
      $log.log('Deleting student.');

      StudentService.deleteStudent(id)
        .catch(function (err) {
          $log.log(err);
        });
    }

    function selectStudent(student) {
      $state.go('tabsController.student', { id: student._id });
    }

    // Event listeners
    // Todo - something smarter with each of these
    $scope.$on('studentSaved', refreshStudents);

    $scope.$on('xxx', function () {
      vm.students = [];
    });

    $scope.$on('studentDeleted', refreshStudents);
  });
