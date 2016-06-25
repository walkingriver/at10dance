'use strict';
angular.module('main')
  .controller('ClassesCtrl', function ($log, $q, $scope, ClassService) {

    $log.log('Hello from your Controller: ClassesCtrl in module main:. This is your controller:', this);

    var vm = this;
    vm.deleteClass = deleteClass;
    vm.seedClasses = seedClasses;

    refreshClasses();

    function refreshClasses() {
      ClassService.getAll()
        .then(function (data) {
          vm.classes = data;
        });
    }

    function deleteClass(id) {
      $log.log('Deleting class.');

      ClassService.deleteClass(id)
        // .then(function () { $scope.$apply(); })
        .catch(function (err) {
          $log.log(err);
        });
    }

    function seedClasses() {
      ClassService.seed();
    }
  });
