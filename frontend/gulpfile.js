var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('default', function () {
	connect.server(
		{root:'src',
			port:8888,
			middleware:function(){
				return [ (function () {
					var url = require('url');
					var proxy = require('proxy-middleware');
					var options = url.parse('http://localhost:8080/api');
					options.route = '/api';
					return proxy(options);
				})(), function (req, res, next) {
					next();
				}];
			}
		}
	);
})