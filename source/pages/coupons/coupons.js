// pages/move/move.js
const app = getApp();
var MoveassessApi = require('../../apis/moveassess.js');
var moveassessApi = new MoveassessApi();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.loginInfoReadyCallback = res => {
      this.loadOrderList();
    };
    if (app.globalData.openid != "") {
      this.loadOrderList();
    }
  },
  loadOrderList() {
    var member_id = app.globalData.member_id;
    var that = this;
    moveassessApi.list({ member_id: member_id, "orderby": "orderdatetime desc" }, function (data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        var myDate = new Date(data[i].created_date);
        myDate = new Date(myDate.getTime()+24*60*60*1000);
        var tDate = new Date(myDate.getTime() + 90 * 24 * 60 * 60*1000);
        var enddate = tDate.getFullYear().toString() + "-" + (tDate.getMonth() + 1).toString() + "-" + tDate.getDate().toString();
        data[i].enddate = enddate;
      }
      that.setData({ list: data });
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