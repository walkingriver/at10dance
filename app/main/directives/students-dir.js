'use strict';
angular.module('main')
.directive('students', function () {
  return {
    templateUrl: 'main/templates/students-dir.html',
    restrict: 'E',
    scope: {
      items: '=',
      selected: '=onSelected',
      showPerson: '=showPerson',
      icon: '=',
      color: '='
    }
  };
});
