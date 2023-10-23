// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const db = uniCloud.database();

module.exports = {
	
	_before: function () { // 通用预处理器
	
	this.startTime = Date.now() // 在before内记录开始时间并在this上挂载，以供后续流程使用
	this.params = this.getParams()[0]

	},
 async	get(){
	 
	let {num} = this.params;
	 let res =  await db.collection("xzs_product_nav").limit(num).get();
	 let result ={
		 errCode:0,
		 errMsg:"查询成功",
		 data:res.data
	 }
	 return result;
	},
	add: async function(){
		
	},
	update(){
		
		
	},
	remove(){
		
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
