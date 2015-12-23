
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

clean: 
	rm -rf ./platforms
	rm -rf ./plugins

plugins:
	$(CORDOVA) plugin add cordova-plugin-device
	$(CORDOVA) plugin add cordova-plugin-console
	$(CORDOVA) plugin add pushwoosh-cordova-plugin
