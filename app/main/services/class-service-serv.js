'use strict';
angular.module('main')
  .service('ClassService', function ($http, $log, $q) {

    $log.log('Hello from your Service: ClassService in module main');

    var classes = [];

    // Public methods
    this.getAll = function () {
      $log.log('Get All Classes.');
      if (classes.length) { return $q.when(classes); }

      return init()
        .then(function () {
          return $q.when(classes);
        });
    };

    // "Private" methods
    function init() {
      return $http.get('/main/assets/data/classes.json')
        .success(function (data) {
          classes = data;
        });
    }
  });
