/**
 * config
 */

var path = require('path');

var config = {
    // debug 为 true 时，用于本地调试
    debug: true,
    name: '商城', // 名字
    description: '', // 描述
    keywords: 'nodejs, node, express, connect, socket.io',

    site_logo: '/public/images/cnodejs_light.svg', // default is `name`
    site_icon: '/public/images/cnode_icon_32.png', // 默认没有 favicon, 这里填写网址

    // cdn host，如 http://cnodejs.qiniudn.com
    site_static_host: '', // 静态文件存储域名

    host: 'localhost',
    // 默认的Google tracker ID，自有站点请修改，申请地址：http://www.google.com/analytics/
    google_tracker_id: '',
    // 默认的cnzz tracker ID，自有站点请修改
    cnzz_tracker_id: '',

    // mongodb 配置
    db: 'mongodb://127.0.0.1/mongoose',

    // redis 配置，默认是本地
    redis_host: '127.0.0.1',
    redis_port: 6379,
    redis_db: 0,
    redis_password: '',

    // 程序运行的端口
    port: 3000,


    log_dir: path.join(__dirname, 'logs'),



    // 下面两个配置都是文件上传的配置

    // 7牛的access信息，用于文件上传
    qn_access: {
        accessKey: 'aENbpcN2KYXfefARtoXLCy0ryAevAXyrnrITUuca',
        secretKey: 'ZlnEaRq41mRSwKR4UIC4fS6JOItUP7LRMnL1Rb9W',
        bucket: 'shop-li',
        origin: 'qiniu.bestpiaopiao.cn',
        // 如果vps在国外，请使用 http://up.qiniug.com/ ，这是七牛的国际节点
        // 如果在国内，此项请留空
    },
    //云片短信信息
    yp_access:{
    	apiley:'a8cacab2dab38f11c46aa98b4014cf7d'
    },

    // 文件上传配置
    // 注：如果填写 qn_access，则会上传到 7牛，以下配置无效
    upload: {
        path: path.join(__dirname, 'public/upload/'),
        url: '/public/upload/'
    },

    file_limit: '1MB',


};

if (process.env.NODE_ENV === 'test') {
	//启动命令 NODE_ENV=test node app.js
    config.db = 'mongodb://127.0.0.1/test';
}

module.exports = config;
