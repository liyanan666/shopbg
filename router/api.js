let qiniu = require("qiniu");
let config = require('../config.js');
let formidable = require("formidable");
let path = require("path");

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
