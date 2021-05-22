<template>
	<view>
		<view class="comments-content" v-for="(item,index) in commentsList" :key='index'>
			 <comments-box :comments='item'></comments-box>
		</view>
		<!-- 页面刚加载或者上拉 -->
		<uni-load-more v-if="commentsList.length===0||commentsList.length>3" iconType="snow"
		:status="loading"></uni-load-more>
	</view>
</template>

<script>
	export default {
		onLoad(query){
			console.log(query)
			this.article_id=query.id
			this.getComments()
		},
		data() {
			return {
				article_id:'',
				commentsList:[],
				page:1,
				pageSize:3,
				loading:'loading'
			}
		},
		//上拉触底
		onReachBottom(){
			if(this.loading==='noMore'){
				return
			}
			this.page++
			this.getComments()
		},
		methods: {
			//请求评论api
			getComments(){
				this.$api.getComments({
					article_id:this.article_id,
					page:this.page,
					pageSize:this.pageSize
				}).then((res)=>{
					console.log(res)
					const {data}=res
					//加载完成
					if(data.length===0){
						this.loading='noMore'
						return
					}
					//以前的数据
					//深拷贝 然后添加新的数据 否则为新的数据覆盖之前数据
					let oldFormData=JSON.parse(JSON.stringify(this.commentsList))
					oldFormData.push(...data)
					this.commentsList=oldFormData
				})
			},
		}
	}
</script>

<style lang="scss">

.comments-content{
	padding: 0 15px ;
}





</style>
