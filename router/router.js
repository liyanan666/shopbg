const formidable = require("formidable");
const captchapng = require('captchapng2');
var path = require("path");
var fs = require("fs");

var User = require("../db/user.js");
var Userdata = User.User;
var sessioncode = '';


exports.getcode = function (req, res, next) {  //获取验证码
    let rand = parseInt(Math.random() * 9000 + 1000);
    req.session.code = rand;
    console.log(req.session.code);
    let png = new captchapng(80, 30, rand);
    res.writeHead(200, { 'Content-Type': 'image/png'});
    res.end(png.getBuffer());
};

exports.regist = function (req, res, next) { //注册
    var Res = res;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //得到表单之后做的事情
        var username = fields.username;
        var password = fields.password;
        var code = fields.code;
        var school = fields.school;
        var age = fields.age;
        var phone = fields.phone;
        var sex = fields.sex;
        var nickname = fields.nickname;
        var email = fields.email;
        var introduction = fields.introduction;
        var headportrait = fields.headportrait;
        Userdata.find({'username' : username}, function(err, res){
            console.log(1);
            if (err) {
                console.log("Error:" + err);
            }
            else {
                if(res.length == 0){
                    var user = new Userdata({
                        introduction:introduction,//简介
                        headportrait:headportrait,
                        username : username,                 //用户账号
                        password: password,                            //密码
                        school:school,//学校
                        age:age,//年龄
                        phone:phone,//电话
                        sex:sex,//性别
                        nickname:nickname,//昵称
                        email:email,//邮箱
                        isbuess:0,
                        adressval:[]
                    });
                    user.save(function (err, res) { //保存

                        if (err) {
                            Res.send({
                                "code":-1,
                                "info":"保存失败"
                            });
                            console.log("Error:" + err);
                        }
                        else {
                            Res.send({
                                "code":0,
                                "info":"保存成功"
                            });
                            console.log("Res:" + res);
                        }

                    });
                }else{
                    Res.send({
                        "code":-1,
                        "info":"用户名已存在"
                    });
                }
            }
        });
    });
};

exports.login = function (req, res, next) {  //登陆
    var Res = res;
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        var username = fields.username;
        var password = fields.password;
        Userdata.find({'username' : username}, function(err, res){

            if (err) {
                console.log("Error:" + err);
            }
            else {
                if(res.length == 0){
                    Res.send({
                        "code":-1,
                        "info":"未注册"
                    });
                }else if(password == res[0].password){
                    res[0].password = '';
                    Res.send({
                        "code":0,
                        "info":res[0]
                    });
                }else if(password != res[0].password){
                    Res.send({
                        "code":-1,
                        "info":'用户名或密码不正确'
                    });
                }
            }
        });
    });
};
exports.uploadimg = function (req,res,next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../avatar");  //设置文件的缓存路径
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

        if (extName.length == 0) {
            res.send({
                "code":-1,
                "info":'只支持png和jpg格式图片'
            });
            //删除缓存区的文件
            let tempPath = files.file.path;
            fs.unlink(tempPath, function (err) {
                if (err) throw err;
                console.log('成功')
            });
        }else{
            let oldpath = files.file.path;
            var filename = Math.random()+Date.parse(new Date())/1000;
            let newpath = path.normalize(__dirname + "/../avatar")+ "/" + filename+'.'+extName;
            let returnpath = "/avatar/" + filename+'.'+extName;
            fs.rename(oldpath, newpath, function (err) {
                if (err) {
                    res.send("失败");
                    return;
                }
                res.send({
                    'code':0,
                    'url':returnpath,
                    'info':'上传成功'
                })
            });

        }
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
                    console.log("Error:" + err);
                }
                else {
                    if(res.length == 0){
                        Res.send({
                            "code":-1,
                            "info":""
                        });
                        return;
                    }
                    res[0].password = '';
                    Res.send({
                        'code':0,
                        'data':res[0],
                        'info':'保存成功'
                    });
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
                            Res.send({
                                "code":-1,
                                "info":""
                            });
                            return;
                        }
                        res[0].password = '';
                        Res.send({
                            'code':0,
                            'data':res[0],
                            'info':'保存成功'
                        });
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
                            Res.send({
                                "code":-1,
                                "info":""
                            });
                            return;
                        }
                        res[0].password = '';
                        Res.send({
                            'code':0,
                            'data':res[0],
                            'info':'保存成功'
                        });
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
                            Res.send({
                                "code":-1,
                                "info":""
                            });
                            return;
                        }
                        res[0].password = '';
                        Res.send({
                            'code':0,
                            'data':res[0],
                            'info':'保存成功'
                        });
                    }
                });
            }
        });
    });
}