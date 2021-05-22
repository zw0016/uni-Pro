<template>
	<view  class="home">
		<navbar :isSearch="true"  @input='change' v-model="value"></navbar>
		<view class="home-list">
			<view v-if='isHis' class="label-box">
				<view class="label-header">
					<text class="label-his">搜索历史</text>
					<text class="label-clear" @click="clear">清空</text>
				</view>
				<view v-if='hisList.length>0' class="label-content">
					<view  @click="clickOpen(item)" v-for="(item,index) in hisList"  :key='index' class="label-content-item" >
						{{item.name}}
					</view>

				</view>
				<view v-else class="no-data">
					没有搜索历史
				</view>
			</view>
		<!-- 	<button type="default" @click="testBtn">添加历史记录</button> -->
		<list-scoll v-else class="swiper-scoll" >
			<uni-load-more status="loading" v-if="loading" iconType="snow"></uni-load-more>
			<view v-if="searchList.length>0">
			<list-card  @pushClick='setHistory'   mode="base" :item='item' v-for="(item,index) in searchList" :key='index'></list-card>
			</view>
			<view class="no-data" v-if="searchList.length===0&&!loading">
				没有搜索数据
			</view>
		</list-scoll>
	</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				isHis:true,
				searchList:[],
				value:'',
				loading:false
			}
		},
		methods: {
			change(value){
				// //处理搜索逻辑
				//防抖和节流
				this.throttle(this.getSearch(value),1000)
				// this.getSearch(value)
			},
			getSearch(value){
				if(!value){
					this.searchList=[]
					this.isHis=true
					return
				}
				this.isHis=false
				this.loading=true
				this.$api.getSearch({
					value,
				}).then((res)=>{
					console.log(res)
					const {data}=res;
					this.searchList=data
					this.loading=false
				}).catch(()=>{
					this.loading=false
				})
			},
			//自己封装防抖函数
			debounce(func, wait, immediate) {
			    let timer;
			    return function() {
			      let context = this,
			          args = arguments;	           
			      if (timer) clearTimeout(timer);
			      if (immediate) {
			        let callNow = !timer;
			        timer = setTimeout(() => {
			          timer = null;
			        }, wait);
			        if (callNow) func.apply(context, args);
			      } else {
			        timer  = setTimeout(() => {
			          func.apply
			        }, wait)
			      }
			    }
			},
			//自己封装节流函数
			throttle(fn,wait){
			      let timeout=null;//定时器
			      let prev=Date.now//当前时间
			      return function(){
			          let that=this;
			          let now=Date.now;
			          let remainTime=wait-(now-prev);
			          let args=arguments;
			          clearInterval(timeout)
			          if(remainTime<=0){
			              fn.apply(that,args)
			          }else{
			              timeout=setTimeout(fn,remainTime)
			          }
			      }
			  },
			  setHistory(){
				  this.$store.dispatch('set_his',{
				  	name:this.value
				  })
			  },
			  clickOpen(item){
				  this.value=item.name
				  this.throttle(this.getSearch(this.value),1000)
			  },
			  clear(){
				  this.$store.dispatch('clear_his')
				  uni.showToast({
				  	title:"清空完成"
				  })
			  }
		},
		computed:{
			...mapState(['hisList'])
		},
		onLoad(){
		
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}
	.home{
		display: flex;
		flex:1;
		flex-direction: column;
		border: 1px red solid;
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
				.label-his{
					color: $mk-base-color;
				}
				.label-clear{
					color: #30b33a;
					font-weight: bolder;
				}
				
			}
			.label-content{
				display: flex;
				flex-flow: wrap;
				padding: 15px;
				padding-top: 0px;
				.label-content-item{
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
				}
			}
		}
		.no-data{
			height: 200px;
			line-height: 200px;
			width: 100%;
			text-align: center;
			font-size: 14px;
			color: #666;
		}
	}
</style>
