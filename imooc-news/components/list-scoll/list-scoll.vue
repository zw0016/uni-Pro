<template>
	<view class="scroll">
		<!-- @scrolltolower 触发上拉 -->
	<scroll-view scroll-y class="scroll-list" @scrolltolower='loadigMore'>
		<view>
			<slot></slot>
		</view>
	</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			loadigMore(){
				// console.log('触发上拉')
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="scss">
.scroll {
		flex: 1;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
		.scroll-list {
			height: 100%;
			display: flex;
			flex-direction: column;
		}
	}
</style>
