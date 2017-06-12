angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


    .state('tabsController.roster', {
    url: '/roster',
      views: {
      'tab1': {
        templateUrl: 'templates/roster.html',
        controller: 'rosterCtrl'
      }
    }
  })

  .state('tabsController.notification', {
    url: '/notification',
    views: {
      'tab2': {
        templateUrl: 'templates/notification.html',
        controller: 'notificationCtrl'
      }
    }
  })

  .state('tabsController.myinfo', {
    url: '/myinfo',
    views: {
      'tab3': {
        templateUrl: 'templates/myinfo.html',
        controller: 'myinfoCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/tabsController',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('crewConnection', {
    url: '/crewConnection',
    templateUrl: 'templates/crewConnection.html',
    controller: 'crewConnectionCtrl'
  })

  .state('flightDetail', {
    url: '/flightDetail',
    templateUrl: 'templates/flightDetail.html',
    controller: 'flightDetailCtrl'
  })

//$urlRouterProvider.otherwise('/tabsController/roster')
$urlRouterProvider.otherwise('/crewConnection')


});
