let qiniu = require("qiniu");
let config = require('../config.js');
let formidable = require("formidable");

exports.qiniutoken = function(req, res, next){
	var form = new formidable.IncomingForm();
	var accessKey = config.qn_access.accessKey;
    var secretKey = config.qn_access.secretKey;
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
	var options = {
      scope: config.qn_access.bucket,
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);
    
    var qiniuconfig = new qiniu.conf.Config();
	qiniuconfig.zone = qiniu.zone.Zone_z2;
	
	var formUploader = new qiniu.form_up.FormUploader(config);
	var putExtra = new qiniu.form_up.PutExtra();
	var key = Date.parse(new Date()) + "_" + Math.round(Math.random() * 100);
	
	console.log(req);
	/*formUploader.put(uploadToken, key, "hello world", putExtra, function(respErr,respBody,respInfo) {
	  	if (respErr) {
	    throw respErr;
	  	}
	  	if (respInfo.statusCode == 200) {
	    	console.log(respBody);
	  	} else {
	    	console.log(respInfo.statusCode);
	    	console.log(respBody);
	  	}
	});*/
    res.send({
    	"code":0,
    	"token":uploadToken,
    	"domain":config.qn_access.origin
    })
}
