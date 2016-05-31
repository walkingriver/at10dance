'use strict';
angular.module('main')
  .controller('StudentCtrl', function ($log, $stateParams, $q, StudentService) {

    $log.log('Hello from your Controller: StudentCtrl in module main:. This is your controller:', this);

    var vm = this;
    vm.studentId = $stateParams.id;
    vm.student = {};

    init();

    function init() {
      StudentService.getById(vm.studentId)
        .then(function(data) {
          vm.student = data;
        });
    }
  });
