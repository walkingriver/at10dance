'use strict';
angular.module('main')
  .factory('StudentService', function ($http, $log, $q, uuid, Config, dataManager) {
    $log.log('Hello from your Service: Student in module main');

    // Public methods
    var service = {
      getAll: getAll,
      getById: getById,
      deleteStudent: deleteStudent,
      save: save
    };

    return service;

    // Private methods
    function getAll() {
      return dataManager.getStudents();
    }

    function getById(id) {
      $log.log('Requesting class details for student id = ' + id);
      return (id === 'new') ?
        defaultStudent() :
        dataManager.getStudentDetails(id);
    }

    function save(student) {
      return dataManager.setItem(student);
    }

    function deleteStudent(id) {
      return dataManager.removeItem(id);
    }

    function defaultStudent() {
      return $q.when({
        '_id': uuid.newguid(),
        'index': 0,
        'picture': 'http://placehold.it/32x32',
        'age': 0,
        gender: '',
        email: '',
        phone: '',
        name: '',
        parentName: '',
        kind: 'student'
      });
    }
  });
