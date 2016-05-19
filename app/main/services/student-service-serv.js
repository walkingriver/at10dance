'use strict';
angular.module('main')
  .service('StudentService', function ($http, $log, $q) {

    $log.log('Hello from your Service: Student in module main');

    var students = [];

    // Public methods
    this.getAll = function () {
      $log.log('Get All Students');
      if (students.length) { return $q.when(students); }

      return init()
        .then(function () {
          return $q.when(students);
        });

    };

    // "Private" methods
    function init() {
      return $http.get('/main/assets/data/students.json')
        .success(function (data) {
          students = data;
        });
    }
  });
