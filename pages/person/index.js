//获取应用实例
var app = getApp()
Page({
  data: {

  },
  onLoad: function () {
     try {
      var value = wx.getStorageSync('isLogin')
      if (value) {
          // Do something with return value
      }else{
        wx.setStorage({
          key: 'nextPage',
          data: '../index/index',
          success: function(res){
         
            wx.redirectTo({
              url: '../login/index',
              success: function(res){
              },
              fail: function(res) {
              },
              complete: function(res) {
              }
            })
          },
          fail: function(res) {
          },
          complete: function(res) {
          }
        })
      }
    } catch (e) {
      // Do something when catch error
    }
  }
 
})


