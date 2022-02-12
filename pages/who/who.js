// pages/who/who.js
let timer = null;
Page({
	data: {
		numList:[],
		getList:[],
		minNum:null,
		shakeIng:false,
		showWho:false
	},
	onLoad: function (options) {
		this.initFun();
	},
	initFun:function(){
		let numList = [];
		for(let i = 0; i <= 99; i++){
			numList.push(i);
		}
		this.setData({
			numList:numList
		})
	},
	showNum: function (options) {
		if(this.data.minNum != 0){
			clearTimeout(timer);
			let num = 0,
					getList = this.data.getList,
					numList = this.data.numList;
			if(getList.length){
					num = numList[Math.floor(Math.random() * numList.length)];
			}else{
				num = Math.floor(Math.random() * 99);
			}
			this.setData({ shakeIng : true});
			timer = setTimeout(() => {
				if(getList.length <= 99){
					getList.unshift(num);
					numList.splice(numList.findIndex(item => item === num), 1);
					if(num == '0'){
						this.setData({
							showWho: true
						})
					}
					this.setData({
						getList:getList,
						numList:numList,
						shakeIng:false,
						minNum:Math.min(...getList)
					})
				}else{
					wx.showToast({
						icon:'none',
						title: '不是吧，你们这么多人都不去拿外卖么→_→'
					})
				}
			}, 1000);
		}else{
			wx.showToast({
				icon:'none',
				title: '重新开始吧'
			})
		}
	},
	reStart:function(){
		this.setData({
			numList:[],
			getList:[],
			minNum:null,
			shakeIng:false
		})
		this.initFun();
	},
  closeMsg:function(e){
    this.setData({
      showWho:false
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: "看看谁去拿外卖！",
      imageUrl:"/images/shareimg.png",
      path: 'pages/who/who',
      success:function(res){
      }
    }
  },
})