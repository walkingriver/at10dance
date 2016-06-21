'use strict';
angular.module('main')
  .controller('ClassesCtrl', function ($log, $q, $scope, $timeout, ClassService, Messages) {

    $log.log('Hello from your Controller: ClassesCtrl in module main:. This is your controller:', this);

    var vm = this;
    vm.classes = {};
    vm.deleteClass = deleteClass;

    init();

    // Private methods
    function init() {
      $scope.$on(Messages.classesCleared, function () {
        vm.classes = {};
      });
      $scope.$on(Messages.classSaved, function (message, data) {
        vm.classes[data._id] = data;
      });
      $scope.$on(Messages.classDeleted, function (message, id) {
        _.remove(vm.classes, { _id: id });
      });

      refreshClasses();
    }

    function deleteClass(id) {
      $log.log('Deleting class.');

      ClassService.deleteClass(id)
        .catch(function (err) {
          $log.log(err);
        });
    }

    function refreshClasses() {
      ClassService.getAll()
        .then(function (data) {
          vm.classes = {};
          vm.classes = data;
        });
    }
  });
