<template>
	<view>
		<view class="feedback-title">
			意见反馈
		</view>
		<view class="feedback-content">
			<textarea placeholder="请出入你要反馈的内容" v-model="content"  class="feedback-textarea"></textarea>
		</view>
		<view  class="feedback-title">
			反馈图片
		</view>
		<view class="feedback-image-box">
			<view class="feedback-image-item" v-for="(item,index) in  imageList">
				<view class="close-icons" @click="cancelImage(index)">
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
				<view class="image-box">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<!-- 图片小于5才会显示 -->
			<view class="feedback-image-item" @click="addImage" v-if="imageList.length<5">
				<view class="image-box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>
		<view class="feedback-button-box">
		<button type="primary" class="feedback-button" @click="submit">提交反馈意见</button>	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList:[],
				content:''
			}
		},
		methods: {
			addImage(){
				const that=this
				const count=5-this.imageList.length
				//此时的this指向的uni这个api组件而不是页面
				//有两个方法 一个是先获取this用其他名字替代，另一个是success方法用箭头函数
				uni.chooseImage({
					//每次选择可以选择的次数 最多一次上传5个图片
					//注意：web页面不支持最多选择几张 此时count不生效
					count:count,
					success(res){
						const {tempFilePaths}=res
						tempFilePaths.forEach((item,index)=>{
							//this问题
							//web页面兼容
							if(index<count){
								that.imageList.push({
									url:item
								})
							}
						})
					}
				})
			},
			cancelImage(index){
				this.imageList.splice(index,1)
			},
			//同步提交
		async	submit(){
			let imagePath=[]
			uni.showLoading({
			})
				//不支持多图上传 必须使用同步方法
				for (let i=0;i<this.imageList.length;i++){
					const filePath=this.imageList[i].url
				filePath=await this.uploadFiles(filePath)
				imagePath.push(filePath)
				}
			uni.hideLoading()
			this.updateFeedback(this.content,imagePath)
			},
		async uploadFiles(filePath){
				const result =await uniCloud.uploadFile({
					cloudPath:filePath,
				})
				return result.fileID
			},
			//更新反馈信息
			updateFeedback(content,feedbackImages){
				this.$api.updateFeedback({
					content,//反馈文字
					feedbackImages//反馈图片
				}).then(res=>{
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title:'反馈提交成功'
					})
					setTimeout(uni.switchTab({
						url:'/pages/tabbar/my/my'
					}),2000)
					
				}).catch((resolve)=>{
					uni.hideLoading()
					uni.showToast({
						title:'反馈提交失败'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
.feedback-title{
	margin: 15px;
	margin-bottom: 0;
	color: #666;
	font-size: 14px;
}

.feedback-content{
	margin: 15px;
	padding: 10px;
	box-sizing: border-box;
	border: 1px solid #eee;
	.feedback-textarea{
		font-size: 12px;
		width: 100%;
		height: 100px;
	}
}

.feedback-image-box{
	display: flex;
	flex-wrap: wrap;
	padding: 10px;
	.close-icons{
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		right: 0px;
		top: 0px;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background-color: #ff5a5f;
		z-index: 100;
	}
	.feedback-image-item{
		width: 33%;
		position: relative;
		height: 0;
		padding-top: 33%;//利用padding撑开
		box-sizing: border-box;
		.image-box{
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			top: 5px;
			left: 5px;
			right: 5px;
			bottom: 5px;
			border: 1px #eee solid;
			border-radius: 5px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
}
.feedback-button-box{
	padding: 0 15px;
	.feedback-button{
		background-color: $mk-base-color;
		width: 100%;
	}
}



</style>
