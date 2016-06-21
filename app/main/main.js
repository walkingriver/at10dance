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
        abstract: true
      })

      .state('home', {
        url: '/main',
        templateUrl: 'main/templates/home.html',
        controller: 'HomeCtrl'
      })

      .state('tabsController.students', {
        url: '/students',
        views: {
          'tab1': {
            templateUrl: 'main/templates/students.html',
            controller: 'StudentsCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('tabsController.classes', {
        url: '/classes',
        views: {
          'tab2': {
            templateUrl: 'main/templates/classes.html',
            controller: 'ClassesCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('tabsController.class', {
        url: '/class/:id',
        views: {
          'tab2': {
            templateUrl: 'main/templates/class.html',
            controller: 'ClassCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('tabsController.student', {
        url: '/student/:id',
        views: {
          'tab1': {
            templateUrl: 'main/templates/student.html',
            controller: 'StudentCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('message', {
        url: '/message/:id',
        templateUrl: 'main/templates/message.html',
        controller: 'MessageCtrl'
      })

      .state('debug', {
        url: '/debug',
        templateUrl: 'main/templates/debug.html',
        controller: 'DebugCtrl',
        controllerAs: 'vm'
      })

      .state('roster', {
        url: '/roster/:id',
        templateUrl: 'main/templates/roster.html',
        controller: 'RosterCtrl',
        controllerAs: 'vm'
      });
  });

