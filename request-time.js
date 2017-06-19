/**
 * 请求时间中间件
 *
 * 选项：
 * 	- 'time'('Number'): 超时阈值（默认100）
 *
 * @param  {Object} options
 * @api public
 */

module.exports = function(opts){
	var time = opts.time || 100;

	// 返回中间件函数
	return function(req, res, next){

		var timer = setTimeout(function(){
			console.log(
				'\033[90m%s %s\033[39m \033[91mis taking too long!\033[39m',
				req.method,
				req.url
			);
		}, time);

		// 这里要确保当响应时间小于阈值时要取消定时器
		var end = res.end; //先保存原来的res.end
		res.end = function(chunk, encoding){ //改写res.end
			res.end = end;
			res.end(chunk, encoding); //先调用原来的res.end
			clearTimeout(timer); //再清除定时器
		};

		//要让其他中间件能够处理请求
		next();
	}
}