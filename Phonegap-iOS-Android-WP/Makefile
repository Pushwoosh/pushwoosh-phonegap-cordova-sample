
CORDOVA = $(shell which phonegap)
ifeq ($(CORDOVA),)
	CORDOVA = $(shell which cordova)
endif

ifeq ($(CORDOVA),)
	$(error phonegap/cordova is not installed)
endif


.PHONY: all android ios wp8 plugins prepare build clean clean-plugins

all: android ios wp8

wp8: plugins
	-$(CORDOVA) platform add wp8
	$(CORDOVA) build wp8

android: plugins
	-$(CORDOVA) platform add android
	$(CORDOVA) build android

ios: plugins
	-$(CORDOVA) platform add ios
	$(CORDOVA) build ios

prepare:
	$(CORDOVA) prepare

build:
	$(CORDOVA) build

clean: clean-plugins
	rm -rf ./platforms
	rm  -f ./plugins/fetch.json
	rm  -f ./plugins/android.json
	rm  -f ./plugins/ios.json
	rm  -f ./plugins/wp8.json

clean-plugins:
	-$(CORDOVA) plugin rm cordova-plugin-device
	-$(CORDOVA) plugin rm cordova-plugin-console

plugins:
	$(CORDOVA) plugin add cordova-plugin-device
	$(CORDOVA) plugin add cordova-plugin-console
