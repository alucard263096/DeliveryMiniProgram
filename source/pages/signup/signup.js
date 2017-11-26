// pages/signup/signup.js
const app = getApp();

var MemberApi=require('../../apis/member.js');
var memberApi=new MemberApi();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSplash:true,
    isAgree:true,
    avatarUrl: "",
    nickname: "",
    gender: "",
    reminderResend:0,
    mobile:"",
    verifycode:"",
    showTopTips:"",
    redirectpage:"",
    istab:""
  }, 
  submitRegister: function () {

    if (this.data.isAgree==false){
      this.setData({ showTopTips: "请先阅读并勾选同意《用户注册条款》" });
      return;
    }
    if (this.data.nickname.trim()=="") {
      this.setData({ showTopTips: "请输入昵称" });
      return;
    }

    if (this.data.nickname.trim() == "") {
      this.setData({ showTopTips: "请输入昵称" });
      return;
    }
    var mobile = "";
    try {
      mobile = parseInt(this.data.mobile).toString();
    } catch (e) {

    }
    if (mobile[0] != "1" || mobile.length.toString() != "11") {
      this.setData({ showTopTips: "请输入正确的手机号码" });
      return;
    }
    if (this.data.verifycode.trim() == "") {
      this.setData({ showTopTips: "验证码不能为空" });
      return;
    }
    this.setData({ showTopTips: "" });
    var that=this;
    memberApi.oauthregister({
      oauthtype:"MINI",
      oauthunionid: app.globalData.openid,
      mobile:mobile,
      verifycode:this.data.verifycode,
      name:this.data.nickname,
      photo: this.data.avatarUrl
    },function(data){
        if(data.code==-501){
          that.setData({ showTopTips: "验证码不正确" });
        } else if (data.code == - 403) {
          that.setData({ showTopTips: "请输入正确的手机号码" });
        } else if (data.code == - 301) {
          //that.setData({ showTopTips: "" });
          //直接登录
        } else if (data.code == 0) {
          wx.switchTab({
            url: '../move/move'
          });
        } else{
          that.setData({ showTopTips: "未知错误，请联系管理员" });
        }
    });
  },
  agreechange:function(e){
    this.setData({ isAgree: !this.data.isAgree });
  },
  nicknamechange:function(e){

    this.setData({ nickname: e.detail.value });
  },
  verifycodechange: function (e) {

    this.setData({ verifycode: e.detail.value });
  },
  mobilechange:function(e){
    this.setData({mobile:e.detail.value});
  },
  sendRegisterVerify:function(){  
    var mobile="";
    try{
      mobile = parseInt(this.data.mobile).toString();
    }catch(e){

    }
    if (mobile[0] != "1" || mobile.length.toString() != "11"  ){
      wx.showToast({
        title: '手机号码不正确，请重新输入',
        icon:"warn",
        duration: 5000
      });
      return;
    }
    var that=this;
    memberApi.sendregisterverifycode({ mobile: mobile},
    function(data){
      that.setData({ reminderResend: 60 });
      var interval = setInterval(function () {
        var reminderResend = that.data.reminderResend;
        reminderResend--;
        that.setData({ reminderResend: reminderResend });
        if (reminderResend == 0) {
          clearInterval(interval);
        }
      }, 1000);
    });


    
  },
  getPicture: function () {
    var that=this;
    wx.showActionSheet({
      itemList: ['从照片中选择', '拍照'],
      success: function (res) {
        if (!res.cancel) {
          if(res.tapIndex==0){
            wx.chooseImage({
              count: 1, // 默认9
              sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
              success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths
              }
            })
          }else{
            wx.chooseImage({
              count: 1, // 默认9
              sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: [ 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                  url: app.apiconfig.FileUploadUrl, //仅为示例，非真实的接口地址
                  filePath: tempFilePaths[0],
                  name: 'file',
                  formData: {
                    'module': 'member',
                    "field": "file"
                  },
                  success: function (res) {
                    var data = res.data
                    if (data.substr(0, 7) == "success") {
                      data = data.split("|");
                      var avatarUrl = app.apiconfig.UploadFolderUrl + "/member/" + data[2];
                      that.setData({ avatarUrl: avatarUrl });
                    } else {
                      wx.showToast({
                        title: '上传失败，请重试',
                        icon: 'warn',
                        duration: 2000
                      })
                    }
                    //do something
                  }
                });
              }
            })
          }
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var redirectpage=options.redirectpage;
    if (redirectpage==undefined){
      redirectpage="../move/move";
    }
    this.setData({ redirectpage: redirectpage});

    var that = this;
    app.loginInfoReadyCallback=res=>{
      that.oauthlogin();
    };

    setTimeout(function(){
      that.oauthlogin();
    },3000);


    if (app.globalData.userInfo) {
      console.log(1);
      this.setData({
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickname: app.globalData.userInfo.nickName,
        gender: app.globalData.userInfo.gender
      });

    } else if (this.data.canIUse) {
      console.log(2);
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName,
          gender: res.userInfo.gender
        });
      }
    } else {
      console.log(3);
      console.log(app.globalData);
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          console.log(app.globalData);
          this.setData({
            avatarUrl: res.userInfo.avatarUrl,
            nickname: res.userInfo.nickName,
            gender: res.userInfo.gender
          });
        }
      })
    }
  },
  oauthlogin:function(){
    var that = this;
    memberApi.oauthlogin({
      oauthtype: "MINI",
      oauthunionid: app.globalData.openid}, function (data) {
      if(data.code==0){
        console.log("??redirectTo:" + that.data.redirectpage);
        data = data.return; 
        app.globalData.member_id = data.id;
        app.globalData.mobile = data.mobile;
        app.globalData.name = data.name;
        app.globalData.photo = data.photo;
        wx.switchTab({
          url: that.data.redirectpage
        });
      }else{
        that.setData({ showSplash:false});
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})