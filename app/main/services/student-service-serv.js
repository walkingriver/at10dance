'use strict';
angular.module('main')
  .service('StudentService', function ($http, $log, $q, uuid, Config, Subscriptions) {
    $log.log('Hello from your Service: Student in module main');

    var students = localforage.createInstance({
      name: 'at10-students'
    });

    // Public methods
    this.clear = clearStudents;
    this.deleteStudent = deleteStudent;
    this.getAll = getAllStudents;
    this.getById = getById;
    this.save = saveStudent;
    this.seed = seedStudents;

    // "Private" methods
    function clearStudents () {
      $log.log('Clearing student database');
      return students.clear()
        .then(function () {
          Subscriptions.notify('xxx', {});
        });
    }

    function deleteStudent (id) {
      $log.log('Deleting student: ', id);
      return students.removeItem(id)
        .then(function () {
          Subscriptions.notify('studentDeleted', id);
        });
    }

    function getAllStudents() {
      $log.log('Retrieving all students');
      var deferred = $q.defer();
      var all = [];

      students.iterate(function (value) {
        all.push(value);
      }, function () {
        deferred.resolve(all);
      });

      return deferred.promise;
    }

    function getById (id) {
      $log.log('Requesting class details for student id = ' + id);
      if (id === 'new') {
        return $q.when({
          '_id': uuid.newguid(),
          'index': 0,
          'picture': 'http://placehold.it/32x32',
          'age': 0,
          'eyeColor': '',
          'firstname': '',
          'lastname': '',
          'parentFirstName': '',
          'gender': '',
          'email': '',
          'phone': '',
          'name': '',
          'parentName': ''
        });
      }

      return $q.when(students.getItem(id));
    }

    function saveStudent(student) {
      $log.log('Saving student: ', student);
      return students.setItem(student._id, student)
        .then(function () {
          Subscriptions.notify('studentSaved', student);
        });
    }

    function seedStudents () {
      $log.log('Seeding students...');
      return $http.get(Config.ENV.STUDENTS_URL)
        .success(function (data) {
          var promises = _.map(data, function (val) {
            return saveStudent(val);
          });
          return $q.all(promises);
        })
        .catch(function (ex) {
          $log.error(ex);
        });
    }
  });
