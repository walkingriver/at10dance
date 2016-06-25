'use strict';
angular.module('main')
  .factory('dataManager', function ($http, $log, $q, Config) {
    $log.log('Hello from your dataManager in module main');

    var pool = { 'class': {}, 'student': {} };
    var db;
    var service = {
      getClasses: getClasses,
      getStudents: getStudents,
      getClassDetails: getClassDetails,
      getStudentDetails: getStudentDetails,
      setItem: setItem,
      removeItem: removeItem,

      // Debug functions
      seedDatabase: seedDatabase,
      clearDatabase: clearDatabase
    };

    init();
    return service;

    // Private methods
    function init() {
      db = localforage.createInstance({
        name: 'at10-data'
      });
    }

    // Loads all Classes from the database if necessary,
    // returning the local instance where possible.
    function getClasses() {
      return getCollection('class');
    }

    // Loads all Classes from the database if necessary,
    // returning the local instance where possible.
    function getStudents() {
      return getCollection('student');
    }

    // Actual implementation to load a collection of "things",
    // returning the local instance where possible.
    function getCollection(kind) {
      // If there are items loaded already, just return them.
      if (_.keys(pool[kind]).length) {
        return $q.when(pool[kind]);
      }

      // Otherwise, we need to go get them.
      // Start by grabbing all of the keys in the database,
      // and passing that list of keys to the function to read each one.
      return db.keys()
        .then(readAllFromDb)
        .catch(function (err) {
          $log.error('Error loading keys from DB: ', err);
        });

      // Private method to read a list of objects from the database.
      function readAllFromDb(keys) {
        var promises = _.map(keys, function (key) {
          return loadItem(key)
            .then(function (val) {
              getInstance(val._id, val);
            }).catch(function (err) {
              $log.error('Error reading all items from DB: ', err);
            });
        });

        return $q.all(promises)
          .then(function () {
            return $q.when(pool[kind]);
          }).catch(function (err) {
            $log.error('Error with the $q.all in DB: ', err);
          });
      }
    }

    // Gets (or sets) and returns a specific instance of a given item by its ID.
    function getInstance(id, data) {
      var item = pool[data.kind][id];

      if (item) {
        angular.extend(item, data);
      } else {
        item = data;
        pool[data.kind][id] = data;
      }

      return item;
    }

    function getClassDetails(id) {
      return getById('class', id);
    }

    function getStudentDetails(id) {
      return getById('student', id);
    }

    // Fetches an object from the local pool or the DB by its.
    // Returns a promise.
    function getById(kind, id) {
      var item = pool[kind][id];

      if (item) {
        return $q.when(angular.copy(item));
      }

      return loadItem(id)
        .then(function (item) {
          return angular.copy(item);
        });
    }

    // Loads an item from the DB by its ID, and adds it to the pool.
    function loadItem(id) {
      var kind, item;
      return db.getItem(id)
        .then(function (val) {
          val.kind = val.kind || 'class'; // This is to fix some classes without a kind property.
          kind = val.kind;
          item = val;
          return $q.when(getInstance(val._id, val));
        }).catch(function (err) {
          $log.error('Error loading (' + kind + ') item (' + id + ') from DB: ', item, err);
        });
    }

    function setItem(item) {
      var itemToUpdate = pool[item.kind][item._id];

      // If we are saving an existing item, it should be in our object pool.
      if (itemToUpdate) {
        angular.extend(itemToUpdate, item);
      } else {
        // If not, it's probably a new item. We need to add it to our pool
        // and then we can save it.
        itemToUpdate = getInstance(item._id, item);
      }

      // Regardless of how we got here, we want to save it.
      // Remember, that setItem returns a promise.
      return db.setItem(itemToUpdate._id, itemToUpdate);
    }

    function removeItem(id) {
      return db.removeItem(id)
        .then(function () {
          // Remove it from the appropriate pool
          delete pool.class[id];
          delete pool.student[id];
        });
    }

    // Debugging functionality
    // Seeds the database with sample class and stsudent values.
    function seedDatabase() {
      return $http.get(Config.ENV.CLASSES_URL)
        .success(function (data) {
          var promises = _.map(data, function (val) {
            val.kind = 'class';

            // We want to call setItem, because it ensures the value
            // get sent to the internal pool as well as the database.
            return setItem(val);
          });

          return $q.all(promises);
        });
    }

    // Clears the database so we can start over.
    function clearDatabase() {
      return db.clear()
        .then(function () {
          _.remove(pool.class, _.constant(true));
          _.remove(pool.student, _.constant(true));
        });
    }
  });
