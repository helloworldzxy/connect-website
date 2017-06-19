var http = require('http'),
	fs = require('fs');

var server = http.createServer(function(req, res){

	console.log('  %s  %s  ', req.method, req.url);

	if('GET' == req.method && '/images' == req.url.substr(0, 7)
	 && '.jpg' == req.url.substr(-4)){ //serve an image
	 	/**
	 	 * 检查文件是否存在
	 	 * 不使用同步的fs.statSync()，否则当处理磁盘文件时会阻塞其他请求的处理。
	 	 * 处理高并发不允许阻塞。
	 	 */
	 	fs.stat(__dirname + req.url, function(err, stat){ 
	 		if( err || !stat.isFile() ){
	 			res.writeHead(404);
	 			res.end('Not Found');
	 			return;
	 		} else{
	 			serve(__dirname + req.url, 'application/jpg');
	 		}
	 	});

	} else if('GET' == req.method && '/' == req.url){ //serve index.html
		serve(__dirname + '/index.html', 'text/html');
	} else{  //display 404
		res.writeHead(200);
		res.end('Not Found');
	}

	function serve(path, type){
	res.writeHead(200, { 'Content-Type': type });

	fs.createReadStream(path).pipe(res);
	/**
	 * 将fs流读出的数据一边写入res中，等同于：
	 */
	// fs.createReadStream(path)
	//   .on('data', function(data){
	//   	res.write(data);
	//   })
	//   .on('end', function(){
	//   	res.end();
	//   });
}

});

server.listen(3000);