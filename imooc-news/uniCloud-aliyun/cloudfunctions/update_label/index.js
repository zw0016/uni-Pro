'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		user_id,
		label = []
	} = event
	//同步更新数据 通过user_id
	await db.collection('user').doc(user_id).update({
		label_ids: label
	})
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据更新成功'
	}
};
