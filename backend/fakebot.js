"use strict"
var faker = require('faker');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace'
});

var count = require('minimist')(process.argv.slice(2))._[0];

var random = function(array) {
	var count = array.length;
	var random = Math.random() * count;
	return array[parseInt(random)];
};

var animal_types = ["small", "big"];
var day_types = ["day", "dawn", "night"];
var seasons = ["spring", "summer", "autumn", "winder"];

for (var i = count - 1; i >= 0; i--) {
	var location = {};
	location.lat = parseFloat(faker.Address.latitude());
	location.lon = parseFloat(faker.Address.longitude());

	
	var animal_type = random(animal_types);
	var day_type = random(day_types);
	var season = random(seasons);


	client.index({
		index: "wildmap",
		type: "accidents",
		id: i,
		body: {
			"pin" : {
				"animal_type" : animal_type,
				"day_type" : day_type,
				"season" : season,
				"location" : {
					"lat" : location.lat,
					"lon" : location.lon
				}
			}
		}
	}).then(function (resp) {
		console.log('All done!');
	}, function (err) {
		console.log(err.message);
	});
};