// pages/move/move.js
const app = getApp();
var MemberApi = require('../../apis/member.js');
var memberApi = new MemberApi();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  navigateToMoveAssess:function(){
      wx.navigateTo({
        url: '../moveassess/moveassess',
      })
  },
  navigateToMoveProject:function(){
      wx.navigateTo({
        url: '../moveproject/moveproject',
      })
  },
  navigateToMoveLocal:function(){
    wx.navigateTo({
      url: '../todo/todo?title=同城货运',
    })
  },
  navigateToMoveCross:function(){
    wx.navigateTo({
      url: '../todo/todo?title=城际货运',
    })
  },
  navigateToMoveShare:function(){
    wx.navigateTo({
      url: '../todo/todo?title=共享平台',
    })
  },
  navigateToMe:function(){
    wx.switchTab({
      url: '../../pages/member/member',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
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