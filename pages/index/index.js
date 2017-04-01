//获取应用实例
var util = require('../../utils/util.js')

var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
imageUrl:'../../imgs/shouye.jpg'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  consult:function(){
    wx.navigateTo({
      url: 'upload',
      success: function(res){
      },
      fail: function(res) {
      },
      complete: function(res) {
      }
    })

    // wx.chooseImage({
    //   success: function(res) {
    //     var tempFilePaths = res.tempFilePaths
    //     console.log(util.IP+'/wxUploadFile')

    //     wx.uploadFile({
    //       url: util.IP+'/wxUploadFile', //仅为示例，非真实的接口地址
    //       filePath: tempFilePaths[0],
    //       name: 'file',
    //       formData:{
    //         'user': 'test'
    //       },
    //       success: function(res){
    //         var data = res.data
    //         //do something
    //       }
    //     })
    //   }
    // })

    // wx.navigateTo({
    //   url: 'String',
    //   success: function(res){
    //     // success
    //   },
    //   fail: function(res) {
    //     // fail
    //   },
    //   complete: function(res) {
    //     // complete
    //   }
    // })


    // try {
    //   var value = wx.getStorageSync('isLogin')
    //   if (value) {
    //       // Do something with return value
    //   }else{
    //     wx.setStorage({
    //       key: 'nextPage',
    //       data: '../index/index',
    //       success: function(res){
         
    //         wx.redirectTo({
    //           url: '../login/index',
    //           success: function(res){
    //           },
    //           fail: function(res) {
    //           },
    //           complete: function(res) {
    //           }
    //         })
    //       },
    //       fail: function(res) {
    //       },
    //       complete: function(res) {
    //       }
    //     })
    //   }
    // } catch (e) {
    //   // Do something when catch error
    // }
  }
})


