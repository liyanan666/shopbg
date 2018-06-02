let express = require("express");
let app = express();
let router = express.Router();

let user = require("./router/user.js");  //用户接口
let buess = require("./router/buess.js"); //产品接口
let api = require("./router/api.js"); //公共接口
//用户接口
router.get('/user/code',user.getcode);//获取验证码
router.post('/user/login',user.login); //登陆
router.post('/user/registuser',user.regist); //注册
router.post('/user/changeuserinfo',user.changeuserinfo);//更改用户信息
router.post('/user/saveadress',user.saveadress);//保存收货地址
router.post('/user/delateadress',user.delateadress);//删除收货地址
router.post('/user/updateadress',user.updateadress);//更新收货地址
router.post('/user/tobuess',buess.tobuess);//更新收货地址
//公共接口
router.post('/api/qiniutoken',api.qiniutoken);//更新收货地址

module.exports = router;