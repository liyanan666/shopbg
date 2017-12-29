var express = require("express");
var app = express();
var router = require("./router/router.js");

var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    next();
});
//静态文件
app.use('/',express.static('./shop'));
app.use("/avatar",express.static("./avatar"));
//接口
app.get('/code',router.getcode);//获取验证码
app.post('/login',router.login); //登陆
app.post('/registuser',router.regist); //注册
app.post('/changeuserinfo',router.changeuserinfo);//更改用户信息
app.post('/uploadimg',router.uploadimg);//上传图片


var server = app.listen(3000,function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});