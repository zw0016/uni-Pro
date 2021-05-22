
//自动导出功能
const requireApi=require.context(
		//api 相对路径
		'.',
		//是否查询子目录
		false,
		//查询后缀
		/.js$/

)
let module={}
requireApi.keys().forEach((key,index)=>{
		if(key==='./index.js'){
			return
		}
	//浅拷贝
	Object.assign(module,requireApi(key))
})

// console.log(module)

export default module