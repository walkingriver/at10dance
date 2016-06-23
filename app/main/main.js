'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'logItDown',
  'ui.router',
  // TODO: load other modules selected during generation
])
  .config(function ($stateProvider, $urlRouterProvider) {

    // ROUTING with ui.router
    $urlRouterProvider.otherwise('/main');
    $stateProvider
      .state('tabsController', {
        url: '/tab',
        templateUrl: 'main/templates/tabsController.html',
        abstract: true,
        // resolve: { DataService: function (dataservice) { return dataservice.ready(); } }
      })

      .state('home', {
        url: '/main',
        templateUrl: 'main/templates/home.html',
        controller: 'HomeCtrl',
        // resolve: { DataService: function (dataservice) { return dataservice.ready(); } }
      })

      .state('tabsController.students', {
        url: '/students',
        views: {
          'tab1': {
            templateUrl: 'main/templates/students.html',
            controller: 'StudentsCtrl',
            controllerAs: 'vm',
            // resolve: { DataService: function (dataservice) { return dataservice.ready(); } }
          }
        }
      })

      .state('tabsController.classes', {
        url: '/classes',
        views: {
          'tab2': {
            templateUrl: 'main/templates/classes.html',
            controller: 'ClassesCtrl',
            controllerAs: 'vm',
            resolve: { ClassService: 'ClassService' }
          }
        }
      })

      .state('tabsController.class', {
        url: '/class/:id',
        views: {
          'tab2': {
            templateUrl: 'main/templates/class.html',
            controller: 'ClassCtrl',
            controllerAs: 'vm',
            resolve: { ClassService: 'ClassService' }
          }
        }
      })

      .state('tabsController.student', {
        url: '/student/:id',
        views: {
          'tab1': {
            templateUrl: 'main/templates/student.html',
            controller: 'StudentCtrl',
            controllerAs: 'vm',
            // resolve: { DataService: function (dataservice) { return dataservice.ready(); } }
          }
        }
      })

      .state('message', {
        url: '/message/:id',
        templateUrl: 'main/templates/message.html',
        controller: 'MessageCtrl',
        // resolve: { DataService: function (dataservice) { return dataservice.ready(); } }
      })

      .state('debug', {
        url: '/debug',
        templateUrl: 'main/templates/debug.html',
        controller: 'DebugCtrl',
        controllerAs: 'vm',
        // resolve: {
        //   DataService: function (dataservice) {
        //     return dataservice.ready();
        //   },
        //   CallerService: 'CallerService',
        //   StudentService: 'StudentService'
        // }
      })

      .state('roster', {
        url: '/roster/:id',
        templateUrl: 'main/templates/roster.html',
        controller: 'RosterCtrl',
        controllerAs: 'vm',
        // resolve: { DataService: function (dataservice) { return dataservice.ready(); } }
      });
  });

