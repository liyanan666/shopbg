
var formidable = require("formidable");
var User = require("../db/user.js");

exports.showIndex = function (req, res, next) {
    res.sendFile('../index.html');
};
exports.regist = function (req, res, next) {
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
        User.find({'username' : username}, function(err, res){
            console.log(res);
            if (err) {
                console.log("Error:" + err);
            }
            else {
                if(res.length == 0){
                    var user = new User({
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
}