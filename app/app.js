'use strict';
/**
 * @ngdoc overview
 * @name toblah
 * @description
 * # toblah
 *
 * Main module of the application.
 */
angular
  .module('toblah', [
    'ui.router',
    'ui.bootstrap'
  ])
  .config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise('/main/todo');

    $stateProvider
      .state('main', {
        url:'/main',
        templateUrl: 'views/main.html',
        abstract: true
      })
      .state('main.todo',{
        url:'/todo',
        templateUrl:'views/todo.html'
      })
      .state('main.tobuy',{
          url:'/tobuy',
          templateUrl:'views/tobuy.html'
      })
      .state('main.tovisit',{
          url:'/tovisit',
          templateUrl:'views/tovisit.html'
      })
      .state('main.toeat',{
          url:'/toeat',
          templateUrl:'views/toeat.html'
      })
      .state('main.tolearn',{
          url:'/tolearn',
          templateUrl:'views/tolearn.html'
      })
      .state('main.toread',{
          url:'/toread',
          templateUrl:'views/toread.html'
      })
      .state('main.tosee',{
          url:'/tosee',
          templateUrl:'views/tosee.html'
      })
  }])
  .run(['APP_CONSTANTS', function(APP_CONSTANTS) {
        var toblahs =  {
                todo: [
                    {"type": "todo", "what": "Add tests", "complete": false},
                    {"type": "todo", "what": "Add filter", "complete": false}
                ],
                tobuy: [],
                tolearn: [],
                tovisit: [],
                tosee: [],
                toread: [],
                toeat: []
        };
        localStorage.setItem(APP_CONSTANTS.storage.id, JSON.stringify(toblahs));
  }]);

    
