var connect = require('connect'),
	users = require('./users'), //JSON文件可以直接被引入，不需要使用module.exports来暴露资源
	session = require('express-session'),
	RedisStore = require('connect-redis')(session);

var server = connect(
	connect.logger('dev'),
	connect.bodyParser(),
	connect.cookieParser(), //session是通过cookie实现的
	// connect.session({ secret: 'my app secret' }), //初始化session中间件需要提供secret选项
	//使用Redis持久化session
	connect.session({ store: new RedisStore, secret: 'my secret' }),
	//先检测用户是否登录，如果没有登录则交给其他中间件
	function(req, res, next){
		if('/' == req.url && req.session.logged_in){
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(
				'Welcome back, <b>' + req.session.name + '</b>. '
				+ '<a href="/logout">Logout</a>'
			);
		}else{
			next();
		}
	},
	//展示登录表单
	function(req, res, next){
		if('/' == req.url && 'GET' == req.method){
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end([
				'<form action="/login" method="POST">',
					'<fieldset>',
						'<legend>Please log in</legend>',
						'<p>User: <input type="text" name="user"></p>',
						'<p>Password: <input type="password" name="password"></p>',
						'<button>Submit</button>',
					'</fieldset>',
				'</form>'
			].join(''));
		} else {
			next();
		}
	},
	//检查登录表单的信息是否与用户凭证匹配，匹配则认为登录成功
	function(req, res, next){
		if('/login' == req.url && 'POST' == req.method){
			res.writeHead(200);
			if(!users[req.body.user] || req.body.password != users[req.body.user].password){
				res.end('Bad username/password');
			} else {
				req.session.logged_in = true;
				req.session.name = users[req.body.user].name;
				res.end('Authenticated!');
			} 
		} else {
			next();
		}
	},
	//处理登出
	function(req, res, next){
		if('/logout' == req.url){
			req.session.logged_in = false;
			res.writeHead(200);
			res.end('Logged out!');
		} else {
			next();
		}
	}
);

server.listen(3000);