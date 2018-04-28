const formidable = require("formidable");
const captchapng = require('captchapng2');
var path = require("path");
var fs = require("fs");

var User = require("../db/user.js");
var Userdata = User.User;
var Business = User.Business;


exports.tobuess = function (req, res, next) {  //成为商家
    var Res = res;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var id = fields.id;
        var data = JSON.parse(fields.userdata);
        Business.find({'userid' : id}, function(err, res){
            if(res.length == 0){
                var buess = new Business({
                    shopname:data.shopname, //店铺名称
                    mainbusiness:data.mainbusiness,//主营业务
                    buessname:data.buessname,
                    buesssex:data.buesssex,
                    buessphone:data.buessphone,
                    buessschool:data.buessschool,
                    buessbirth:data.buessbirth,
                    buessidNumber:data.buessidNumber,
                    buessintroduction:data.buessintroduction,
                    buesslogo:data.buesslogo,
                    buessidPhoto:data.buessidPhoto,
                    userid:id
                });
                buess.save(function (err,res) {
                    if (err) {
                        Res.send({
                            "code":-1,
                            "info":"提交失败"
                        });
                    }
                    else {
                    	Res.send({
                            "code":0,
                            "info":"已提交审核，审核进度可以在审核中心查看"
                        });
                    }
                });
            }else {
                Res.send({
                    "code":-1,
                    "info":"不要重复提交"
                });
            }
        })


    })

};

exports.addproduct = function (req, res, next) {

}

exports.applywork = function (req, res, next) {  //申请兼职
    var Res = res;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var id = fields.id;
        var data = JSON.parse(fields.userdata);
        Business.find({'userid' : id}, function(err, res){
            if(res.length == 0){
                var buess = new Business({
                    shopname:data.shopname, //店铺名称
                    mainbusiness:data.mainbusiness,//主营业务
                    buessname:data.buessname,
                    buesssex:data.buesssex,
                    buessphone:data.buessphone,
                    buessschool:data.buessschool,
                    buessbirth:data.buessbirth,
                    buessidNumber:data.buessidNumber,
                    buessintroduction:data.buessintroduction,
                    buesslogo:data.buesslogo,
                    buessidPhoto:data.buessidPhoto,
                    userid:id
                });
                buess.save(function (err,res) {
                    if (err) {
                        Res.send({
                            "code":-1,
                            "info":"提交失败"
                        });
                    }
                    else {
                        Res.send({
                            "code":0,
                            "info":"已提交审核，审核进度可以在审核中心查看"
                        });
                    }
                });
            }else {
                Res.send({
                    "code":-1,
                    "info":"不要重复提交"
                });
            }
        })


    })
}