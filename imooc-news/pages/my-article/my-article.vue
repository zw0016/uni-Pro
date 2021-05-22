<template>
	<view>
		<uni-load-more v-if="lists.length===0" status="loading"></uni-load-more>
		<list-card v-for="(item,index) in lists"  :item="item" :key='index'></list-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists:[]
			}
		},
		methods: {
			getMyArticle(){
				this.$api.getMyArticle().then(res=>{
					console.log(res)
					const {data}=res
					this.lists=data
				})
			}
		},
		onLoad(){
			this.getMyArticle()
		}
	}
</script>

<style>

</style>
