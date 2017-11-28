// pages/member/member.js

const app = getApp();

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
    isvalidated:false
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
      console.log(app.globalData);
      that.setData({
        member_id: app.globalData.member_id,
        photo: app.globalData.photo,
        name: app.globalData.name,
        mobile: app.globalData.mobile
      });
    };
    if(app.globalData.openid!=""){
      that.setData({
        member_id: app.globalData.member_id,
        photo: app.globalData.photo,
        name: app.globalData.name,
        mobile: app.globalData.mobile
      });
    }

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
        name: app.globalData.name,
        mobile: app.globalData.mobile
      });
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