<template>
	<!-- 阻止冒泡 -->
	<view class="icons" @click.stop="likeTap">
		<uni-icons  size="20" color="#f07373"  :type="like?'heart-filled':'heart'"></uni-icons>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object,
				default(){
					return {}
				}
			},
			types:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				like:false
			};
		},
		//监听是否选中  主要是传参先后的问题
		watch:{
			item(newVal){
				this.like=this.item.is_like
			}
		},
		created(){
			this.like=this.item.is_like
		},
		methods:{
			likeTap(){
				console.log('收藏成功')
				this.like=!this.like
				this.updateLikes()
			},
			updateLikes(){
				uni.showLoading()
				this.$api.update_like({
					user_id:'5fdbfa84fc3f47000165535a',
					article_id:this.item._id
				}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:this.like?'收藏成功':'取消收藏',
						icon:'none'
					})
					//关注和收藏页面联动
					uni.$emit('update_article',this.types)
					console.log(res)
				}).catch(()=>{
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
.icons{
					display: flex;
					position: absolute;
					right: 0px;
					top: 0px;
					justify-content: center;
					align-items: center;
					width: 20px;
					height: 20px;
				}
</style>
