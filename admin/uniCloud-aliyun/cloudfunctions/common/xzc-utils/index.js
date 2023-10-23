
//返回提示的文字的格式化
function giveMsg(str){
	let msgObj={
		"success":"查询成功",
		"noSuccess":"查询失败",
		"add":"新增成功",
		"noAdd":"新增失败",
		"required":"缺少参数"
	}
	return msgObj[str]
}
function giveCode(num){
	let codeObj={
		0:0,
		400:400
	}
	return codeObj[num]
}

 class useResult{
	 constructor(errCode,errMsg,data,total){
		 this.errCode = giveCode(errCode)
		 this.errMsg = giveMsg(errMsg)
		 this.data = data
		 this.total = total
	 }
 }



function result(errCode,errMsg,data,total){
	return {
		errCode:giveCode(errCode),
		errMsg: giveMsg(errMsg),
		data,
		total:
	}
}

module.exports = {
	giveMsg,
	giveCode,
	useResult
}