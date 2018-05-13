let express = require("express");
let app = express();
let cors = require('cors');
// log
var requestLog = require('./middlewares/request_log');
//require('./middlewares/mongoose_log'); // 打印 mongodb 查询日志
//接口
let user = require('./router.js');
// seseion


//静态文件
app.use('/',express.static('./shop'));
app.use("/avatar",express.static("./avatar"));
// 打印log
app.use(requestLog);
//接口
app.use('/user', cors(), user);

var server = app.listen(3000,function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});