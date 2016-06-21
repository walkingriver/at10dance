'use strict';
angular.module('main')
  .controller('StudentsCtrl', function ($log, $q, $rootScope, $scope, $state, Messages, StudentService) {

    $log.log('Hello from your Controller: StudentsCtrl in module main:. This is your controller:', this);

    // Public binadable properties
    var vm = this;
    vm.deleteStudent = deleteStudent;
    vm.selectStudent = selectStudent;
    vm.showPerson = _.noop;

    init();

    // Private methods below
    function init() {
      $log.debug('Initializing StudentsCtrl.');

      // Event listeners
      // Todo - something smarter with each of these
      $log.debug('Setting up Student notification subscribers in StudentsCtrl.');
      $scope.$on(Messages.studentSaved, function (message, data) {
        $log.debug('Received a notification:', message, data);
        refreshStudents();
      });

      $scope.$on(Messages.studentsCleared, function (message, data) {
        $log.debug('Received a notification:', message, data);
        vm.students = [];
      });

      $scope.$on(Messages.studentDeleted, function (message, id) {
        $log.debug('Received a notification:', message, id);
        refreshStudents();
      });

      refreshStudents();
    }

    function refreshStudents() {
      $log.debug('Refreshing Student data.');
      StudentService.getAll()
        .then(function (data) {
          $log.debug('Student data received.');
          vm.students = data;
        });
    }

    function deleteStudent(id) {
      $log.log('Deleting student: ', id);

      StudentService.deleteStudent(id)
        .catch(function (err) {
          $log.error(err);
        });
    }

    function selectStudent(student) {
      $log.debug('Student selected - changing state.');
      $state.go('tabsController.student', { id: student._id });
    }
  });
