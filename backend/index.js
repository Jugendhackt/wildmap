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
			"filtered" : {
				"query": {
					"match_all": {}
				},
				"filter" : {
		            "bool" : {
		                "must" : {
		                    "term" : { "day_type" : "night" }
		                }
		            }
		        }
	        }
		}
	}
	client.search(query).then(function (resp) {
		console.trace(resp.hits.hits);
		res.send(resp.hits.hits);
	}, function (err) {
		console.trace(err.message);
		res.status(500).end();
	});
});

app.use('/api', router);

var port = process.env.PORT || 8080;
app.listen(port);
console.log("Backend is running on port " + port);