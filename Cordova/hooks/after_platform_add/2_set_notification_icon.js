#!/usr/bin/env node

var rootdir = process.argv[2];

var ncp = require('ncp').ncp;
var path = require('path');

var src = path.join(rootdir, "config/android/res");
var dst = path.join(rootdir, "platforms/android/res");

ncp(src, dst, function (err) {
	
});
