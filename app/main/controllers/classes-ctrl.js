'use strict';
angular.module('main')
  .controller('ClassesCtrl', function ($log, $q, $scope, ClassService) {

    $log.log('Hello from your Controller: ClassesCtrl in module main:. This is your controller:', this);

    var vm = this;
    vm.classes = {};
    vm.deleteClass = deleteClass;

    $scope.$on('classesCleared', function () {
      vm.classes = {};
    });
    $scope.$on('classSaved', function(message, data) {
      vm.classes[data._id] = data;
    });
    $scope.$on('classDeleted', refreshClasses);
    refreshClasses();

    function refreshClasses() {
      ClassService.getAll()
        .then(function (data) {
          vm.classes = {};
          vm.classes = data;
        });
    }

    function deleteClass(id) {
      $log.log('Deleting class.');

      ClassService.deleteClass(id)
        .catch(function (err) {
          $log.log(err);
        });
    }
  });
