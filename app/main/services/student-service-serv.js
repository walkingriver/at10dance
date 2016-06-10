'use strict';
angular.module('main')
  .service('StudentService', function ($http, $log, $q, uuid2, Config) {

    $log.log('Hello from your Service: Student in module main');

    var students = localforage.createInstance({
      name: 'at10-students'
    });

    // Public methods
    this.getAll = getAllStudents;

    this.getById = function (id) {
      $log.log('Requesting class details for student id = ' + id);
      if (id === 'new') {
        return $q.when({
          '_id': uuid2.newguid(),
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
    };

    this.save = function (student) {
      return students.setItem(student._id, student);
    };

    this.deleteStudent = function (id) {
      return students.removeItem(id);
    };

    this.seed = function () {
      return $http.get(Config.ENV.STUDENTS_URL)
        .success(function (data) {
          var promises = _.map(data, function (val) {
            return students.setItem(val._id, val);
          });

          return $q.all(promises);
        });
    };

    // "Private" methods
    function getAllStudents() {
      var deferred = $q.defer();
      var all = [];

      students.iterate(function (value) {
        all.push(value);
      }, function () {
        deferred.resolve(all);
      });

      return deferred.promise;
    }
  });
