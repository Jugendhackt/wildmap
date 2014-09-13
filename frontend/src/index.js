"use strict"
L.mapbox.accessToken = 'pk.eyJ1IjoiZ2VvZXh0cmEiLCJhIjoiMmVQS3FFUSJ9.Dy3qUnL_yND8i7_-77t1Gg';
var map = L.mapbox.map('map', 'geoextra.jg8l0ikh')
    .setView([51.329, 10.454], 6);

var update = function(){
	$.getJSON("/api/accidents", function(accidents){
		accidents.forEach(function(accident){
			L.mapbox.featureLayer({
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
					description: 'accident',
					"icon": {
			            "iconUrl": "http://localhost:8888/markericon.png",
			            "iconSize": [50, 50],
			            "iconAnchor": [25, 25],
			            "popupAnchor": [0, -25],
			            "className": "dot"
        			}
				}
			}).addTo(map);
		})
	});
}

update();