var express = require('express');
var app = express();

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace'
});

app.get('/api/accidents', function(req, res){
	client.search({
		index: 'wildmap',
		type: 'accidents',
		body: {
			query: {
				match_all: {}
			}
		}
	}).then(function (resp) {
		console.trace(resp.hits.hits);
		res.send(resp.hits.hits);
	}, function (err) {
		console.trace(err.message);
	});
});

app.listen(8080);