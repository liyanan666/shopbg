let express = require("express");
let app = express();

let formidable = require("formidable");
let captchapng = require('captchapng2');
let path = require("path");
let fs = require("fs");

let User = require("../db/user.js");
let Userdata = User.User;
let md5 = require("../middlewares/md5.js");
let jwt = require('jsonwebtoken'); //token生成

let comontutils = require("../common/utils.js");  //公共方法

exports.getcode = function (req, res, next) {  //获取验证码
    let rand = parseInt(Math.random() * 9000 + 1000);
    req.session.code = rand;
    let png = new captchapng(80, 30, rand);
    res.writeHead(200, { 'Content-Type': 'image/png'});
    res.end(png.getBuffer());
};



exports.regist = function (req, res, next) { //注册
    var Res = res;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var code = fields.code;
        //得到表单之后做的事情
        if(checkcode(req,res,code)){
            var username = fields.username;
            //MD5加密
            var password = fields.password;
            password = md5(md5(password).substr(4,6) + md5(password));
            var school = fields.school;
            Userdata.find({'username' : username}, function(err, res){
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    if(res.length == 0){
                        var user = new Userdata({
                            username : username,                 //用户账号
                            password: password,                            //密码
                            school:school,//学校
                            isbuess:0,
                        });
                        user.save(function (err, res) { //保存

                            if (err) {
                                comontutils.resData(Res,-1,'保存失败','');
                            }
                            else {
                                comontutils.resData(Res,0,'保存成功','');
                            }

                        });
                    }else{
                        comontutils.resData(Res,-1,'用户名已存在','');
                    }
                }
            });
        }else{
            comontutils.resData(Res,-1,'验证码错误','');
        }
        
    });
};

exports.login = function (req, res, next) {  //登陆
    var Res = res;
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        var username = fields.username;
        var password = fields.password;
        password = md5(md5(password).substr(4,6) + md5(password));

        Userdata.find({'username' : username}, function(err, res){

            if (err) {
                console.log("Error:" + err);
            }
            else {
                if(res.length == 0){
                    comontutils.comontutils.resData(Res,-1,"未注册");
                }else if(password == res[0].password){
                	var token = jwt.sign({ data: res[0]._id,exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12)	 }, 'secret');
                	
                	console.log(token);
//                  req.session.username = res[0].username;
                    res[0].password = '';
                    
                    Res.send({
				        "code":0,
				        "info":res[0],
				        "token":token
				    });
                }else if(password != res[0].password){
                    comontutils.comontutils.resData(Res,-1,"用户名或密码不正确","");
                }
            }
        });
    });
};


exports.changeuserinfo = function (req, res, next){
    var Res = res;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var _id = fields.id;
        Userdata.findByIdAndUpdate(_id,JSON.parse(fields.userinfo), function(err, res){

            Userdata.find({'_id' : _id}, function(err, res){
                if (err) {
                	throw err;
                }
                else {
                    if(res.length == 0){
                    	comontutils.resData(Res,-1,'网络错误','');
                        return;
                    }
                    res[0].password = '';
                    comontutils.resData(Res,0,'success',res[0]);
                }
            });
        });

    });
};

exports.saveadress = function (req, res, next) {
    var Res = res;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var _id = fields.id;

        Userdata.update({ "_id" : _id}, { $push : { adressval: JSON.parse(fields.adressval)}},function(err,res){
            if (err) {
                console.log("Error:" + err);
            }
            else {
                Userdata.find({'_id' : _id}, function(err, res){

                    if (err) {
                        console.log("Error:" + err);
                    }
                    else {
                        if(res.length == 0){
                        	comontutils.resData(Res,-1,'网络错误','');
                          
                            return;
                        }
                        res[0].password = '';
                        comontutils.resData(Res,0,'保存成功',res[0]);
                    }
                });
            }
        });
    });
}


exports.delateadress = function (req, res, next) {
    var Res = res;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var _id = fields.id;
        var arrayid = fields.arrayid;

        Userdata.update({ "_id" : _id}, { $pull : { adressval: {_id:arrayid}}},function(err,res){
            if (err) {
                console.log("Error:" + err);
            }
            else {
                Userdata.find({'_id' : _id}, function(err, res){

                    if (err) {
                        console.log("Error:" + err);
                    }
                    else {
                        if(res.length == 0){
                        	comontutils.resData(Res,-1,'网络错误','');
                            return;
                        }
                        res[0].password = '';
                        comontutils.resData(Res,0,'保存成功',res[0]);
                      
                    }
                });
            }
        });
    });
}

exports.updateadress = function (req, res, next) {
    var Res = res;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var _id = fields.id;
        var arrayid = fields.arrayid;
        var adressval = JSON.parse(fields.adressval);

        Userdata.update({ "adressval._id" : arrayid },
            { $set :
                {
                    "adressval.$.Consigneename": adressval.Consigneename,
                    "adressval.$.Consigneephone": adressval.Consigneephone,
                    "adressval.$.Consigneeadress": adressval.Consigneeadress,
                    "adressval.$.areaval": adressval.areaval,
                }
            },function(err,res){
            if (err) {
                console.log("Error:" + err);
            }
            else {

                Userdata.find({'_id' : _id}, function(err, res){

                    if (err) {
                        console.log("Error:" + err);
                    }
                    else {
                        if(res.length == 0){
                        	comontutils.resData(Res,0,'网络错误','');
                            return;
                        }
                        res[0].password = '';
                        comontutils.resData(Res,0,'保存成功',res[0]);
                       
                    }
                });
            }
        });
    });
}