//时间格式化

export const parseTime=(time)=>{
	const format='{y}-{m}-{d} {h}:{i}:{s}'
	if(typeof time ==='string'){
		time=parseInt(time)
	}
	const  date =new Date(time)
	const formatObj={
		y:date.getFullYear(),
		m:date.getMonth()+1,
		d:date.getDate(),
		h:date.getHours(),
		i:date.getMinutes(),
		s:date.getSeconds()
	}
	// console.log(formatObj)
const strTime=format.replace(/{(y|m|d|h|i|s)+}/g,(result,key)=>{
		let value=formatObj[key]
		if(result.length>0&&value<10){
			value='0'+value
		}
		return value
	})
	console.log(strTime)
	return strTime
}


