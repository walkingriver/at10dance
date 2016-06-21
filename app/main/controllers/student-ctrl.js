'use strict';
angular.module('main')
  .controller('StudentCtrl', function ($log, $q, $rootScope, $state, $stateParams, Messages,
    StudentService, Subscriptions) {

    $log.log('Hello from your Controller: StudentCtrl in module main:. This is your controller:', this);

    var vm = this;
    vm.studentId = $stateParams.id;
    vm.student = {};
    vm.saveStudent = saveStudent;

    init();

    function init() {
      StudentService.getById(vm.studentId)
        .then(function (data) {
          vm.student = data;
        });
    }

    function saveStudent() {
      $log.log('Saving Student: ', vm.student);

      StudentService.save(vm.student)
        .then(function () {
          Subscriptions.notify(Messages.studentSaved, vm.student);
          $state.go('tabsController.students');
        })
        .catch(function (err) {
          $log.log(err);
        });
    }
  });
