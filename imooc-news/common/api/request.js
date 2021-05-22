import store from '@/store/index.js'
export default function AjaxApi(options){
	const {url,data}=options;
	//传入uesrID
	const dataObj={
		user_id:store.state.userinfo._id,
		...data
	}
		return new Promise((resovle,reject)=>{
			uniCloud.callFunction({
				//执行云函数 name 必须为要执行的云函数名
				name:url,
				data:dataObj
			}).then((res)=>{
				if(res.result.code===200){
					resovle(res.result)
				}else{
					//
					reject(res.result)
				}
				
			}).catch((err)=>{
				reject(err)
			})
		})
}









