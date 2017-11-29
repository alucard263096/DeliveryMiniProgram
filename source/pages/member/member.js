// pages/member/member.js

const app = getApp();
var MemberApi = require('../../apis/member.js');
var memberApi = new MemberApi();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wechat:"",
    photo:"",
    name:"",
    mobile:"",
    member_id:"",
    authed_status:""
  }, 
  goEarn(){

    wx.navigateTo({
      url: '../distribution/earn',
    });
  },
  goDistribution(){
    wx.navigateTo({
      url: '../distribution/list',
    });
  },
  govalidate(){
    wx.navigateTo({
      url: 'auth',
    })
  },
  goCommentList(){
    wx.navigateTo({
      url: '../order/commentlist',
    })
  },
  goOrderList:function(){
      wx.navigateTo({
        url: '../order/list',
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    app.loginInfoReadyCallback = res => {
      
      this.onShow();
    };
    this.onShow();

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
    if (app.globalData.openid != "") {
      this.setData({
        member_id: app.globalData.member_id,
        photo: app.globalData.photo,
        name: app.globalData.name.substring(0,15),
        mobile: app.globalData.mobile
      });
      var that=this;
      memberApi.info({ member_id: app.globalData.member_id},
      function(data){
        that.setData({
          authed_status: data.authed_status});
      },false);
    }
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