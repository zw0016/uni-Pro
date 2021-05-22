//Vuex 状态管理

import Vue from 'vue'
import Vuex from  'vuex'

Vue.use(Vuex)

const store=new Vuex.Store({
	//数据状态
	state:{
		//同步本地的缓存
		hisList: uni.getStorageSync("__his") ||[],
		//登陆信息
		userinfo: uni.getStorageSync("USERINFO") ||[]
	},
	//同步
	mutations:{
		SET_LIST(state,his){
			state.hisList=his
		},
		CLEAR_LIST(state){
			state.hisList=[]
		},
		SET_USER_INFO(state,useInfo){
			state.userinfo=useInfo
		}
	},
	//异步
	actions:{
		set_his({commit,state},his){
			let list=state.hisList
			list.unshift(his)
			uni.setStorageSync('__his',list)
			commit('SET_LIST',list)
		},
		clear_his({commit,state}){
				uni.removeStorageSync('__his')
			commit('CLEAR_LIST')
		},
		set_userinfo({commit,state},useInfo){
			uni.setStorageSync('USERINFO',useInfo)
			commit('SET_USER_INFO',useInfo)
			
		}
	}
})
export default store
