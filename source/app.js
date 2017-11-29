//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力

    var QQMapWX = require('libs/qqmap/qqmap-wx-jssdk.js');

    this.qqmapsdk = new QQMapWX({
      key: 'IDVBZ-TSAKD-TXG43-H442I-74KVK-6LFF5'
    });


    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);


    var APIConfig = require('ApiConfig.js');
    this.apiconfig = new APIConfig();

    var that=this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        var WechatApi = require('apis/wechat.js');
        var wechatApi=new WechatApi();
        wechatApi.decryption({ code: res.code, grant_type: "authorization_code" }, function (data) {
          data = JSON.parse(data);
          that.globalData.openid = data.openid;
          that.globalData.session_key = data.session_key;
          
            var MemberApi = require('/apis/member.js');
            var memberApi=new MemberApi();
            memberApi.oauthlogin({
              oauthtype: "MINI",
              oauthunionid: that.globalData.openid
            }, function (ret) {
              if (ret.code == 0) {
                ret = ret.return;
                console.log(ret);
                that.globalData.member_id = ret.id;
                that.globalData.mobile = ret.mobile;
                that.globalData.name = ret.name;
                that.globalData.photo = ret.photo;


              }else{
                wx.redirectTo({
                  url: '../../pages/signup/signup'
                });
              }
              if (that.loginInfoReadyCallback) {
                that.loginInfoReadyCallback(data);
              }
            });
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country

              that.globalData.userInfo = res.userInfo;
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })

        });
      }
    })
    // 获取用户信息
    //感觉不应该这么写才对
    // wx.getSetting({
    //   success: res => {
    //     console.log(res);
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    member_id: "",
    mobile: "",
    name: "",
    photo: "",
    openid: "",
    session_key: "",
    userInfo: null
  },
  qqmapsdk: null,
  apiconfig: null
})