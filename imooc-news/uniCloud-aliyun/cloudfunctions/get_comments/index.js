'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		article_id,
		pageSize = 10,
		page = 1
	} = event

	const list = await db.collection('article')
		.aggregate()
		.match({
			_id: article_id
		})
		//对文档进行拆分
		.unwind('$comments')
		.project({
			_id: 0,
			comments: 1
		})
		//重新计算根节点
		.replaceRoot({
			newRoot: '$comments'
		})
		//跳过多少数据
		.skip(pageSize*(page-1))
		.limit(pageSize)
		.end()
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
