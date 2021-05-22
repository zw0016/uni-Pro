<template>
	<view class="navbar">
		<view class="nav-fixed">
		<view :style="{height:statusBarHeight+'px'}"></view>
		<!-- 对切换页面进行判断 如果不是进入搜索页 停止冒泡 -->
		<view class="nav-content" @click.stop="open" :style="{height:navBarheight+'px',width:windowWidth+'px'}" :class="{search:isSearch}" >
			<!-- 搜索页面才有的返回按钮 -->
			<view class="nav-content-search-icons" @click="backHome" v-if="isSearch">
				<uni-icons type="back" size="22" color="#fff"></uni-icons>
			</view>
			<!-- 非搜索页面显示 -->
		<view class="navbar-search" v-if="!isSearch">
			<view class="nav-icon">
				<uni-icons type="search" size="16" color="#999"  ></uni-icons>
			</view>
			<view class="nav-text">uni-app和vue</view>
		</view>
		<view v-else  class="navbar-search">
			<!-- 搜索页面显示 -->
			<input class="nav-text" type="text" v-model="val" value="" placeholder="请输入搜索内容" @input='inputChange'/>
		</view>
		</view>
		
		</view>
		<!-- 他的高要撑起整个导航头  否则会产生塌陷-->
		<view :style="{height:statusBarHeight+navBarheight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		props:{
			isSearch:{
				type:Boolean,
				default:false
			},
			value:{
				type:[String,Number],
				default:''
			}
		},
		watch:{
			value(newVal){
				this.val=newVal
			}
		},
		data() {
			return {
				statusBarHeight:0,
				navBarheight:44,
				windowWidth:375,
				val:''
			};
		},
		created(){
			//获取设备基本信息
			const  info =uni.getSystemInfoSync()
			this.statusBarHeight=info.statusBarHeight
			this.windowWidth=info.windowWidth
			//h5 app 不支持 
            // #ifndef H5 || APP-PLUS || MP-ALIPAY
			//获取胶囊的位置
			const menuButtonInfo=uni.getMenuButtonBoundingClientRect()
			//胶囊底部高度-状态栏高度+胶囊-状态栏的高度
			let navBarheight=menuButtonInfo.bottom-info.statusBarHeight
			+menuButtonInfo.top-info.statusBarHeight
			this.windowWidth=menuButtonInfo.left
			// #endif
		},
		methods:{
			open(){
				if(this.isSearch){
					return
				}
				uni.navigateTo({
					url:'/pages/home-search/home-search'
				})
			},
			inputChange(e){
				const {value}=e.detail
				this.$emit('input',value)
			},
			backHome(){
				uni.switchTab({
					url:'/pages/tabbar/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import  '../../common/css/icons.css';
.navbar{
	.nav-fixed{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		background-color: #f07373;
		.nav-content{
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 15px;
			box-sizing: border-box;
			.navbar-search{
			display: flex;
			align-items: center;
			width: 100%;
			height: 30px;
			background-color: #fff;
			border-radius: 30px;
			padding: 0 10px;
			.nav-icon{
			
			}
			.nav-text{
				font-size: 14px;
				color: "#999";
				margin-left: 12px;
				width: 100%;
			}
		}
		}
		&.search{
			padding-left: 0px;
			.nav-content-search-icons{
				margin-left: 10px;
				margin-right: 10px;
			}
			.navbar-search{
				border-radius: 5px;
			}
		}
		
	}
}
</style>
