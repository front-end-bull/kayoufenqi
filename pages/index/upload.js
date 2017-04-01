//获取应用实例
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
      'pic1_url':'../../imgs/pic1.jpg',
      'pic2_url':'../../imgs/pic2.jpg',
      'pic3_url':'../../imgs/pic3.jpg',
      'isUpload1':true,
      'isUpload2':true,
      'isUpload3':true,
      'isReplace1':false,
      'isReplace2':false,
      'isReplace3':false,
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
  upload1:function(){
    var that = this
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        // console.log(util.IP+'/wxUploadFile')
        wx.uploadFile({
          url: util.IP+'/wxUploadFile', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData:{
          },
          success: function(res){
            let url = JSON.parse(res.data).url
            util.log('url',url)
            that.setData({
              pic1_url:url,
              isUpload1:false,
              isReplace1:true
            })
            util.log('pic1_url',that.data.pic1_url)
            util.log('isUpload1',that.data.isUpload1)
          }
        })
      }
    })
  },
  upload2:function(){
    var that = this
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        // console.log(util.IP+'/wxUploadFile')
        wx.uploadFile({
          url: util.IP+'/wxUploadFile', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData:{
          },
          success: function(res){
            let url = JSON.parse(res.data).url
            that.setData({
              pic2_url:url,
              isUpload2:false,
              isReplace2:true
            })
          }
        })
      }
    })
  },
  upload3:function(){
    var that = this
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        // console.log(util.IP+'/wxUploadFile')
        wx.uploadFile({
          url: util.IP+'/wxUploadFile', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData:{
          },
          success: function(res){
            let url = JSON.parse(res.data).url
            that.setData({
              pic3_url:url,
              isUpload3:false,
              isReplace3:true
            })
          }
        })
      }
    })
  }



})


