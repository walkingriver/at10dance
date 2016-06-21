'use strict';
angular.module('main')
  .service('ClassService', function ($http, $log, $q, uuid, Config, Messages, Subscriptions) {

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

    this.save = saveClass;

    function saveClass (cls) {
      $log.log('Saving class: ', cls);
      return classes.setItem(cls._id, cls)
        .then(function () {
          Subscriptions.notify(Messages.classSaved, cls);
        });
    }

    this.deleteClass = function (id) {
      $log.log('Deleting class: ', id);
      return classes.removeItem(id)
        .then(function () {
          Subscriptions.notify(Messages.classDeleted, id);
        });
    };

    this.seed = function () {
      $log.log('Seeding classes...');
      return $http.get(Config.ENV.CLASSES_URL)
        .success(function (data) {
          var promises = _.map(data, function (val) {
            return saveClass(val);
          });
          return $q.all(promises);
        })
        .catch(function (ex) {
          $log.error(ex);
        });
    };

    this.clear = function () {
      $log.log('Clearing class database');
      return classes.clear()
        .then(function () {
          Subscriptions.notify(Messages.classesCleared, {});
        });
    };

    // "Private" methods
    function getAllClasses() {
      $log.log('Retrieving all classes');

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
