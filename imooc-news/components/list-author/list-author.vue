<template>
	<view class="listAuthor">
		<view class="listAuthor-image">
			<image :src="item.avatar" mode="aspectFill"></image>
		</view>
		<view class="listAuthor-content">
			<view class="listAuthor-content-title">{{item.author_name}}</view>
			<view class="listAuthor-content-des">
				<view class="listAuthor-content-des-label">{{item.professional}}</view>
				<view class="listAuthor-content-des-info">
					<text>发帖 {{item.article_likes_ids.length}}</text>
					<text>粉丝 {{item.author_likes_ids.length}}</text>
				</view>
			</view>
			
		</view>
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
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.listAuthor{
		display: flex;
		padding: 10px 0;
		margin: 0 10px;
		border-radius: 5px;
		box-sizing: border-box;
		border-bottom: 1px #f5f5f5 solid;
		.listAuthor-image{
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			overflow: hidden;
			image{
				height: 100%;
				width: 100%;
			}
		}
		.listAuthor-content{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 10px;
			width: 100%;
			.listAuthor-content-title{
				position: relative;
				padding-right:30px;
				font-size: 14px;
				color: #333;
				font-weight: bolder;
				line-height: 1.2;
			}
			.listAuthor-content-des{
				display: flex;
				justify-content: space-between;
				font-size: 12px;
				.listAuthor-content-des-label{
					color: #666;
				}
				.listAuthor-content-des-info{
					color: #999;
					line-height: 1.5;
					text:first-child{
						margin-right: 10px;
					}
				}
			}
		}
	}
</style>
