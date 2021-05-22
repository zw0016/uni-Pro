<template>
	<view class="follow">
		<view class="follow-tab">
			<view class="follow-tab-box">
				<view class="follow-tab-item" :class="{active:activeIndex===0}" @click="tab(0)">文章</view>
				<view class="follow-tab-item" :class="{active:activeIndex===1}" @click="tab(1)">作者</view>
			</view>
		</view>
		<view class="follow-list">
			<!-- activeIndex来是想内容与标签绑定 同时绑定事件来返回给标签显示 -->
			<swiper class="follow-list-swiper" :current="activeIndex" @change="change">
				<swiper-item>
					<!-- <view class="swiper-item">文章</view> -->
					<list-scoll>
						<!-- scoll滚动的内容区 -->
						<uni-load-more  v-if="list.length===0&&!articleShow" status="loading" iconType="snow"></uni-load-more>
					<list-card types='follow' v-for="(item,index) in list" :key='index' :item='item'></list-card>
					<view v-if="articleShow" class="no-data">没有数据</view>
				</list-scoll>
				</swiper-item>
				<swiper-item>
					<list-scoll>
						<list-author v-for="(item,index) in authorList" :key='item.id' :item='item'></list-author>
					</list-scoll>
				</swiper-item>
				
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex:0,
				list:[],
				articleShow:false,
				authorList:[]
			}
		},
		onLoad(){
			//自定义时间只能在打开页面触发
			uni.$on('update_article',()=>{
				this.getFollow()
			})
			uni.$on('update_author',()=>{
				this.getAuthor()
			})
			this.getFollow()
			this.getAuthor()
			
		},
		methods: {
			change(e){
				const current=e.detail.current
				this.activeIndex=current
			},
			tab(num){
				this.activeIndex=num
			},
			//获取收藏文章api
			getFollow(){
				this.$api.getFollow().then(res=>{
					const {data}=res
					this.list=data
					this.articleShow=this.list.length===0?true:false
				})
			},
			//获取作者api
			getAuthor(){
				this.$api.getAuthor().then(res=>{
					console.log(res)
					const {data}=res
					this.authorList=data
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	height: 100%;
	display: flex;
}
.follow{
	height: 100%;
	display: flex;
	flex: 1;
	flex-direction: column;
	box-sizing: border-box;
	.follow-tab{
		height: 30px;
		padding: 20px 10px;
		border-bottom: 1px #f5f5f5 solid;
		.follow-tab-box{
			width: 100%;
			height: 100%;
			display: flex;
			border-radius: 5px;
			border: 1px $mk-base-color solid;
			.follow-tab-item{
				width: 100%;
				display: flex;
				color: #666;
				justify-content: center;
				align-items: center;
				&:first-child{
					border-right: 1px $mk-base-color solid;
				}
				&.active{
					color: red;
				}
			}
		}
	}
	.follow-list{
		flex: 1;
		.follow-list-swiper{
			height: 100%;
			.swiper-item{
				// height: 100%;
			}
		}
	}
}
.no-data{
	padding: 50px;
	font-size: 14px;
	color: #999;
	text-align: center;
}
</style>
