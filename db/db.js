var mongoose = require('mongoose');

var config = require('../config.js');

/**
 * 连接
 */
mongoose.connect(config.db);

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    console.log('链接成功' + config.db);
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;