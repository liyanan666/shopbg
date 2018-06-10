let qiniu = require("qiniu");
let config = require('../config.js');
let formidable = require("formidable");
let path = require("path");
var https = require('https');
var qs = require('querystring');
var wechat = require('wechat');

exports.qiniutoken = function(req, res, next){
	var form = new formidable.IncomingForm();
	var accessKey = config.qn_access.accessKey;
    var secretKey = config.qn_access.secretKey;
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
	var options = {
      scope: config.qn_access.bucket,
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);  //生成token
    
    res.send({
    	"code":0,
    	"token":uploadToken,
    	"domain":config.qn_access.origin
	})
}

exports.sendmsg = function(req, res, next){
	// 修改为您的apikey.可在官网（https://www.yunpian.com)登录后获取
	var rand = parseInt(Math.random() * 9000 + 1000);
	
	var apikey = config.yp_access.apiley;
	// 修改为您要发送的手机号码，多个号码用逗号隔开
	var mobile = '17839945350';
	// 指定发送的模板编号
	var tpl_id = 2325226;
	
	var text = '【泽保网络科技】您的验证码是'+rand+'';
	// 指定发送模板的内容
	var tpl_value =  {'#code#':rand,'#company#':'泽保网络科技'};
	// 查询账户信息https地址
	var get_user_info_uri = '/v2/user/get.json';
	// 智能匹配模板发送https地址
	var sms_host = 'sms.yunpian.com';
	
	send_sms_uri = '/v2/sms/single_send.json';
	// 指定模板发送接口https地址
	send_tpl_sms_uri = '/v2/sms/tpl_single_send.json';

	
	send_sms(send_sms_uri,apikey,mobile,text);
	

	
	function send_sms(uri,apikey,mobile,text){
	    var post_data = {  
	    'apikey': apikey,  
	    'mobile':mobile,
	    'text':text,
	    };//这是需要提交的数据  
	    var content = qs.stringify(post_data);  
	    post(uri,content,sms_host);
	}
	
	function send_tpl_sms(uri,apikey,mobile,tpl_id,tpl_value){
	    var post_data = {  
	    'apikey': apikey,
	    'mobile':mobile,
	    'tpl_id':tpl_id,
	    'tpl_value':qs.stringify(tpl_value),  
	    };//这是需要提交的数据  
	    var content = qs.stringify(post_data);  
	    post(uri,content,sms_host); 
	}
	function post(uri,content,host){
	    var options = {  
	        hostname: host,
	        port: 443,  
	        path: uri,  
	        method: 'POST',  
	        headers: {  
	            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
	        }  
	    };
	    var req = https.request(options, function (res) {  
	        res.setEncoding('utf8');  
	        res.on('data', function (chunk) { 
	        	
	            console.log('BODY: ' + chunk);  
	        });  
	    }); 
	    //console.log(content);
	    req.write(content);  
	
	    req.end();   
	}
}

var configs = {
 	appID: "wx2e8f977800a3c2b8",  
	encodingAESKey:"j5lJpndcuoRLs1JMrPLEe7GV52ASMHdcvWDw7fehPny",
	token: "wechat",
 	checkSignature: true 
};

exports.wechats = wechat(configs, function (req, res, next) {
// 微信输入信s息都在req.weixin上
//var message = req.weixin;

	res.reply('Hello world!');

}) 	 	
