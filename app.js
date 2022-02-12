// app.js
App({
  onLaunch() {
    if(new Date().getTime() < 1623902400000){
      wx.setStorageSync('sdate', '1623902400000');
    }
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
        wx.showModal({
            title: '更新提示', 
            content: '新版本已准备好，是否重启？',
            success: function (res) {
                if (res.confirm) {
                    updateManager.applyUpdate()
                }
            }
          })
    })
    updateManager.onUpdateFailed(function () {
    })
  }
})