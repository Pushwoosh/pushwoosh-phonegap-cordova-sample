import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.initPushwoosh();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onPushwooshInitialized(pushNotification) {

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

  initPushwoosh() {
    var pushNotification = (<any>window).plugins.pushNotification;

    //set push notifications handler
  document.addEventListener('push-notification',
    function(event) {
      var message = (<any>event).notification.message;
      var userData = (<any>event).notification.userdata;

      alert("Push message opened: " + message);
      console.info(JSON.stringify((<any>event).notification));

      //dump custom data to the console if it exists
      if (typeof(userData) != "undefined") {
        console.warn('user data: ' + JSON.stringify(userData));
      }
    }
  );

  document.addEventListener('push-receive',
    function (event) {
        var message = (<any>event).notification.message;
        var userData = (<any>event).notification.userdata;
                              
        alert("Push message received: " + message);
        console.info(JSON.stringify((<any>event).notification));
                              
        //dump custom data to the console if it exists
        if (typeof (userData) != "undefined") {
          console.warn('user data: ' + JSON.stringify(userData));
        }
      }
   );

  //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
  pushNotification.onDeviceReady({
    projectid: "5927F-D517A",
    appid: "5927F-D517A",
    serviceName: ""
  });

  //register for push notifications
  var app = this;
  pushNotification.registerDevice(
    function(status) {
      alert("registered with token: " + status.pushToken);
      app.onPushwooshInitialized(pushNotification);
    },
    function(status) {
      alert("failed to register: " + status);
      console.warn(JSON.stringify(['failed to register ', status]));
    }
  );
}

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
