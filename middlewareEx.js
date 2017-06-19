/**
 * 使用中间件可以将应用拆分为更小单元：
 * 1. 记录请求处理时间
 * 2. 托管静态文件
 * 3. 处理授权
 * 中间件由函数组成，处理req,res对象，接收next函数做流控制。
 */
var connect = require('connect');

var server = connect.createServer();

server.use(function(req, res, next){
	console.error('  %s  %s  ', req.method, req.url);
	next();
});

// 下面三个中间件，只会走其中一个
// 
server.use(function(req, res, next){
	if('GET' == req.method && '/images' == req.url.substr(0, 7)){
		//托管图片
	}else{
		//交给其他中间件处理
		next();
	}
});

server.use(function(req, res, next){
	if('GET' == req.method && '/' == req.url ){
		//响应index文件
	}else{
		//交给其他中间件处理
		next();
	}
});

server.use(function(req, res, next){
	// 最后一个中间件，404
	res.writeHead(404);
	res.end('Not Found');
});

// 日志记录
server.use(connect.logger('dev'));

server.listen(3000);