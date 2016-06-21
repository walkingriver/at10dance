'use strict';
angular.module('main')
  .service('ClassService', function ($http, $log, $q, uuid, Config) {

    $log.log('Hello from your Service: ClassService in module main');

    var classes = localforage.createInstance({
      name: 'at10-classes'
    });

    // Public methods
    this.getAll = getAllClasses;

    this.getById = function (id) {
      $log.log('Requesting class details for class id = ' + id);
      if (id === 'new') {
        return $q.when({
          _id: uuid.newguid(),
          name: 'New Class',
          students: []
        });
      }

      return $q.when(classes.getItem(id));
    };

    this.save = function (cls) {
      return classes.setItem(cls._id, cls);
    };

    this.deleteClass = function (id) {
      return classes.removeItem(id);
    };

    this.seed = function () {
      return $http.get(Config.ENV.CLASSES_URL)
        .success(function (data) {
          var promises = _.map(data, function (val) {
            return classes.setItem(val._id, val);
          });

          return $q.all(promises);
        });
    };

    this.clear = function () {
      return classes.clear();
    };

    // "Private" methods
    function getAllClasses() {
      var deferred = $q.defer();
      var allClasses = {};

      classes.iterate(function (value, key) {
        allClasses[key] = value;
      }, function () {
        deferred.resolve(allClasses);
      });

      return deferred.promise;
    }
  });
