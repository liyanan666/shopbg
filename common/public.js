exports.resData=function(res,codeStatus,info,data){
	res.send({
        "code":codeStatus,
        "data":data,
        "info":info
    });
}

exports.checkcode=function(req,res,codes,code){
	if(req.session[code] == codes){
        return true;
    }
    return false;
}
