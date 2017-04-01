//app.js

var util = require('/utils/util.js')


App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: util.IP+'/getSession_key',
            data: {
              code:res.code
            },
            method: 'POST', 
            // header: {}, // 设置请求的 header
            success: function(res){
              let data = JSON.parse(res.data.data)
              console.log(data)
              wx.setStorage({
                key: 'openid',
                data: data.openid,
                success: function(res){
                },
                fail: function(res) {
                },
                complete: function(res) {
                }
              })
            },
            fail: function(res) {
              console.log(res)
            },
            complete: function(res) {
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });

  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          // console.log(res.code)
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})