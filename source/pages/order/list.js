// pages/order/list.js
const app=getApp();
var MoveassessApi=require('../../apis/moveassess.js');
var moveassessApi=new MoveassessApi();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.loginInfoReadyCallback = res => {
      this.loadOrderList(app.globalData.member_id);
    };
    if (app.globalData.openid != "") {
      this.loadOrderList(app.globalData.member_id);
    }
  },
  loadOrderList(member_id){
    var that=this;
    moveassessApi.list({ member_id: member_id,"orderby":"orderdatetime desc"},function(data){
      that.setData({list:data});
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