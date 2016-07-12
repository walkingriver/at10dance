'use strict';
angular.module('main')
  .factory('dataManager', function ($http, $log, $q, Config) {
    $log.log('Hello from your dataManager in module main');

    // Having the separate references is for convenience in referring to them.
    var classes = [];
    var students = [];
    var pool = { 'class': classes, 'student': students };

    var db;

    // Public interface
    var service = {
      getClasses: getClasses,
      getStudents: getStudents,
      getClassDetails: getClassDetails,
      getClassesForStudent: getClassesForStudent,
      getStudentDetails: getStudentDetails,
      getStudentsForClassId: getStudentsForClassId,
      setItem: setItem,
      removeClass: removeClass,
      removeStudent: removeStudent,

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
      if (classes.length) {
        return $q.when(classes);
      }

      return getCollection('class');
    }

    // Loads all Classes from the database if necessary,
    // returning the local instance where possible.
    function getStudents() {
      if (students.length) {
        return $q.when(students);
      }

      return getCollection('student');
    }

    // Actual implementation to load a collection of "things",
    // returning the local instance where possible.
    function getCollection(kind) {
      // Start by grabbing all of the keys in the database,
      // and passing that list of keys to the function to read each one.
      return db.keys()
        .then(function (keys) {
          var promises = _.map(keys, function (key) {
            return loadItem(key)
              .then(function (val) {
                poolReference(val._id, val);
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
        }).catch(function (err) {
          $log.error('Error loading keys from DB: ', err);
        });
    }

    // Loads an item from the DB by its ID, and adds it to the pool.
    function loadItem(id) {
      var kind, item;
      return db.getItem(id)
        .then(function (val) {
          if (val) {
            kind = val.kind;
            item = val;
            return $q.when(poolReference(val._id, val));
          } else {
            return $q.when(null);
          }
        }).catch(function (err) {
          $log.error('Error loading (' + kind + ') item (' + id + ') from DB: ', item, err);
        });
    }

    // Returns a specific instance of a given item by its ID, adding it to the pool if necessary.
    function poolReference(id, data) {
      var item = _.find(pool[data.kind], { _id: id });

      if (item) {
        angular.extend(item, data);
      } else {
        item = data;
        pool[data.kind].push(data);
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
      var item = _.find(pool[kind], { _id: id });

      if (item) {
        return $q.when(angular.copy(item));
      }

      return loadItem(id)
        .then(function (item) {
          return angular.copy(item);
        });
    }

    function setItem(item) {
      var itemToUpdate = _.find(pool[item.kind], { _id: item.id });

      // If we are saving an existing item, it should be in our object pool.
      if (itemToUpdate) {
        angular.extend(itemToUpdate, item);
      } else {
        // If not, it's probably a new item. We need to add it to our pool
        // and then we can save it.
        itemToUpdate = poolReference(item._id, item);
      }

      // Regardless of how we got here, we want to save it.
      // Remember, that setItem returns a promise.
      return db.setItem(itemToUpdate._id, itemToUpdate);
    }

    function removeClass(cls) {
      return db.removeItem(cls._id)
        .then(function () {
          _.remove(classes, { _id: cls._id });
        });
    }

    function removeStudent(student) {
      return db.removeItem(student._id)
        .then(function () {
          _.remove(students, { _id: student._id });
        });
    }

    function getClassesForStudent(student) {
      return getClasses()
        .then(function () {
          return _.filter(classes, function (item) {
            return _.includes(item.students, student._id);
          });
        });
    }

    function getStudentsForClassId(id) {
      return getById('class', id)
        .then(function (cls) {
          return $q.all(_.map(cls.students, function (item) {
            return getStudentDetails(item);
          }));
        });
    }

    // Debugging functionality /////////////////////////////////////////////////
    //
    // Seeds the database with sample class and stsudent values.
    function seedDatabase() {
      return $q.all([
        seedItems('class', Config.ENV.CLASSES_URL),
        seedItems('student', Config.ENV.STUDENTS_URL)
      ]);
    }

    // Seeds the database with values from a given file.
    function seedItems(kind, url) {
      return $http.get(url)
        .success(function (data) {
          var promises = _.map(data, function (val) {
            val.kind = kind;

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
          // Upon success, remove the objects from our pool.
          // Note, this needs to keep the pool references intact for the other controllers.
          _.remove(classes, _.constant(true));
          _.remove(students, _.constant(true));
        });
    }
  });
