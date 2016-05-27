'use strict';
angular.module('main')
  .controller('RosterCtrl', function ($log, $stateParams, $q, ClassService, StudentService) {

    $log.log('Hello from your Controller: RosterCtrl in module main:. This is your controller:', this);

    var vm = this;
    vm.classId = $stateParams.id;
    vm.class = {};
    vm.students = [];
    vm.attendance = [];
    vm.isPresent = isStudentPresent;
    vm.selectStudent = selectStudent;

    init();

    function init() {
      ClassService.getById(vm.classId)
        .then(function (data) {
          // In this case, we need the class info first.
          vm.class = data;
          StudentService.getAll()
            .then(function (data) {
              vm.students = _(data)
                .keyBy('_id')
                .at(vm.class.students)
                .value();
            });
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
