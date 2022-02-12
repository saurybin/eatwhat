// pages/cal/cal.js
Page({
	data: {
		orderList:[{
			name:"老哥1",
			bzMoney:"",
			totalMoney:"",
		}],
		finalp:"",
		calList:[],
		Idx:1,
		showResult:false,
		fromShare:false
	},
	onLoad: function (params) {
		if(params.data){
			this.setData({
				calList:JSON.parse(params.data),
				fromShare:true
			})
			wx.setNavigationBarTitle({
				title: '账单明细',
			})
		}
	},
	addOne: function () {
		let idx = this.data.Idx + 1;
		this.setData({
			Idx:idx,
			orderList:this.data.orderList.concat({
				name:"老哥"+idx,
				bzMoney:"",
				totalMoney:""
			}),
		})
	},
	delItem: function (e) {
		let idx = e.currentTarget.dataset.idx;
		this.data.orderList.splice(idx, 1);
		this.setData({
			orderList: this.data.orderList
		})
	},
	setTxt: function (e) {
		let value = e.detail.value,
				idx = e.currentTarget.dataset.idx,
				msg = e.currentTarget.dataset.msg,
				orderList = this.data.orderList;
		if(msg == 'finalp'){
			this.setData({finalp:value})
		}else{
			orderList[idx][msg] = value;
			this.setData({orderList:orderList})
		}
	},
	calFun: function () {
		if(this.data.finalp != ""){
			let orderList = this.data.orderList,
					calList = [],
					totalYj = 0;
			for(let i in orderList){
				totalYj += Number(orderList[i].bzMoney || 0) + Number(orderList[i].totalMoney || 0);
			}
			for(let i in orderList){
				calList[i] = {
					sName: orderList[i].name,
					sPrice:((Number(orderList[i].bzMoney || 0) + Number(orderList[i].totalMoney || 0))/totalYj * (this.data.finalp || 0)).toFixed(2)
				};
			}
			this.setData({
				showResult:true,
				calList:calList
			})
		}else{
			wx.showToast({
				icon:'none',
				title: '好家伙，天下竟有免费的午餐么',
			})
		}
	},
	resetFun: function (e) {
		this.setData({
			orderList:[{
				name:"老哥1",
				bzMoney:"",
				totalMoney:"",
			}],
			finalp:"",
			calList:[],
			Idx:1
		})
	},
	closeMsg: function (e) {
		this.setData({
			showResult:false
		})
	},
	onShareAppMessage: function () {
    return {
      title: "老板，账单过目一下",
      imageUrl:"/images/shareimg.png",
      path: 'pages/cal/cal?data='+JSON.stringify(this.data.calList),
      success:function(res){
      }
    }
	}
})