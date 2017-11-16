// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

function onPushwooshInitialized(pushNotification) {

  //if you need push token at a later time you can always get it from Pushwoosh plugin
  pushNotification.getPushToken(
    function(token) {
      console.info('push token: ' + token);
    }
  );

  //and HWID if you want to communicate with Pushwoosh API
  pushNotification.getPushwooshHWID(
    function(token) {
      console.info('Pushwoosh HWID: ' + token);
    }
  );

  //settings tags
  pushNotification.setTags({
      tagName: "tagValue",
      intTagName: 10
    },
    function(status) {
      console.info('setTags success: ' + JSON.stringify(status));
    },
    function(status) {
      console.warn('setTags failed');
    }
  );

  pushNotification.getTags(
    function(status) {
      console.info('getTags success: ' + JSON.stringify(status));
    },
    function(status) {
      console.warn('getTags failed');
    }
  );

  //start geo tracking.
  //pushNotification.startLocationTracking();
}

function initPushwoosh() {
  var pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");

  //set push notifications handler
  document.addEventListener('push-notification',
    function(event) {
      var message = event.notification.message;
      var userData = event.notification.userdata;

      alert("Push message opened: " + message);
      console.info(JSON.stringify(event.notification));

      //dump custom data to the console if it exists
      if (typeof(userData) != "undefined") {
        console.warn('user data: ' + JSON.stringify(userData));
      }
    }
  );

  document.addEventListener('push-receive',
    function (event) {
        var message = event.notification.message;
        var userData = event.notification.userdata;
                              
        alert("Push message received: " + message);
        console.info(JSON.stringify(event.notification));
                              
        //dump custom data to the console if it exists
        if (typeof (userData) != "undefined") {
          console.warn('user data: ' + JSON.stringify(userData));
        }
      }
   );

  //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
  pushNotification.onDeviceReady({
    projectid: "60756016005",
    appid: "4FC89B6D14A655.46488481",
    serviceName: ""
  });

  //register for push notifications
  pushNotification.registerDevice(
    function(status) {
      alert("registered with token: " + status.pushToken);
      onPushwooshInitialized(pushNotification);
    },
    function(status) {
      alert("failed to register: " + status);
      console.warn(JSON.stringify(['failed to register ', status]));
    }
  );
}

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    initPushwoosh();
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
