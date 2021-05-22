<template>
	<swiper class=" home-swiper" @change='change' :current="activeIndex">  
		<swiper-item v-for="(item,index) in tab" :key="index"   class=" swiper-item">
		<list-item :list='listCatchData[index]'  :load='load[index]'  @loadmore='loadmore'></list-item>		
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		props:{
			tab:{
				type:Array,
				default(){
					return []
				}
			},
			activeIndex:{
				type:Number,
				default:0
			}
		},
		components:{
			listItem
		},
		data() {
			return {
				list:[],
				//缓存
				listCatchData:{},
				load:{
					page:1,
					load:'loading',
				},
				pageSize:10,
			};
		},
		created(){
			//根据下标初始化数据
			//tab 还没有赋值
			// this.getList('0')
				uni.$on('update_article',(e)=>{
					console.log(e)
					if(e==='follow'){
						this.listCatchData = {}
						this.load = {}
						this.getList(this.activeIndex)
					}

						})
		},
		watch:{
			tab(newVal) {
							if (newVal.length === 0) return
							this.listCatchData = {}
							this.load = {}
							this.getList(this.activeIndex)
						}
		},
		methods:{
			//切换
			change(e){
				//获取当前下标
				const {current}=e.detail
				//当前元素
				// console.log(this.tab[current].name)
			
				//将下标传递给index页面
				this.$emit('change',current)
				//每次切换getList 方法筛选数据
				//当数据不存在或者长度为0的时候请求数据
				if(!this.listCatchData[current]||this.listCatchData[current].length===0){
					this.getList(current)
				}

			},
			//根据name 筛选数据 
			//注意  {name} 要用对象的方法进行传参
			getList(current){
				if(!this.load[current]){
					this.load[current]={
						page:1,
						load:'loading'
					}
				}
				this.$api.getList({
					name:this.tab[current].name,
					//实现分页功能
					page:this.load[current].page,
					pageSize:this.pageSize
				}).then((res)=>{
					// console.log(res)
					const {data}=res;
					if(data.length===0){
						let oldLoad={}
						oldLoad.load='noMore'
						oldLoad.page=this.load[current].page
						this.$set(this.load,current,oldLoad)
						
					}
					let oldList=this.listCatchData[current]||[]
					oldList.push(...data)
					//	懒加载
					this.$set(this.listCatchData,current,oldList)
				})
			},
			loadmore(){
				console.log('触发上拉')
				this.load[this.activeIndex].page++
				this.getList(this.activeIndex)
			}
		}
	}
</script>

<style lang="scss">
.home-swiper{
	height: 100%;
	.swiper-item{
		height: 100%;
		overflow: hidden;
		.swiper-scoll{
			height: 100%;
		}
	}
}
</style>
