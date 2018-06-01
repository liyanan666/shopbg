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
    
    /*var qiniuconfig = new qiniu.conf.Config();
	qiniuconfig.zone = qiniu.zone.Zone_z2; //配置上传到哪个区域
	
	var formUploader = new qiniu.form_up.FormUploader(config);
	var putExtra = new qiniu.form_up.PutExtra();
	
	
	form.uploadDir = path.normalize(__dirname + "/../avatar");
	
	form.parse(req, function (err, fields, files) {
		let extName = '';  //后缀名
        switch (files.file.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
		var key = Date.parse(new Date()) + "_" + Math.round(Math.random() * 100);
		console.log(files.file.path);
		formUploader.put(uploadToken, key, files.file.path, putExtra, function(respErr,respBody,respInfo) {
		  	if (respErr) {
		    	throw respErr;
		  	}
		  	if (respInfo.statusCode == 200) {
		    	res.send({
			    	"code":0,
			    	"data":respBody
			    })
		  	} else {
		    	console.log(respInfo.statusCode);
		    	console.log(respBody);
		  	}
		});	   
		
	})*/
	
}
