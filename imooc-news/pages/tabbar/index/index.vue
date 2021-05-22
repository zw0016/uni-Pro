<template>
	<view class="home">
		<!-- 可以简单引用 -->
		<navbar></navbar>
		<!--  子传父的值中 @为子组件定义的方法 ‘’ 为父组件接受的方法-->
		<tab :list='tablist' :tabIndex='tabIndex'  @tab='getTab'></tab>
		<view class="home-list" >
			<list  :tab="tablist"  :activeIndex="activeIndex"  @change='getIndex'></list>
		</view>
	<!-- 	<list-scoll>
			<list-card mode="base"></list-card>
			<list-card mode="img"></list-card>
			<list-card mode="column"></list-card>
		</list-scoll> -->
		
		
	</view>
</template>

<script>
import {mapState} from 'vuex'
	export default {
		computed:{
			//获取vuex 中的用户信息 防止异步请求结果返回前的user_id  不正确
			...mapState(['userinfo'])
		},
		watch:{
			//监听userinfo数据的变化 并在此时发送请求
			userinfo(newVal){
				this.getLabel()
			}
		},
		data() {
			return {
				title: 'Hello',
				tablist:[],
				tabIndex:0,
				activeIndex:0,
			}
		},
		onLoad() {
		this.getLabel()
		//监听自定义事件
		uni.$on('labelChange',(res)=>{
			//防止item 中的key 重复定义报错
			//重置下标和tablist中数据
			this.tablist=[]
			this.tabIndex=0
			this.activeIndex=0
			console.log('首页接收到了标签页面',res)
		})
		},
		methods: {
		getLabel(){
			this.$api.getLabel().then((res)=>{
				const {name,data}=res;
				this.tablist=data
				data.unshift({
					name:'全部'
				})
			})
		},
		getTab(data,index){
			this.activeIndex=data.index
		
		},
		getIndex(current){
			this.tabIndex=current
			this.activeIndex=current
		}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
	}
	.home{ 
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		.home-list{
			flex: 1;
			box-sizing: border-box;
		}
	}
</style>
