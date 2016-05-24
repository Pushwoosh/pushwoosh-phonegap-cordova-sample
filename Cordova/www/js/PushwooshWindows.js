/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// JSON.stringify does not see all properties of notification object
function customStringify(j) {
    var dq = '"';
    var json = "{";
    var last = Object.keys(j).length;
    var count = 0;
    for (x in j) {
        try {
            json += dq + x + dq + ":" + dq + j[x] + dq;
        }
        catch (e) {
            continue;
        }

        count++;
        if (count < last)
            json += ",";
    }
    json += "}";
    return json;
}

function customLog(message) {
    console.debug(message);
    document.getElementById("log").innerHTML += "\n" + message + "\n";
}

function registerPushwooshWindows() {
	var pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");

	//set push notification callback before we initialize the plugin
	document.addEventListener('push-notification', function(event) {
		//get the notification payload
		var notification = event.notification;

		var notificationStr = customStringify(notification);
		customLog("received notification:");
		customLog(notificationStr);
	});

	//initialize the plugin
	pushNotification.onDeviceReady({
	    appid: "4FC89B6D14A655.46488481"
	});

	//register for pushes
	pushNotification.registerDevice(
		function(status) {
		    var deviceToken = status;
		    customLog('registerDevice: ' + deviceToken);
		    onPushwooshWindowsInitialized();
		},
		function(status) {
		    customLog('failed to register : ' + JSON.stringify(status));
		}
	);
}

function onPushwooshWindowsInitialized() {
    
	var pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");

	//if you need push token at a later time you can always get it from Pushwoosh plugin
	pushNotification.getPushToken(
		function(token) {
		    customLog('Push token: ' + token);
		}
	);

	//and HWID if you want to communicate with Pushwoosh API
	pushNotification.getPushwooshHWID(
		function (hwid) {
		    customLog('Pushwoosh HWID: ' + hwid);
		}
	);
}
