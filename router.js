let express = require("express");
let app = express();
let router = express.Router();

let user = require("./router/user.js");  //用户接口
let buess = require("./router/buess.js"); //产品接口
//接口
router.get('/code',user.getcode);//获取验证码
router.post('/login',user.login); //登陆
router.post('/registuser',user.regist); //注册
router.post('/changeuserinfo',user.changeuserinfo);//更改用户信息
router.post('/uploadimg',user.uploadimg);//上传图片
router.post('/saveadress',user.saveadress);//保存收货地址
router.post('/delateadress',user.delateadress);//删除收货地址
router.post('/updateadress',user.updateadress);//更新收货地址
router.post('/tobuess',buess.tobuess);//更新收货地址

module.exports = router;