import AjaxApi from './request.js'
export  const   getLabel= (data)=>{
	return AjaxApi({
		url:'get_label',
		data
	})
	
}

export  const   getList= (data)=>{
	return AjaxApi({
		url:'get_list',
		data
	})
	
}

export const update_like=(data)=>{
	 return AjaxApi({
		 url:'update_like',
		 data
	 })
}

export  const   getSearch= (data)=>{
	return AjaxApi({
		url:'get_search',
		data
	})
	
}


export const updateLabel=(data)=>{
		return AjaxApi({
			url:'update_label',
			data
		})
}

export const getDetail=(data)=>{
	return AjaxApi({
		 url:'get_detail',
		 data
	})
}

export const updateComment=(data)=>{
	return AjaxApi({
		url:'update_comment',
		data
	})
}

export const getComments=(data)=>{
	return AjaxApi({
		url:'get_comments',
		data
	})
}

export const updateAuthor=(data)=>{
	return AjaxApi({
		url:'update_author',
		data
	})
}

export const updateThumbsup=(data)=>{
	return AjaxApi({
		url:'update_thumbsup',
		data
	})
}

export const getFollow=(data)=>{
	return AjaxApi({
		url:'get_follow',
		data
	})
}

export const getAuthor=(data)=>{
	return AjaxApi({
		url:'get_author',
		data
	})
}

export const getUser=(data)=>{
	return AjaxApi({
		url:'get_user',
		data
	})
}

export const getMyArticle=(data)=>{
	return AjaxApi({
		url:'get_my_article',
		data
	})
}

export const updateFeedback=(data)=>{
	return AjaxApi({
		url:'update_feedback',
		data
	})
}



