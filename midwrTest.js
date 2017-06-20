var connect = require('connect');

var server = connect.createServer();

/**
 * 1. static中间件：将任意一个URL匹配到文件系统中的任意一个目录（挂载）
 * URL: /my-images ，对应于目录/images
 */
server.use('/my-images', connect.static('/path/to/images'));

//max-Age参数：客户端缓存资源的有效时间，在此时间内都浏览器需要该资源时不用再次请求。
server.use('/js',
 connect.static('/path/to/bundles', { maxAge: 10000000000000}) 
);

//hidden参数：如果为true，则会托管那些文件名以.开始的隐藏文件
server.use('/js', connect.static('/path/to/resources', { hidden: true }));

/**
 * 2. query中间件：获取、解析req.url中的查询字符串部分
 * Express框架中默认启用了query中间件
 */
server.use(connect.query);
server.use(function(req, res){
	// req.query.page == 5;
});

/**
 * 3. logger中间件
 * 提供四种日志格式：default, dev, short, tiny
 */
server.use(connect.logger('dev'));

//也可以像下面这样将不同中间件作为createServer参数使用
//相当于初始化服务器时调用use两次
// var connect = require('connect');
// connect.createServer(
// 	connect.logger('dev'),
// 	function(req, res){
// 		res.writeHead(200);
// 		res.end('Hello world');
// 	}
// ).listen(3000);

//可以自定义日志输出格式
server.use(connect.logger(':method :remote-addr')); //只记录请求方法和IP

//通过动态的req和res记录头信息(都是小写的)
server.use(connect.logger('type is : res[connect-type], length is '
	+ ':res[content-length] and it took : response-time ms.'));

//可以自定义token
connect.logger.token('type', function(req, res){
	return req.headers['content-type']; //给请求的Content-Type定义一个简写的:type token
});

/*
完整的可用token:
:req[header] (如：req[Accept])
:res[header] (如：res[Content-Length])
:http-version
:response-time
:remote-addr
:date
:method
:url
:referrer
:user-agent
:status
 */

/**
 * 4. body parser中间件：相当于使用原生HTTP API搭服务器时使用的qs模块，解析POST请求的消息体
 */
server.use(connect.bodyParser());
server.use(function(req, res){
	// req.body.myinput
});

/**
 * body parser的formidable模块处理单个、多个文件上传 /static目录
 * undefined
 * --> Express
 */

/**
 * cookie parser: 请求头中含有的cookie，
 * 服务端可以通过该中间件进行解析，不用手动解析或使用正则表达式去抽取。
 */
server.use(connect.cookieParser());
// 通过req.cookies访问对应的cookie键值对
server.use(functoin(req, res, next){
	// req.cookies.secret1 == "value";
	// req.cookies.secret2 == "value2";
});

/**
 * 5. sessionTest.js
 */

/**
 * 6. methodOverride中间件。
 * 早期浏览器不支持PUT, DELETE, PATCH
 * 解决方案：在GET或POST请求中添加_method变量
 * POST /url?method=PUT HTTP/1.1
 * 使用中间件的做法：（一般和Express一起用而不是connect）
 */
server.use(connect.methodOverride());

/**
 * 7. basicAuth中间件
 */





