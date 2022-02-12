import Machine from "../../components/slotmachine/slotmachine.js"
let slotBlockWidth = wx.getSystemInfoSync().windowWidth * 0.135;
let myFoods = "饺子馄饨,快餐便当,汉堡薯条,意面披萨,包子粥店,米粉面馆,麻辣烫,炸鸡炸串,特色小吃,西餐,夹馍饼类,日料寿司,韩式料理,火锅串串,龙虾烧烤,轻食沙拉,东南亚菜";
Page({
  data: {
    isShowMsg:false,
    foodsDatas:wx.getStorageSync('myfoods') || myFoods,
    foodsDatas1:"",
    inChoose:false,
    num1: 0,
    num2: 0,
    num3: 0,
    speed:30,
    isSloting:true,
    isForbidden:new Date().getTime() < Number(wx.getStorageSync("sdate")) ? false : true,
    machine: {
      transY1: 0,
      transY2: 0,
      transY3: 0,
      nums: []
    }
  },
  onLoad() {
    this.initSlot();
  },
  initSlot:function(){
    let that = this;
    let numbs = this.data.foodsDatas.split(",");
    this.setData({
      machine: {
        transY1: Math.floor(-Math.random() * (numbs.length-1)) * slotBlockWidth,
        transY2: Math.floor(-Math.random() * (numbs.length-1)) * slotBlockWidth,
        transY3: Math.floor(-Math.random() * (numbs.length-1)) * slotBlockWidth,
        nums: numbs
      }
    })
    this.machine = new Machine(this, {
      height: slotBlockWidth,  //单个数字高度
      len: numbs.length-1,  //数字个数   
      transY1: this.data.machine.transY1,
      num1: this.data.num1,
      transY2: this.data.machine.transY2,
      num2: this.data.num2,
      transY3: this.data.machine.transY3,
      num3: this.data.num3,
      speed: this.data.speed,
      callback: (res) => {
        that.setData({
          isSloting:true,
          ballAni:""
        })
      }      
    })
  },
  slotFun:function(){
    let that = this;
    let eatThis = Math.floor(Math.random() * this.data.machine.nums.length);
    this.setData({
      isSloting:false,
      num1:eatThis,
      num2:eatThis,
      num3:eatThis,
      ballAni:"ani"
    })
    this.machine.start();
  },
  setFoodsData:function(e){
    let value = e.detail.value.replace("，",",").replace(" ",",");
    this.setData({
      foodsDatas1:value
    })
  },
  setFoods:function(e){
    if(this.data.foodsDatas1){
      if(this.data.foodsDatas1.split(",").length < 2){
        wx.showToast({
          icon:'none',
          title: '你都知道吃啥了，至少给2个选择吧',
        })
      }else{
        this.setData({
          foodsDatas:this.data.foodsDatas1,
          isShowMsg:false
        })
        wx.setStorageSync('myfoods', this.data.foodsDatas1);
        this.initSlot();
        this.slotFun();
      }
    }else{
      wx.showToast({
        icon:'none',
        title: '要不咱写点什么？',
      })
    }
  },
  resetFoods:function(){
    this.setData({
      foodsDatas1:myFoods
    })
  },
  clearFoods:function(){
    this.setData({
      foodsDatas1:""
    })
  },
  showMsg:function(e){
    this.setData({
      isShowMsg:true
    })
  },
  closeMsg:function(e){
    this.setData({
      isShowQr:false,
      isShowMsg:false
    })
  },
  openEM:function(e){
    let platform = e.currentTarget.dataset.platform;
    let type = e.currentTarget.dataset.type;
    if(platform == "elm"){
      let path = "";
      switch (type) {
        case "1":
          path = "pages/sharePid/web/index?scene=s.click.ele.me/5jotImu&o2i_sharefrom=wxminiapp";
          break;
        case "2":
          path = "ele-recommend-price/pages/guest/index?chInfo=ch_app_chsub_Wechat&_ltracker_f=tjyj2_app_grzx2&inviterId=5e93b12";
          break;
        case "3":
          path = "taoke/pages/shopping-guide/index?scene=JWB6Lmu";
          break;
        default:
          break;
      }
      wx.navigateToMiniProgram({
        appId: 'wxece3a9a4c82f58c9',
        path: path,
        success(res) {
          // 打开成功
        }
      })
    }else{
      let path = "outer_packages/r2xinvite/coupon/coupon?inviteCode=NnOIp-QOs8SiYF1dcSlL5r8phPrCf6qkH7evMyjIoup2NXxNCLYcBbd3bqpv2X2Isa4sAcwwtgMW1R1eMkRlyETf6P5c6xL_sqJlwVhRVviBf0slfBdeHdgfpdFoYOc-a8D3zKMyejpXres8li4tcw";
      wx.navigateToMiniProgram({
        appId: 'wx2c348cf579062e56',
        path: path,
        success(res) {
          // 打开成功
        }
      })
    }
  },
  toDet:function(e){
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: `/pages/${url}/${url}`,
    })
  },
  touchPanda:function(e){
    let title = ['你坏坏~','你不要过来啦~','你在点哪里~','领个红包点外卖吧~','点点看看吃啥~'][Math.floor(Math.random()*5)];
    wx.showToast({
      icon:"none",
      title: title,
    })
  },
  showWx:function(){
    this.setData({ isShowQr: true })
  },
  onShareAppMessage: function (res) {
    return {
      title: "今天吃点啥呢？",
      imageUrl:"/images/shareimg.png",
      path: 'pages/index/index',
      success:function(res){
      }
    }
  },
})
