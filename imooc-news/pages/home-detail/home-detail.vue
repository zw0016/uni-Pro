<template>
	<view class="detail">
	<view class="detail-title">
		{{formData.title}}
	</view>
	<view class="detail-header">
		<view class="detail-header-logo">
			<image :src="formData.author.avatar" mode="aspectFill"></image>
		</view>
		<view class="detail-header-content">
			<view class="detail-header-content-title">
				{{formData.author.author_name}}
			</view>
			<view class="detail-header-content-info">
				<text>{{formData.create_time}}</text>
				<text>{{formData.thumbs_up_count}}赞</text>
				<text>{{formData.browse_count}}浏览</text>
			</view>
		</view>
		<button type="default" class="detail-header-button" @click="follow(formData.author.id)">
			{{formData.is_author_like?'取消关注':'关注'}}
			</button>
	</view>
	<!-- 最新的评论与回复 -->
	<view class="detail-content">
		<view class="detail-html">
			<u-parse :content="formData.content" noData="nodata"></u-parse>	
		</view>
		<view class="detail-comment">
			<view class="comment-title">
				最新评论
			</view>
			<!-- 评论组件 -->
			<view class="comment-content" v-for="(item,index) in commentsList" :key='index'>
				<comments-box :comments='item' @reply='reply'></comments-box>
			</view>
		</view>
	</view>
	<view class="detail-bottom">
		<view class="detail-bottom-input" @click="openComments">
			<text>谈谈你的看法</text>
			<uni-icons size="16" type="compose" color="#F07373"></uni-icons>
		</view>
		<view class="detail-bottom-icons">
			<view class="detail-bottom-icons-box" @click="open">
				<uni-icons type="chat" size="22" color="#F07373"></uni-icons>
			</view>
			<!-- 文章收藏 -->
			<view class="detail-bottom-icons-box" @click="likeTap(formData._id)">
				<uni-icons :type="formData.is_like?'heart-filled':'heart'" size="22" color="#F07373"></uni-icons>
			</view>
			<view class="detail-bottom-icons-box" @click="thumbsup(formData._id)">
				<uni-icons :type="formData.is_thumbs_up?'hand-thumbsup-filled':'hand-thumbsup' " size="22" color="#F07373"></uni-icons>
			</view>
		</view>
	</view>
	<!-- ref 只能用来获取自定义组件的实例 -->
	<!-- maskClick 其他地方点击是否关闭弹窗 -->
	<uni-popup type="bottom" ref='popup' :maskClick="close">
		<view class="pop-warp">
			<view class="pop-header">
				<text class="pop-header-item" @click="closeBox">取消</text>
				<text class="pop-header-item" @click="submit">发布</text>
			</view>
			<view class="pop-content">
				<textarea class="pop-textarea" placeholder="请输入评论" v-model="commentsValue" fixed maxlength="200"></textarea>
				<view class="pop-count">{{commentsValue.length}}/200</view>
			</view>
		</view>
	</uni-popup>
	</view>
</template>

