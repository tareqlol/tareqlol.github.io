'use strict';

var App = angular.module('carouselApp',[]);


// App Level Config
App.factory('appConfig',function() {
	return {
		GIPHY : {
			HOST : 'http://api.giphy.com',
			APIKEY : 'dc6zaTOxFJmzC',
			RANDOMPATH : '/v1/gifs/random',
			SEARCHPATH : '/v1/gifs/search',
			LIMIT: 10
		}
	}
})