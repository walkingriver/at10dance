'use strict';
angular.module('main')
  .controller('ClassCtrl', function ($log, $q, $state, $stateParams, ClassService, StudentService) {
    $log.log('Hello from your Controller: ClassCtrl in module main:. This is your controller:', this);

    var vm = this;
    vm.classId = $stateParams.id;
    vm.class = {};
    vm.students = [];
    vm.isAssigned = isStudentAssignedToClass;
    vm.selectStudent = selectStudent;
    vm.saveClass = saveClass;

    init();

    function init() {
      ClassService.getById(vm.classId)
        .then(function (data) {
          $q.defer(vm.class = data);
        });

      StudentService.getAll()
        .then(function (data) {
          $q.defer(vm.students = _.toArray(data));
        });
    }

    function isStudentAssignedToClass(student) {
      return ClassService.isStudentAssignedToClass(vm.class, student);
    }

    function selectStudent(student) {
      $log.log('Student selected: ' + student);

      if (ClassService.isStudentAssignedToClass(vm.class, student)) {
        ClassService.removeStudentFromClass(vm.class, student);
      } else {
        ClassService.assignStudentToClass(vm.class, student);
      }
    }

    function saveClass() {
      $log.log('Saving class.');

      ClassService.save(vm.class)
        .then(function () {
          $state.go('tabsController.classes');
        })
        .catch(function (err) {
          $log.log(err);
        });
    }
  });
