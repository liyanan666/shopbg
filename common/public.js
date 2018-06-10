exports.resData=function(res,codeStatus,info,data){
	res.send({
        "code":codeStatus,
        "data":data || '',
        "info":info
    });
}

