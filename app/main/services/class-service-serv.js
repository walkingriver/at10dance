'use strict';
angular.module('main')
  .factory('ClassService', function ($http, $log, $q, uuid, Config, dataservice, Messages, Subscriptions) {

    $log.log('Hello from your Service: ClassService in module main');

    var allClasses = null;
    var isLoaded = false;

    // Public methods
    var service = {
      deleteClass: deleteClass,
      getAll: getAllClasses,
      getById: getById,
      save: saveClass
    };

    return service;

    // Private methods
    function deleteClass(id) {
      return dataservice.removeItem(id)
        .then(function () {
          Subscriptions.notify(Messages.classDeleted, id);
          _.remove(allClasses, { _id: id });
        });
    }

    function getAllClasses() {
      if (isLoaded || allClasses) {
        return $q.when(allClasses)
          .then(function (data) {
            allClasses = data;
            isLoaded = true;
          });
      }
      return dataservice.getAllClasses();
    }

    function getById(id) {
      if (id === 'new') {
        return $q.when({
          _id: uuid.newguid(),
          name: 'New Class',
          students: []
        });
      } else if (allClasses[id]) {
        return $q.when(allClasses[id]);
      } else {
        return dataservice.getById(id)
          .then(function (data) {
            allClasses[id] = data;
          });
      }
    }

    function saveClass(cls) {
      return dataservice.saveItem(cls._id, cls)
        .then(function () {
          allClasses[cls._id] = cls;
          Subscriptions.notify(Messages.classSaved, cls);
        });
    }
  });
