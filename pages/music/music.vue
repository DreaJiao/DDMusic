<template>
	<view>
		<view style="width: 90%; height: 350px;margin-left: 5%; border: #000000 solid 1px;">
			<!-- <text style="width: 100%; height: 10px;">{{musicName}}</text> -->
			<image style="width: 100%;height: 100%;" v-bind:src="musicImg" v-on:click="playMusic"></image>
		</view>
		<view style="width: 90%; height: 25px; margin-left: 5%; border: #000000 solid 1px;">
			<text>{{musicName}}</text>
		</view>
		<view style="width: 90%; height: 50px;margin-left: 5%; border: #000000 solid 1px;">
			<view style="background-color: #FFFFFF; width: 100%;height: 3px; border: #000000 solid 1px;">
				<view :style="{width:width + '%'}" style="height: 3px; background-color: #000000;"></view>
			</view>
		</view>
		<view style="justify-content: space-around; width: 90%; height: 50px;margin-left: 5%; border: #000000 solid 1px; display: flex;">
			<view style="border-radius: 60px; width: 50px; height: 50px;margin-left: 5%; border: #000000 solid 1px;"></view>
			<view style="border-radius: 60px; width: 50px; height: 50px;margin-left: 5%; border: #000000 solid 1px;"></view>
			<view style="border-radius: 60px; width: 50px; height: 50px;margin-left: 5%; border: #000000 solid 1px;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				musicId:'123',
				musicUrl:'',
				musicName:'dd',
				musicImg:'',
				musicTalk:[''],
				percentNum:61,
				width:2
				
			}
		},
		methods: {
			
		},
		onLoad(){ //option为object类型，会序列化上个页面传递的参数
				var that=this;
				uni.getStorage({
				    key: 'musicId',
				    success: function (res) {
						// console.log(that.musicId);26601005
				        console.log("音乐播放界面"+res.data);
						that.musicId=res.data;
						// var musicId=res.data;
						// 查询歌曲封面
						uni.request({
							url:"https://autumnfish.cn/song/detail?ids="+that.musicId,
							method:'GET',
							success: (res) => {
							// alert(res);
							
							console.log("musicImg"+JSON.stringify(res.data.songs[0]));
								that.musicName=res.data.songs[0].name;
								that.musicImg=res.data.songs[0].al.picUrl;
						},
						});
						uni.request({
							url:"https://autumnfish.cn/comment/hot?type=0&id="+that.musicId,
							success: (res) => {
								that.musicTalk=res.data.hotComments;
							}
						})
				    }
					
				});
				that.width = 0; //初始化0秒
				var millisecond = 0; //毫秒
				this.timer = setInterval(() => {
					millisecond = millisecond + 1000;
					if(that.width<100){
						if (millisecond >= 1000) {
							millisecond = 0;
							that.width = that.width + 1;
						}
						// that.width = that.count + '秒';
						console.log(that.width);
					}else{
						that.disabled=false;
						that.width="获取验证码"
						clearTimeout(this.timer)
					}
				}, 1000);
		  }
	}
	
</script>

<style>

</style>
