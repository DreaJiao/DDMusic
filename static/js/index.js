	export default {
		data() {
			return {
				musicList:[],
				musicId:'',
				musicUrl:'',
				musicName:'五月天',
				musicImg:'',
				musicTalk:[]
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
				uni.request({
					url:'https://autumnfish.cn/song/url?id='+musicId,
					// console.log("musicId的值"+musicId),
					method:'GET',
					success: (res) => {
						console.log("musicId的值"+musicId);
						// that.musicList.length=0;
						console.log(res.data.data[0].url);
						const innerAudioContext = uni.createInnerAudioContext();
						innerAudioContext.autoplay = true;
						innerAudioContext.src = res.data.data[0].url;//这里是传入url
						innerAudioContext.onPlay(() => {
						  console.log('开始播放');
						});
						innerAudioContext.onError((res) => {
						  console.log(res.errMsg);
						  console.log(res.errCode);
						});
					},
				})
				// uni.request({
				// 	url:"https://autumnfish.cn/song/detail?ids="+musicId,
				// 	method:'GET',
				// 	success: (res) => {
				// 		// alert(res);
				// 		// console.log("musicImg"+res.data.songs[0].al.picUrl)
				// 		that.musicImg=res.data.songs[0].al.picUrl;
				// 	},
				// })
				// uni.request({
				// 	url:"https://autumnfish.cn/comment/hot?type=0&id="+musicId,
				// 	success: (res) => {
				// 		that.musicTalk=res.data.hotComments;
				// 		}
				// })
			},
			gotoLogin(){
				// 假数据和密码
					uni.navigateTo({
					    url:"/pages/music/music?musicUrl="+this.musicUrl+"&musicImg="+this.musicImg,
					})
			},
		},
	}