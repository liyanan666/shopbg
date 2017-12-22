var express = require("express");
var app = express();

app.all('*', function(req, res, next) {//允许跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});


var router = require("./router/router.js");

app.use('/', express.static('./'));



app.get('/',router.showIndex);//显示首页
app.post('/registuser',router.regist);
app.listen(3000);