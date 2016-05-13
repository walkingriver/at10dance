'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main');
  $stateProvider
    .state('tabsController', {
      url: '/page1',
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
        controller: 'StudentsCtrl'
      }
    }
  })

  .state('tabsController.classes', {
    url: '/classes',
    views: {
      'tab2': {
        templateUrl: 'main/templates/classes.html',
        controller: 'ClassesCtrl'
      }
    }
  })

  .state('tabsController.class', {
    url: '/class/:id',
    views: {
      'tab2': {
        templateUrl: 'main/templates/class.html',
        controller: 'ClassCtrl'
      }
    }
  })

  .state('tabsController.student', {
    url: '/student/:id',
    views: {
      'tab1': {
        templateUrl: 'main/templates/student.html',
        controller: 'StudentCtrl'
      }
    }
  })

  .state('message', {
    url: '/message/:id',
    templateUrl: 'main/templates/message.html',
    controller: 'MessageCtrl'
  })

  .state('roster', {
    url: '/roster/:id',
    templateUrl: 'main/templates/roster.html',
    controller: 'RosterCtrl'
  });
});
