<template>
	<view>
		<view class="my-header">
			<view class="my-header-background">
				<image :src="userinfo.avatar" mode="aspectFill"></image>
			</view>
			<view class="my-header-logo">
				<view class="my-header-logo-box">
					<image :src="userinfo.avatar" mode="aspectFill"></image>
				</view>
				<text class="my-header-name">{{userinfo.author_name}}</text>
			</view>
			<view class="my-header-info">
				<view class="my-header-info-box">
					<text class="my-header-info-title">被关注</text>
					<text>{{userinfo.follow_count}}</text>
				</view>
				<view class="my-header-info-box">
					<text class="my-header-info-title">粉丝</text>
					<text>{{userinfo.fans_count}}</text>
				</view>
				<view class="my-header-info-box">
					<text class="my-header-info-title">积分</text>
					<text>{{userinfo.integral_count||0}}</text>
				</view>
			</view>
			
		</view>
		<view class="my-content">
			<view class="my-content-list" @click="open">
				<view class="my-content-list-title">
					<uni-icons class="icons" type="contact" size="16" color="#666"></uni-icons>
					<text>我的文章</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
		</view>
		<view class="my-content">
			<view class="my-content-list" @click="feedback">
				<view class="my-content-list-title">
					<uni-icons class="icons"  type="help" size="16" color="#666"></uni-icons>
					<text>意见反馈</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import{mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			open(){
				uni.navigateTo({
					url:'/pages/my-article/my-article'
				})
			},
			feedback(){
				uni.navigateTo({
					url:'/pages/feedback/feedback'
				})
			}
		},
		computed:{
			...mapState(['userinfo'])
		},
		onLoad(){
			// console.log(this.userinfo)
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f5f5f5;
	
}
.my-header{
	padding-bottom: 15px;
	position: relative;
	overflow: hidden;
	.my-header-background{
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		filter: blur(8px);
		opacity: 0.3;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.my-header-logo{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 30px;
		.my-header-logo-box{
			width: 60px;
			height: 60px;
			border-radius: 50%;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.my-header-name{
			margin-top: 15px;
			font-size: 16px;
			font-weight: bold;
		}
	}
	.my-header-info{
		display: flex;
		margin-top: 15px;
		flex-direction: row;
		.my-header-info-box{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100%;
			font-size: 12px;
			color: #999;
			.my-header-info-title{
				font-size: 14px;
				color: #333;
			}
		}
	}
}
.my-content{
	.my-content-list{
		display: flex;
		justify-content: space-between;
		padding:  15px;
		margin-bottom: 10px;
		background-color: #fff;
		color: #333;
		font-size: 14px;
		.my-content-list-title{
			display: flex;
			.icons{
				margin-right: 5px;
			}
		}
	}
}
</style>
