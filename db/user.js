/**
 * 用户信息
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    introduction:{ type: String },//简介
    headportrait:{ type: String },
    username : { type: String },                 //用户账号
    password: { type: String },                            //密码
    school:{ type: String },//学校
    age:{ type: String },//年龄
    phone:{ type: String },//电话
    sex:{ type: String },//性别
    nickname:{ type: String },//昵称
    email:{ type: String },//邮箱
    isbuess:{ type: Number }
});

var Code = new Schema({
    code:{type:String}
})
module.exports.User = mongoose.model('User',UserSchema);
module.exports.Code = mongoose.model('Code',Code);