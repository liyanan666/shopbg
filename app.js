var express = require("express");
var app = express();
var router = require("./router/router.js");
app.use('/', express.static('./'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});             //显示首页
app.listen(3000);