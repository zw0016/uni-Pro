<template>
	<view class="tab">
		<scroll-view scroll-x  class="tab-scoll">
			<view class=" scoll-box">
				<view v-for="(item,index) in list" :key="index"class="scoll-item"  
				:class="{active:ativeIndex===index}"
				@click="clickTab(item,index)">{{item.name}} </view>
			</view>
		</scroll-view>
		<view class="tab-icon" @click="openLabel">
			<uni-icons type='gear'  size='26' color='#666'></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default (){
					return []
				}
			},
			tabIndex:{
				type:Number,
				default:0
			}
		},
		watch:{
			tabIndex(newVal,oldVal){
				this.ativeIndex=newVal
			}
		},
		data() {
			return {
				ativeIndex:0
			};
		},
		methods:{
			clickTab(item,index){
			this.ativeIndex=index
				//子组件向父组件传值
				this.$emit('tab',{
					data:item,
					index:index
				})
			},
			openLabel(){
				uni.navigateTo({
					url:'/pages/home-label/home-label'
				})
			}
		}
	
	}
</script>

<style lang="scss">
	.tab{
		display: flex;
		background-color: #fff;
		border-bottom: 1px #f5f5f5 solid;
		width: 100%;
		box-sizing: border-box;
		.tab-scoll{
			flex:1;
			overflow: hidden;
			box-sizing: border-box;
			.scoll-box{
				display: flex;
				height: 44px;
				align-items:  center;
				flex-wrap: nowrap;
				.scoll-item{
					flex-shrink: 0;
					padding: 0 10px;
					font-size: 14px;
					color: #333;
				&.active{
					color: $mk-base-color;
				}
				}
			}
			
		}
		.tab-icon{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 44px;
			position: relative;
			&::after{
				content: "";
				position: absolute;
				top: 12px;
				left: 0px;
				width: 1px;
				bottom: 12px;
				background-color:#DD524D
			}
		}
	}
</style>
