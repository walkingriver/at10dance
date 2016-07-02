'use strict';
angular.module('main')
  .controller('RosterCtrl', function ($log, $stateParams, $q, $scope, classDetail, classRoster, ClassService) {

    $log.log('Hello from your Controller: RosterCtrl in module main:. This is your controller:', this);

    var vm = this;
    vm.classId = $stateParams.id;
    vm.class = classDetail;
    vm.students = classRoster;
    vm.attendance = [];
    vm.isPresent = isStudentPresent;
    vm.selectStudent = selectStudent;

    init();

    function init() {
      refreshStudents();
      $scope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
          refreshStudents();
        });
    }

    function refreshStudents() {
      ClassService.getStudentsForClassId(vm.classId)
        .then(function (data) {
          vm.students = data;
        });
    }

    function isStudentPresent(student) {
      if (student) {
        var found = _.includes(vm.attendance, student._id);
        return found;
      }
    }

    function markPresent(student) {
      vm.attendance.push(student._id);
    }

    function markAbsent(student) {
      _.pull(vm.attendance, student._id);
    }

    function selectStudent(student) {
      $log.log('Student selected: ' + student);

      if (isStudentPresent(student)) {
        markAbsent(student);
      } else {
        markPresent(student);
      }
    }
  });
