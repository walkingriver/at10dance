'use strict';
angular.module('main')
  .controller('ClassesCtrl', function ($log, $q, ClassService) {

    $log.log('Hello from your Controller: ClassesCtrl in module main:. This is your controller:', this);

    var vm = this;
    vm.deleteClass = deleteClass;

    refreshClasses();

    function refreshClasses() {
      ClassService.getAll()
        .then(function (data) {
          $q.defer(vm.classes = data);
        });
    }

    function deleteClass(id) {
      $log.log('Deleting class.');

      ClassService.deleteClass(id)
        .then(refreshClasses)
        .catch(function (err) {
          $log.log(err);
        });
    }
  });
