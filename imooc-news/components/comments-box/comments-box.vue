<template>
	<view class="comments-box">
		<view class="comments-header">
			<view class="comments-header-logo">
				<image :src="comments.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comments-header-info">
				<view v-if="!comments.is_reply" class="title">{{comments.author.author_name}}</view>
				<view v-else="!comments.is_reply" class="title">
					{{comments.author.author_name}}
					<text class="replyText">回复</text>{{comments.to}}
				</view>
				<view>{{comments.create_time | formatTime()[0]}}</view>
			</view>
		</view>
		<view class="comments-content">
			<view>
				{{comments.comment_content}}
			</view>
			<view class="comments-info">
				<view class="comments-button" @click="commentsReply({comments,is_reply:reply})">
					回复
				</view>
			</view>
			<view class="comments-reply" v-for="(item,index) in comments.replys" :key='index'>
				<!-- reply 属性区分自己还是回复调用 -->
				<commentsBox :comments='item' :reply='true' @reply='commentsReply'></commentsBox>
			</view>
		</view>
	</view>
</template>

<script>
	import commentsBox from '@/components/comments-box/comments-box.vue'
	import {
		parseTime
	} from '@/utils/index.js'
	export default {
		name: 'commentsBox',
		components: {
			commentsBox
		},
		props: {
			comments: {
				type: Object,
				default () {
					return {}
				}
			},
			reply: {
				type: Boolean,
				default: false
			}
		},
		//过滤器
		filters: {
			formatTime(time) {
				return [
					parseTime(time)
				]
			}
		},
		data() {
			return {

			};
		},
		methods: {
			commentsReply(comments) {
				//区分主回复还是子回复
				if (comments.is_reply) {
					comments.comments.reply_id = comments.comments.comment_id
					comments.comments.comment_id = this.comments.comment_id
				}
				//由于递归调用会执行多次
				this.$emit('reply', comments)
			}
		}
	}
</script>

<style lang="scss">
	.comments-box {
		margin: 15px 0;

		.comments-header {
			display: flex;

			.comments-header-logo {
				width: 30px;
				height: 30px;
				flex-shrink: 0;
				border-radius: 5px;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;

				}
			}

			.comments-header-info {
				display: flex;
				flex-direction: column;
				padding-left: 15px;
				font-size: 12px;
				color: #999;
				line-height: 1;

				.title {
					margin-bottom: 10px;
					font-size: 14px;
					color: #333;

					.replyText {
						margin: 0 10px;
						font-weight: bolder;
						color: #000;
					}
				}
			}
		}

		.comments-content {
			margin-top: 10px;
			font-size: 14px;
			color: #000;

			.comments-info {
				margin-top: 15px;
				display: flex;

				.comments-button {
					padding: 2px 10px;
					font-size: 12px;
					color: #999;
					border-radius: 20px;
					border: 1px #ccc solid;
				}
			}

			.comments-reply {
				display: flex;
				margin: 15px;
				padding: 0 10px;
				border: 1px #eee solid;
			}
		}
	}
</style>
