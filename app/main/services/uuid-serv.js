'use strict';
angular.module('main')
  .service('uuid', function ($log) {

    $log.log('Hello from your Service: Uuid in module main');

    this.newguid = guid;

    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }

      var result = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();

      $log.debug('New guid result = ' + result);
      return result;
    }
  });
