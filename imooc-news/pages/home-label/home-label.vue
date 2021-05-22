<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-editor" @click="editLab">{{isedit?'完成':'编辑'}}</view>
			</view>
			<uni-load-more status="loading" iconType="snow" v-if="loading"></uni-load-more>
			<view class="label-content" v-if='!loading'>
				<view class="label-content-item" v-for="(item,index) in chooseList" :key='item._id'>
					{{item.name}}
					<uni-icons @click="del(index)" v-if="isedit" type="clear" size="20" color="red" class="icons-colse"></uni-icons>
				</view>
				<view class="no-data" v-if="chooseList.length===0 &&!loading">
					当前没有数据
				</view>
			</view>
		</view>
		<uni-load-more status="loading" iconType="snow" v-if="loading"></uni-load-more>
		<view class="label-box"  v-if='!loading'>
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<view class="label-content">
				<view @click="add(index)"  class="label-content-item" v-for="(item,index) in unChooseList" :key='item._id'>
					{{item.name}}
				</view>
				<view class="no-data" v-if="unChooseList.length===0 &&!loading">
					当前没有数据
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isedit:false,
				chooseList:[],
				unChooseList:[],
				loading:true
			}
		},
		onLoad(){
			this.getLabel()
		
		},
		methods: {
			editLab(){
				if(this.isedit){
					//正在编辑
					this.isedit=false
					this.setUpdateLabel(this.chooseList)
				}else{
					this.isedit=true
				}
			},
			//获取列表
			getLabel(){
				this.loading=true 
				this.$api.getLabel({
					type:'all'
				}).then((res)=>{
					// console.log(res)
					const {data}=res
					const that=this
					data.forEach(function(item,index){
						if(item.current){
							that.chooseList.push(item)
						}else{
							that.unChooseList.push(item)
						}
					
					})
					// console.log(this.chooseList,this.unChooseList)
					this.loading=false
				})
			},
			//删除选中
			del(index){
				this.unChooseList.push(this.chooseList[index])
				this.chooseList.splice(index,1)
			},
			//新增选中
			add(index){
				if(!this.isedit) return
				this.chooseList.push(this.unChooseList[index])
				this.unChooseList.splice(index,1)
			},
			//完成更新收藏操作同时向主页面发送自定义事件更新头部标签
			setUpdateLabel(label){
				//用来储存遍历后_ids的数组
				let newIdArr=[]
				uni.showLoading({	
				})
				label.forEach((item)=>{
					newIdArr.push(item._id)
				})
				// console.log(newIdArr)
				this.$api.updateLabel({
					label:newIdArr				
				}).then((res)=>{
					uni.hideLoading()
					uni.showToast({
						title:'更新成功',
						icon:"none"
					})
					// console.log(res)
					//自定义事件 全局发送事件
					//自定义事件只能在打开时触发
					uni.$emit('labelChange',)
				})
			},
		
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.label{
		.label-box{
			background-color: #fff;
			margin-bottom: 10px;
			.label-header{
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px #f5f5f5 solid;
				.label-editor{
					color: #30b33a;
					font-weight: bolder;
				}
			}
			.label-content{
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0px;
				.label-content-item{
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
					position: relative;
					.icons-colse{
						position: absolute;
						right: -8px;
						top: -8px;
						background-color: #fff;
						border-radius: 50%;
					}
				}
			}
		}
	}
	.no-data{
		width: 100%;
		text-align: center;
		padding:50px 0px ;
		color: #999;
		font-size: 14px;
	}
</style>
