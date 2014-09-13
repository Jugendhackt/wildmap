"use strict"
var express = require('express');
var app = express();

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace'
});

var router = express.Router();

router.get('/accidents', function(req, res) {
	var query = {
		index: 'wildmap',
		type: 'accidents',
		size: 10000,
		body: {
			query: {
				bool: {
					must: [
						{
							match_all: {}
						}
					]
				}
			}
		}
	}

	var animal_type = req.query.animal_type;
	var day_type = req.query.day_type;
	var season =  req.query.season;

	if(animal_type && animal_type!="all"){
		query.body.query.bool.must.push({
											term: {
												"accidents.pin.animal_type": animal_type
											}
										});
	}

	if(day_type && day_type!="all"){
		query.body.query.bool.must.push({
											term: {
												"accidents.pin.day_type": day_type
											}
										});
	}

	if(season && season!="all"){
		query.body.query.bool.must.push({
											term: {
												"accidents.pin.season": season
											}
										});
	}

	console.log(query);
	client.search(query).then(function (resp) {
		console.log(resp.hits.hits);
		var response = resp.hits.hits.map(function(e){
			return e._source.pin;
		})
		res.send(response);
	}, function (err) {
		console.log(err.message);
		res.status(500).end();
	});
});

app.use('/api', router);

var port = process.env.PORT || 8080;
app.listen(port);
console.log("Backend is running on port " + port);