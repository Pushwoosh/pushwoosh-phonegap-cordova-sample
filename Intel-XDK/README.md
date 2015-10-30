Blank Intel XDK and Apache Cordova Project
==========================================

See [LICENSE.md](<LICENSE.md>) for license terms and conditions.

Project File Information
------------------------

The `icon.png` and `screenshot.png` files are not required by your project. They
are included for use by the Intel XDK template/demo panel and have no use within
a real app. You can safely delete them from your project directory.

The `cordova.js` script is needed to provide your app with access to Cordova
APIs. To add Cordova APIs to your application you must add the corresponding
Cordova plugins. See the *Plugins* section on the **Projects** tab.

Project Details
---------------

Use this project as a starting point for an Intel XDK or Apache Cordova hybrid
mobile app. One key file (`init-dev.js`) contains the initialization code needed
to handle Intel XDK device ready, Cordova device ready or browser document ready
init events in a way that allows you to run your app in any of these
environments. This init code works:

-   with the the Intel XDK Emulate tab

-   in the Intel XDK App Preview application (Test tab)

-   in the App Preview Crosswalk container (Debug tab)

-   with the weinre debug script (Test tab)

-   in an app built using the Intel XDK legacy container (aka AppMobi container)

-   in an app built using the standard Apache Cordova container (aka Cordova
    CLI)

When `init-dev.js` completes execution it issues a custom "`app.Ready`" event.
Use this event to start your application, rather than waiting on "device ready"
or "document ready" or "window load" or similar events. You should not have to
modify anything in `init-dev.js` to use this code. Also, `init-dev.js` has been
written so that it is not dependent on any external libraries or specific
webviews. It has been tested with the following webviews and browsers:

-   Android 2.3, 4.0-4.3, 4.4 and 5.x

-   iOS 6, 7 and 8

-   Windows 8 Phone

-   Windows 8

-   Crosswalk

-   Chrome Desktop Browser

-   Internet Explorer 10 and 11

This blank project works well for converting an existing web app into a hybrid
app. One of the biggest issues encountered when porting a web app to a hybrid
app is resolving the init sequence of the web app with the init sequence
required of a hybrid HTML5 app. This gets especially difficult when large
third-party libraries are part of the app. Due to the additional burden of
initializing the underlying native code layer, developers sometimes have trouble
getting their code that runs in a desktop browser to initialize in an HTML5
hybrid webview. Frequently this is due to the significant difference in
resources between the desktop browser and the mobile webview (e.g., less memory,
lower performance and a reduced feature set).

There are many comments in the files in this project. Please read those comments
for details and further documentation. In particular, see the comments in the
`index.html` file for recommendations on how to load your third-party libraries
relative to your application code and the special Cordova library.

There are a large number of `console.log()` messages contained within
`init-dev.js`. They can be used to debug initialization problems and understand
how the file works. It is highly recommended that you leave those
`console.log()` messages in that file, they will not unduly slow down or burden
your application. Set `dev.LOG = true` to enable the `console.log()` messages in
`init-dev.js` and set it to false for release code, it is normally set to false.

BTW: the "`dev`” prefix refers to "device" in this context, not "develop,"
because it grew out of a desire to build a more reliable and flexible "device
ready" detector.
