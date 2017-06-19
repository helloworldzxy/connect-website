var connect = require('connect');

var server = connect.createServer();

/**
 * 使用use()添加中间件。中间件就是一个函数，返回一个函数。
 */

/**
 * 托管静态文件到/website目录下
 */
server.use(connect.static(__dirname + '/website'));

server.listen(3000);