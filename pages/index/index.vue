<template>
	<view class="container">
		<view class="findView">
			<input class="find" confirm-type="search" placeholder="请输入你要搜索的歌名"  v-model="musicName"/>
			<button class="findButton" v-on:click="query" >搜索</button>
		</view>
		<view class="aMusic" v-for="(music,index) in musicList" v-bind:key="index" >
			<view class="musicName"  v-on:click="startMusic(music.musicId)">
				{{index+1}}: {{music.name}} 
			</view>

			<view class="musicInf" >
				<view class="musicSong1" >{{music.musicSong}}</view>
				<view class="musicSong2" >{{music.musicAlbum}}</view>
			</view>
		</view>
		<view>
			<audio></audio>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				musicList:[],
				musicId:'',
				musicUrl:'',
				musicName:'',
				musicImg:'',
				musicTalk:[],
				startM:false,
			}
		},
		methods: {
			// var musicid;
			query(){
				var that=this;
						uni.request({
							url:'https://autumnfish.cn/search?keywords='+that.musicName,
							method:'GET',
							success: (res) => {
								// 取出音乐列表
									// var music=res.data.result.songs[0];
								that.musicList.length=0;
								// console.log(res.data.result.songs);
								for (var music of res.data.result.songs) {
									var obj = {
										"name": music.name,
										"musicSong": music.artists[0].name,
										"musicAlbum": music.album.name,
										"musicId":music.id,
									};
									// musicId=music.id;
									that.musicList.push(obj);
								}
							},
					}
				)
			},	
			startMusic(musicId){
				var that=this;
				const innerAudioContext = uni.createInnerAudioContext();
				uni.request({
					url:'https://autumnfish.cn/song/url?id='+musicId,
					// console.log("musicId的值"+musicId),
					method:'GET',
					success: (res) => {
						// const innerAudioContext = uni.createInnerAudioContext();
						if(that.startM===false){
							console.log("musicId的值"+musicId);
							// that.musicList.length=0;
							console.log(res.data.data[0].url);
							innerAudioContext.autoplay = true;
							innerAudioContext.src = res.data.data[0].url;//这里是传入url
							innerAudioContext.onPlay(() => {
							  console.log('开始播放');
							  that.startM=!that.startM;
							  // 将id进行缓存，以便于音乐界面进行调用 key为musicId
							  uni.setStorage({
							      key: 'musicId',
							      data: musicId,
							      success: function () {
							          console.log('success');
							      }
							  });
							  // this.gotoLogin()
							});
						}
						
						
						innerAudioContext.onError((res) => {
						  console.log(res.errMsg);
						  console.log(res.errCode);
						});
						
					},
				})
			},
			gotoLogin(){
					uni.switchTab({
						url:"/pages/music/music"
					})
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		/* display: flex; */
		/* flex-wrap: wrap; */
		
	}
	.findView{
		display: flex;
	}
	.find{
		width: 84%;
		height: 25px;
		border-radius: 3px;
		border: black solid 1px;
	}
	.aMusic{
		margin-top: 10px;
		width: 100%;
		height: 65px;
	}
	.musicName{
		width: 100%;
		height: 30px; 
		border: black 1px solid;
		border-radius: 3px;
	}
	.musicInf{
		width: 100%;
		height: 30px; 
		border: black 1px solid;
		border-radius: 3px; 
		display: flex;
	}
	.musicSong1{
		width: 33%;
		height: 28px; 
		font-size: 10px;
		/* border: #007AFF solid 1px; */
	}
	.musicSong2{
		width: 66%;
		height: 28px; 
		font-size: 10px;
		/* border: #007AFF solid 1px; */
	}
	.findButton{
		margin-left: 5px;
		width: 50px;
		height: 27px;
		font-size: 10px;
		color: white;
		background-color: black;
	}
</style>
