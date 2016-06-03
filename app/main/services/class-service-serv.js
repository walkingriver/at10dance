'use strict';
angular.module('main')
  .service('ClassService', function ($http, $log, $q, Config) {

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

    this.getById = function (id) {
      $log.log('Requesting class details for class id = ' + id);

      if (classes.length) { return $q.when(_.find(classes, { '_id': id })); }

      return init()
        .then(function () {
          return $q.when(_.find(classes, { '_id': id }));
        });
    };

    // "Private" methods
    function init() {
      return $http.get(Config.ENV.CLASSES_URL)
        .success(function (data) {
          classes = data;
        });
    }
  });
