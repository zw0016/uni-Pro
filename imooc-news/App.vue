<script>
	export default {
		onLaunch: function() {
			//正常登陆页面然后进行跳转
			// uni.login({
				
			// })
			//请求接口异步请求
			//处理登陆逻辑
			console.log('App Launch')
			this.$api.getUser({
				user_id:"5fdbfa84fc3f47000165535a"
			}).then(res=>{
				console.log(res)
				const {data}=res
				this.$store.dispatch('set_userinfo',data)
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import '@/components/gaoyia-parse/parse.css';
</style>
