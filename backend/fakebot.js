var faker = require('faker');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace'
});

var count = require('minimist')(process.argv.slice(2))._[0];

for (var i = count - 1; i >= 0; i--) {
	var name = faker.Name.findName();
	var location = {};
	location.lat = faker.Address.latitude();
	location.lon = faker.Address.longitude();

	client.index({
		index: 'wildmap',
		type: 'accidents',
		id: i,
		body: {
			name: name,
			location: location
		}
	}).then(function (resp) {
		console.log('All done!');
	}, function (err) {
		console.log(err.message);
	});
};