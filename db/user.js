/**
 * 用户信息
 */
let mongoose = require('./db.js'),
    Schema = mongoose.Schema;
let UserSchema = new Schema({
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
    isbuess:{ type: Number },//是否是商户
    adressval:[{
        Consigneename:{type: String},
        Consigneephone:{type: String},
        Consigneeadress:{type: String},
        areaval:{type: String},
    }] //地址
});

let BusinessSchema = new Schema({
    shopname:{type: String }, //店铺名称
    mainbusiness:{type: String },//主营业务
    buessname:{type: String },
    buesssex:{type: String },
    buessphone:{type: String },
    buessschool:{type: String },
    buessbirth:{type: String },
    buessidNumber:{type: String },
    buessintroduction:{type: String },
    buesslogo:{type: String },
    buessidPhoto:{type: Array },
    userid:{type: String }

});

let ProductSchema = new Schema({
    productname:{type:String},
    productprice:{type:Number},
    productPromotionprice:{type:Number},
    productclassification:{type:String},
    productimg:{type:String},
    productdetailimg:{type:Array},
    priductintroduct:{type:String}
});

module.exports.User = mongoose.model('User',UserSchema);
module.exports.Business = mongoose.model('Business',BusinessSchema);
module.exports.Product = mongoose.model('Product',ProductSchema);