// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const db= uniCloud.database();
const {giveMsg,giveCode,useResult} = require("demo-utils");

module.exports = {
	_before: function () { // 通用预处理器
	
	this.startTime = Date.now() // 在before内记录开始时间并在this上挂载，以供后续流程使用
	let body = this.getHttpInfo().body
	if(!body){
			throw new useResult(400,"required")
	}else{
		this.params =  JSON.parse(this.getHttpInfo().body);
	}
	

	},
	async get(){

		let{num,page} = this.params;
		if(!num || !page)
		{
			throw new useResult(400,"required")
		}
		let res = await db.collection("demoArt").limit(num).get();
		// let result = {
		// 	errCode:giveCode(400),
		// 	errMsg:giveMsg("success"),
		// 	data:res.data
		// }
		return new useResult(0,"success",res.data,0)
		return result;
	},
	async add(){
		let {title,author} = this.params
		let res = await db.collection("demoArt").add({
			title,
			author,
			hits:Math.floor(Math.random()*100) 
		})
		let result={
			errCode:0,
			errMsg:"新增成功",
			data:res
		}
		return result
	},
	_after(error, result) {
		if(error) {
			throw error // 如果方法抛出错误，也直接抛出不处理
		}
		result.timeCost = Date.now() - this.startTime
		result.abc="村南女女"
		return result
	}
}
