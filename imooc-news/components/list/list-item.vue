<template>
	
		<list-scoll class="swiper-scoll" @loadmore='loadmore'>
			<list-card mode="base" :item='item' v-for="(item,index) in list" :key='index'></list-card>
			<!-- 下拉加载组件 -->
			<uni-load-more :status="load.load || 'loading'" iconType="snow"></uni-load-more>
		</list-scoll>
	
	
</template>

<script>
	export default{
		props:{
			list:{
				type:Array,
				default(){
					return []
				}
			},
			load:{
				type:Object,
				default(){
					return {
						load:'loading'
					}
				}
			}
		},
		created(){
			// console.log(this.list)
		},
		methods:{
			loadmore(){
				this.$emit('loadmore')
			}
		}
	}
</script>

<style l>
	.scoll-item{
		height: 100%;
	}
</style>
