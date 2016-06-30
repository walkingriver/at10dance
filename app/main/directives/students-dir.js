'use strict';
angular.module('main')
  .directive('students', function () {
    return {
      controller: ['$scope', function ($scope) {
        $scope.showUser = function (item) { 
          return !(item.isDeleted); 
        }
      }],
      templateUrl: 'main/templates/students-dir.html',
      restrict: 'E',
      scope: {
        items: '=',
        selected: '=onSelected',
        deleted: '=onDeleted',
        showDelete: '=showDelete',
        showPerson: '=showPerson',
        icon: '=',
        color: '='
      }
    };
  });
