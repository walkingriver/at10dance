'use strict';
angular.module('main')
  .factory('ClassService', function ($http, $log, $q, uuid, Config, dataManager) {
    $log.log('Hello from your Service: ClassService in module main');

    // Public methods
    var service = {
      getAll: getAll,
      getById: getById,
      deleteClass: deleteClass,
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
      return dataManager.removeItem(id);
    }

    function defaultClass() {
      return $q.when({
        _id: uuid.newguid(),
        name: 'New Class',
        kind: 'class',
        students: []
      });
    }
  });
