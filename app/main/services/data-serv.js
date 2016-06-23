'use strict';
angular.module('main')
  .factory('dataservice', function ($http, $log, $q, Config, Messages, Subscriptions) {

    $log.log('Hello from your Service: Data in module main');

    var primePromise, isPrimed;

    var service = {
      clear: clearDatabase,
      getAllClasses: getAllClasses,
      getAllStudents: getAllStudents,
      getById: getItemById,
      remove: removeItem,
      save: saveItem,
      seed: seedDatabase,
      ready: ready
    };

    var localForage = localforage.createInstance({
      name: 'at10-data'
    });

    return service;

    // Private methods
    function clearDatabase() {
      $log.log('Clearing class database');
      return localForage.clear()
        .then(function () {
          Subscriptions.notify(Messages.classesCleared, {});
        });
    }

    // function getAll(kind) {
    //   $log.debug('Getting all by ' + kind);
    //   var allItems = {};
    //   var deferred = $q.defer();

    //   localForage.iterate(function (value, key, index) {
    //     if (value.kind === kind) {
    //       allItems[key] = value;
    //       $log.debug('Loaded ' + kind + ' record: ', index);
    //     }
    //   }).then(function () {
    //     deferred.resolve(allItems);
    //     $log.debug('Loaded all records.');
    //     return getAllClasses();
    //   }).catch(function (err) {
    //     deferred.reject(err);
    //     $log.error(err);
    //   });

    //   return deferred.promise;
    // }

    function getAll(kind) {
      $log.debug('Getting all by ' + kind);
      var allItems = {};

      return localForage.keys()
        .then(function (keys) {
          var promises = _.map(keys, function (key) {
            return getItemById(key)
              .then(function (val) {
                if (val.kind === kind) {
                  allItems[val._id] = val;
                }
              });
          });
          return $q.all(promises)
            .then(function() {
              return $q.when(allItems);
            });
        });
    }

    function getAllClasses() {
      $log.debug('Retrieving all classes');
      return getAll('class');
    }

    function getAllStudents() {
      $log.debug('Retrieving all students');
      return getAll('student');
    }

    function getItemById(id) {
      $log.log('Requesting item by id = ' + id);
      return localForage.getItem(id);
    }

    function removeItem(id) {
      $log.debug('Deleting item: ', id);
      return localForage.removeItem(id);
    }

    function saveItem(id, item) {
      $log.log('Saving item: ', item);
      return localForage.setItem(id, item);
    }

    function seedDatabase() {
      return $q.all([
        seedClasses(),
        seedStudents()
      ]);
    }

    function seed(kind, source) {
      $log.log('Seeding ' + kind + ' items from ' + source);
      return $http.get(source)
        .success(function (data) {
          var promises = _.map(data, function (val) {
            val.kind = kind;
            return saveItem(val._id, val);
          });
          return $q.all(promises);
        })
        .catch(function (ex) {
          $log.error(ex);
        });
    }

    function seedClasses() {
      return seed('class', Config.ENV.CLASSES_URL);
    }

    function seedStudents() {
      return seed('student', Config.ENV.STUDENTS_URL);
    }

    function prime() {
      // This function can only be called once.
      if (primePromise) {
        return primePromise;
      }

      primePromise = $q.when(true).then(success);

      return primePromise;

      function success() {
        isPrimed = true;
        $log.info('Primed data');
      }
    }

    function ready(nextPromises) {
      var readyPromise = primePromise || prime();

      return readyPromise
        .then(function () { return $q.all(nextPromises); })
        .catch(function (err) { $log.error('"ready" function failed: ', err); });
    }
  });
