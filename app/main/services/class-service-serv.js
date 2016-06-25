'use strict';
angular.module('main')
  .factory('ClassService', function ($http, $log, $q, uuid, Config, dataManager) {
    $log.log('Hello from your Service: ClassService in module main');

    var service = {
      // Public methods
      getAll: getAll,
      getById: getById,
      deleteClass: deleteClass,
      save: save
    };

    return service;

    function getAll() {
      return dataManager.getClasses();
    }

    function getById (id) {
      $log.log('Requesting class details for class id = ' + id);
      if (id === 'new') {
        return $q.when({
          _id: uuid.newguid(),
          name: 'New Class',
          kind: 'class',
          students: []
        });
      }

      return dataManager.getItem(id);
    }

    function save (cls) {
      return dataManager.setItem(cls);
    }

    function deleteClass (id) {
      return dataManager.removeItem(id);
    }
  });
