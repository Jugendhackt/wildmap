"use strict"
L.mapbox.accessToken = 'pk.eyJ1IjoiZ2VvZXh0cmEiLCJhIjoiMmVQS3FFUSJ9.Dy3qUnL_yND8i7_-77t1Gg';
var map = L.mapbox.map('map', 'geoextra.jg8l0ikh')
    .setView([40, -74.50], 9);

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
					title: 'Peregrine Espresso',
					description: '1718 14th St NW, Washington, DC',
					"icon": {
			            "iconUrl": "http://localhost:8888/markericon.png",
			            "iconSize": [50, 50], // size of the icon
			            "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
			            "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
			            "className": "dot"
        			}
				}
			}).addTo(map);
		})
	});
}

update();