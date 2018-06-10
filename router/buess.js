const formidable = require("formidable");
const captchapng = require('captchapng2');
var path = require("path");
var fs = require("fs");

var User = require("../db/user.js");
var UserSchema = User.User;
var BusinessSchema = User.Business;
let comontutils = require("../common/public.js");  //公共方法

exports.tobuess = function (req, res, next) {  //成为商家
    var Res = res;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var id = fields.id;
        var data = JSON.parse(fields.userdata);
        UserSchema.findById(id,function(err,doc){
            if(!doc){
                comontutils.resData(Res,-1,'请求失败',doc);
                return;
            }else{
                BusinessSchema.find({'userid' : id}, function(err, res){
                    if(res.length == 0){
                        var buess = new BusinessSchema({
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
                                comontutils.resData(Res,-1,'提交失败','');
                              
                            }
                            else {
                                comontutils.resData(Res,0,'已提交审核，审核进度可以在审核中心查看','');
                                
                            }
                        });
                    }else {
                        comontutils.resData(Res,-1,'不要重复提交','');
                    }
                })
            }
        })

        
    })

};

exports.addproduct = function (req, res, next) {

}

exports.applylist = function (req, res, next) {  //申请记录
    var Res = res;
    var id = req.query.userid;
    if(id){
        BusinessSchema.find({'userid' : id},'applyname create_at status', function(err, res){
            if (err)  {
                comontutils.resData(Res,-1,err,'')
                return
            };
            comontutils.resData(Res,0,'success',res);
        })
    }else{
        comontutils.resData(Res,-1,'请求错误','');
    }
}