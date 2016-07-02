'use strict';
angular.module('main')
  .factory('ClassService', function ($http, $log, $q, uuid, Config, dataManager) {
    $log.log('Hello from your Service: ClassService in module main');

    // Public methods
    var service = {
      getAll: getAll,
      getById: getById,
      deleteClass: deleteClass,
      getClassesForStudent: getClassesForStudent,
      getStudentsForClassId: getStudentsForClassId,
      isStudentAssignedToClass: isStudentAssignedToClass,
      assignStudentToClass: assignStudentToClass,
      removeStudentFromClass: removeStudentFromClass,
      save: save
    };

    return service;

    // Private methods
    function getAll() {
      return dataManager.getClasses();
    }

    function getById(id) {
      $log.log('Requesting class details for class id = ' + id);
      return (id === 'new') ?
        defaultClass() :
        dataManager.getClassDetails(id);
    }

    function save(cls) {
      return dataManager.setItem(cls);
    }

    function deleteClass(id) {
      return dataManager.removeClass(id);
    }

    // Class Roster-related functions
    function isStudentAssignedToClass(cls, student) {
      if (student) {
        var found = _.includes(cls.students, student._id);
        return found;
      }
    }

    function assignStudentToClass(cls, student) {
      cls.students.push(student._id);
    }

    function removeStudentFromClass(cls, student) {
      _.pull(cls.students, student._id);
    }

    function getClassesForStudent(student) {
      return dataManager.getClassesForStudent(student);
    }

    function getStudentsForClassId(id) {
      return dataManager.getStudentsForClassId(id);
      //return dataManager.getStudents();
    }

    // Returns a "new" and "empty" class object.
    function defaultClass() {
      return $q.when({
        _id: uuid.newguid(),
        name: 'New Class',
        kind: 'class',
        students: []
      });
    }
  });
