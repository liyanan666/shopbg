let express = require("express");
let app = express();
let cors = require('cors');

// seseion
let cookieParser = require('cookie-parser');
let session = require('express-session');
app.use(cookieParser('12345'));
app.use(session({
    secret: '12345',
    name: 'testapp',  //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000 }, //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: false,
}));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

// log
let requestLog = require('./middlewares/request_log');
//require('./middlewares/mongoose_log'); // 打印 mongodb 查询日志
//接口
let router = require('./router.js');

let config = require('./config.js');
let utils = require('./common/utils.js')

// 打印log
app.use(requestLog);
//接口
app.use('/', router);

//app.use('/wechat',utils.sign(config));

//静态文件
app.use('/shop',express.static('./shop'));
app.use("/avatar",express.static("./avatar"));


var wechat = require('wechat');
var configs = {
	token: "wechat",
  	appID: "wx2e8f977800a3c2b8",  
    encodingAESKey:"j5lJpndcuoRLs1JMrPLEe7GV52ASMHdcvWDw7fehPny",
    checkSignature: true
    
};
 
app.use(express.query());
app.use('/wechat', wechat(configs.token, wechat.text(function (message, req, res, next){
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  if (message.FromUserName === 'diaosi') {
    // 回复屌丝(普通回复)
    res.reply('hehe');
  } else{
    //你也可以这样回复text类型的信息
    res.reply({
      content: '你好啊',
      type: 'text'
    });
  }
})));


var server = app.listen(8080,function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});