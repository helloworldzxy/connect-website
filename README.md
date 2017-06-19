# connect-website
《了不起的Node.js》 chap-is 8 example

1. server without connect

2. use connect

将index.html和images文件夹移到/website目录下。

3. middleware example

使用中间件改写noConnectServer.js

4. write a middleware

middleware: request-time.js

test: sample.js

5. connect built-in middlwares

midwrTest.js

body parser中的文件上传功能没实现

6. session

user.json

sessionTest.js

7. redis session

关闭窗口，或者重启浏览器，session没有丢失。但是如果重启服务器进程，session就会丢失（再打开localhost:3000不再显示welcome back）：session默认存储于内存，进程退出后内存数据就会丢失。

使用Redis持久化session：

- 安装Redis.
参考文章[1](http://www.jianshu.com/p/af33284aa57a), [2](https://my.oschina.net/jackieyeah/blog/524583)

- Redis启动命令：`$ /usr/local/bin redis-server /usr/local/etc redis.conf`
- 启动后新开窗口：
    `$ cd /usr/local/bin`

    `$ ./redis-cli`

通过`set`, `get`设置和读取缓存数据。

注意：

1）在写检测登录，session中间件得在展示表单等中间件函数前引入。

2）connect-redis包需要使用express-session包。而不是connect。（可能又是和body parser的上传功能一样，从connect独立出来的部分，学到Express框架再验证。）

```javascript
var session = require('express-session'),
    RedisStore = require('connect-redis')(session);
```

使用Redis持久化session后，重启服务器进程会话状态仍然保存（但是得是同一个浏览器，比如原来用Chrome登录，重启服务器进程后，重启Chrome可以重现session状态，但是再打开新的浏览器比如Safari就不行），毕竟session是依赖cookie的。
