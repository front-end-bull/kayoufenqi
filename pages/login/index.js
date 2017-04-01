//获取应用实例
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    imageUrl:'http://o6n5fh1kp.bkt.clouddn.com/10.jpg',
    msg:'提示',
    isError:false,
    phone:'',
    isGet:false,
    isPhonePass:false,
    isAuthCodePass:false,
    isGetAuthCode:false,
    authCode:'',
    isRefuse:true
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
  getAuthCode:function(){
    let phone = this.data.phone
    if(!phone){
      this.setData({
        'msg':'手机号码不能为空',
        'isError':true,
        'phone':phone,
        'isPhonePass':false,
        'isGetAuthCode':false,
        'isRefuse':true
        
      
      });
      setTimeout(()=>{
        this.setData({
          'isError':false
        })
      },2000)
    }else if(!util.checkMobile(phone)){
      this.setData({
        'msg':'手机号码不合法',
        'isError':true,
        'phone':phone,
        'isPhonePass':false,
        'isGetAuthCode':false,
        'isRefuse':true
        
      })
      setTimeout(()=>{
        this.setData({
          'isError':false
        })
      },2000)
    }else{
      this.setData({
        'isError':false,
        'phone':phone,
        'isGet':true,
        'isPhonePass':true,
        'isGetAuthCode':true,
        'isRefuse':true
        
      })

      var that = this

      wx.request({
        url: util.IP+'/user_resend_active_code',
        data: {
          phonenumber:phone
        },
        method: 'POST', 
        // header: {}, // 设置请求的 header
        success: function(res){
          console.log(res)
          setTimeout(()=>{
            that.setData({
              'isGet':false
            })
          },30000)
        },
        fail: function(res) {
        },
        complete: function(res) {
        }
      })
    }
  },
  checkPhone:function(e){
    let phone = e.detail.value
    if(!phone){
      this.setData({
        'msg':'手机号码不能为空',
        'isError':true,
        'phone':phone,
        'isPhonePass':false,
        'isGetAuthCode':false,
        'isRefuse':true
        
        
        
      })
      setTimeout(()=>{
        this.setData({
          'isError':false
        })
      },2000)
    }else if(!util.checkMobile(phone)){
      this.setData({
        'msg':'手机号码不合法',
        'isError':true,
        'phone':phone,
        'isPhonePass':false,
        'isGetAuthCode':false,
        'isRefuse':true
        
        
      })
      setTimeout(()=>{
        this.setData({
          'isError':false
        })
      },2000)
    }else{
      this.setData({
        'isError':false,
        'phone':phone,
        'isPhonePass':true,
        'isGetAuthCode':false,
        'isRefuse':true
        
      })
    }
  },
  checkAuthCode:function(e){
    let authCode = e.detail.value
    if(!authCode){
      this.setData({
        'msg':'验证码不能为空',
        'isError':true,
        'authCode':authCode,
        'isAuthCodePass':false,
        'isRefuse':true
        
      })
      setTimeout(()=>{
        this.setData({
          'isError':false
        })
      },2000)
    }else if(!util.checkAuthCode(authCode)){
      // this.setData({
      //   'msg':'验证码不合法',
      //   'isError':true,
      //   'authCode':authCode,
      //   'isAuthCodePass':false,
      //   'isRefuse':true
        
      // })
      // setTimeout(()=>{
      //   this.setData({
      //     'isError':false
      //   })
      // },2000)
    }else{
      this.setData({
        'isError':false,
        'authCode':authCode,
        'isAuthCodePass':true
      })

      // util.log('phone',this.data.isPhonePass)
      // util.log('authCode',this.data.isGetAuthCode)

      if(this.data.isPhonePass && this.data.isGetAuthCode){
        console.log('验证通过')
        this.setData({
          'isRefuse':false
        })
      }else{
        console.log('没有验证通过')
      }

    }
  },

  login:function (){
    // console.log('come in!')

    var that = this

    wx.request({
      url: util.IP+'/login',
      data: {
        phonenumber:that.data.phone,
        activecode:that.data.authCode
      },
      method: 'POST', 
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res)
        let code = res.data.data.code
        if(code==0){

          wx.setStorage({
            key: 'isLogin',
            data: true,
            success: function(res){
                wx.getStorage({
                    key: 'nextPage',
                    success: function(res){
                      console.log(res.data)
                      wx.redirectTo({
                        url:res.data,
                        success: function(res){
                        },
                        fail: function(res) {
                          console.log(res)
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
            },
            fail: function(res) {
            },
            complete: function(res) {
            }
          })

          
          // wx.getStorage({
          //   key: 'openid',
          //   success: function(res){
          //     let openid = res.data

          //   },
          //   fail: function(res) {
          //   },
          //   complete: function(res) {
          //   }
          // })
        }else{
          that.setData({
            'msg':'验证码错误',
            'isError':true
          })
          setTimeout(()=>{
            that.setData({
              'isError':false
            })
          },2000)
        }
      },
      fail: function(res) {
      },
      complete: function(res) {
      }
    })
   
  }
})


