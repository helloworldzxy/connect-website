var connect = require('connect'),
	formidable = require('formidable'),
	util = require('util');

var server = connect(
	connect.bodyParser(),
	connect.static('static'),
	function(req, res, next){
		if('POST' == req.method){
			console.log(req);

			//https://github.com/senchalabs/connect#middleware
			//The body-parser module only handles JSON and urlencoded form submissions, 
			//not multipart (which would be the case if you're uploading files).
			// console.log(req.body); //{}
			// console.log(req.body.file); //undefined

			var form = new formidable.IncomingForm();
			form.parse(req, function(err, fields, files) {
				console.log(req.body); //{}
				console.log(req.body.file); //undefined
				console.log(req.files); //{}

		      res.writeHead(200, {'content-type': 'text/plain'});
		      res.write('received upload:\n\n');
		      res.end(util.inspect({fields: fields, files: files}));
		      // res.end('end~~~');
		    });


		}else{
			next();
		}
	}
);

server.listen(3000);