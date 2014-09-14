"use strict"
L.mapbox.accessToken = 'pk.eyJ1IjoiZ2VvZXh0cmEiLCJhIjoiMmVQS3FFUSJ9.Dy3qUnL_yND8i7_-77t1Gg';
var map = L.mapbox.map('map', 'geoextra.jg8l0ikh')
    .setView([51.329, 10.454], 6);

var animal_type = "all";
var day_type = "all";
var season = "all";

var markers = [];

var update = function(){

	for (var i = 0; i < markers.length; i++) {
		map.removeLayer(markers[i]);
	};

	$.getJSON('/api/accidents?animal_type=' + animal_type + '&day_type=' + day_type + '&season=' + season, function(accidents){

		accidents.forEach(function(accident){
			var marker = L.mapbox.featureLayer({
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [
						accident.location.lat,
						accident.location.lon
					]
				},
				properties: {
					title: 'Wildunfall',
					description: 'Wild: ' + accident.animal_type + ' Tageszeit: ' + accident.day_type + ' Jahreszeit: ' + accident.season,
					'marker-size': 'large',
					'marker-color': '#266A2E',
					'marker-symbol': 'cross'
				}
			})
			marker.addTo(map);
			markers.push(marker);
		})
	});
}

$( "#animal_type" ).change(function() {
	animal_type = $('#animal_type').val();
	update();
});

$( "#day_type" ).change(function() {
	day_type = $('#day_type').val();
	update();
});

$( "#season" ).change(function() {
	season = $('#season').val();
	update();
});

update();