<script>
	//解析富文本插件
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import {parseTime} from '@/utils/index.js'
	export default {
		components:{
			uParse
		},
		data() {
			return {
				//存储接受到的信息
				formData:{},
				//没有数据
				nodata:'<p style="text-align:center;color:#666">详情加载中</p>',
				//评论内容
				commentsValue:'',
				//评论列表
				commentsList:[],
				//回复列表
				replyFormData:{}
				
			}
		},
		methods: {
			//跳转到评论详情页
			open(){
				uni.navigateTo({
					url:'../detail-comments/detail-comments?id='+this.formData._id
				})
			},
			//点赞
			thumbsup(article_id){
				this.setUpdateThumbsup(article_id)
			},
			//点赞api
			setUpdateThumbsup(article_id){
				uni.showLoading({
				})
				this.$api.updateThumbsup({
					article_id
				}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:res.msg,
					})
					this.formData.is_thumbs_up=true
					if(!this.formData.is_thumbs_up){
						this.formData.thumbs_up_count++		
					}
				})
			},
			//收藏文章
			likeTap(article_id){
				console.log('收藏文章')
				this.setUpdateLike(article_id)
			},
			//收藏文章api
			setUpdateLike(article_id){
				uni.showLoading({
				})
				this.$api.update_like({
					article_id
				}).then(res=>{
					uni.hideLoading()
					//切换图标状态
					this.formData.is_like=!this.formData.is_like
					//收藏成功后向主页返回收藏状态
					uni.$emit('update_article','follow')
					uni.showToast({
						title:this.formData.is_like?'收藏成功':'取消收藏'
					})
					// console.log(res)
				})
			},
			//关注
			follow(author_id){
				this.setUpdateAuthor(author_id)
			},
			//获取关注信息
			setUpdateAuthor(author_id){
				uni.showLoading({
				})
				this.$api.updateAuthor({
					 author_id
				}).then(res=>{
					uni.hideLoading()
					this.formData.is_author_like=!this.formData.is_author_like
					//关注成功后向页面作者页面传递事件
					uni.$emit('update_author')
					uni.showToast({
						title:this.formData.is_author_like?'关注作者成功':'取消关注作者',
						icon:'none'
					})
					// console.log(res)
				})
			},
			//获取详情信息
			getDetail(){
				this.$api.getDetail({
				article_id:this.formData._id
				}).then((res)=>{
					const {data}=res
					this.formData=data
				})
			},
			//打开评论
			openComments(){
				this.$refs.popup.open()
			},
			//取消评论
			closeBox(){
				this.$refs.popup.close()
			},
			//提交评论
			submit(){
				
				//判断是否为空
				if(!this.commentsValue){
					uni.showToast({
						title:'请输入评论内容',
						icon:"none"
					})
				}else{
					this.setUpdateComment({content:this.commentsValue,...this.replyFormData})
				}
				
			},
			//调取提交评论的api 
			setUpdateComment(content){
				const subData={
					article_id:this.formData._id,
					...content
				}
				console.log(subData)
				this.$api.updateComment(subData).then((res)=>{
					// console.log(res)
					uni.hideLoading()
					uni.showToast({
						title:'评论发布成功',
					})
					this.getComments()
					this.closeBox()
					//提交成功置零
					this.replyFormData={}
					this.commentsValue=''
				})
			},
			//请求评论api
			getComments(){
				this.$api.getComments({
					article_id:this.formData._id,
				}).then((res)=>{
					console.log(res)
					const {data}=res
					this.commentsList=data
				})
			},
			reply(e){
				//获取回去的id
				this.replyFormData={
					'comment_id':e.comments.comment_id
				}
				if(e.comments.reply_id){
					this.replyFormData.reply_id=e.comments.reply_id
				}
				this.openComments()
				// console.log(this.replyFormData)
			}
		},
		onLoad(query){
			this.formData=JSON.parse(query.params)
			this.getDetail()
			this.getComments()
			//时间格式化方法s
		},
		onReady(){
			// this.$refs.popup.open()
		}
	}
</script>

<style lang="scss">
	.detail{
		padding: 15px 0;
		// padding-bottom: 54px;
	}
	.detail-title{
		padding: 0 15px;
		font-size: 14px;
		font-weight: bolder;
		color: #333;
	}
	.detail-header{
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding: 0 15px;
		.detail-header-logo{
			flex-shrink: 0;
			height: 40px;
			width: 40px;
			border-radius: 50%;
			overflow: hidden;
			image{
				height: 100%;
				width: 100%;
			}
		}
		.detail-header-content{
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;
			padding-left: 10px;
			.detail-header-content-title{
				font-size: 14px;
				color: #333;
			}
			.detail-header-content-info{
				color: #999;
				text{
					margin-left: 10px;
				}
			}
		}
		.detail-header-button{
			flex-shrink:0;
			font-size:12px;
			height: 30px;
			font-size: 12px;
			background-color: $mk-base-color;
			color: #fff;
		}
	}
	.detail-content{
		min-height: 500px;
		margin-top: 20px;
		.detail-html{
			padding: 0 15px;
		}
		.detail-comment{
			margin-top: 30px;
			.comment-title{
			padding: 10px 15px ;
			font-size: 14px;
			color: #666;
			border-bottom: 1px #f5f5f5 solid;
			}
			.comment-content{
				padding: 0px 15px;
				border-top: 1px #eee solid;
			}
		}
		
	}
	.detail-bottom{
		display:flex;
		position: relative;
		left: 0;
		bottom: 0;
		align-items: center;
		justify-content: center;
		padding-top: 10px;
		width: 100%;
		height: 44px;
		border-top: 1px #f5f5f5 solid;
		background-color: #fff;
		box-sizing: border-box;
		.detail-bottom-input{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 10px;
			padding: 0 10px;
			width: 100%;
			height: 30px;
			border: 1px #ddd solid;
			border-radius: 5px;
			text{
				font-size: 14px;
				color: #999;
			}
		}
		.detail-bottom-icons{
			display: flex;
			flex-shrink: 0;
			padding: 0 10px;
			.detail-bottom-icons-box{
				position: relative;
				display: flex;
				align-items: center;
				width: 44px;
				justify-content: center;
			}
		}
	}
	.pop-warp{
		background-color: #fff;
		.pop-header{
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			color: #666;
			border-bottom: 1px #F5F5F5 solid;
			.pop-header-item{
				height: 50px;
				line-height: 50px;
				padding: 0 15px;
			}
		}
		.pop-content{
			width: 100%;
			padding: 15px;
			box-sizing: border-box;
			.pop-textarea{
				width: 100%;
				height: 200px;
			}
			.pop-count{
				display: flex;
				justify-content: flex-end;
				font-size: 12px;
				color: #999;
			}
		}
	}
</style>
