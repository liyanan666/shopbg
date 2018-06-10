//申请记录

let mongoose = require('./db.js'),
let Schema = mongoose.Schema;

let Work = new Schema({  //兼职
    name:{type:String},
    sex:{type:String},
    school:{type:String},//学校
    college:{type:String},//学院
    major:{type:String},//专业
    class:{type:String},//班级
    schoolNum:{type:String},//学号
    IDnum:{type:String},//身份证号
    payNum:{type:String},//支付宝号
    phoneNum:{type:String},//手机号
    status:{type:Number,default:0}  //0审核中  1位审核通过 2审核失败
    
});

module.exports.Product = mongoose.model('applywork',Work);