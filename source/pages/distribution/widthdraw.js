// pages/distribution/widthdraw.js
const app = getApp();
var DistributionApi = require('../../apis/distribution.js');
var distributionApi = new DistributionApi();
var MemberApi = require('../../apis/member.js');
var memberApi = new MemberApi();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    earnmoney:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var member_id = app.globalData.member_id;
    console.log(member_id);
    if (member_id == undefined || member_id == 0) {
      wx.switchTab({
        url: '../member/member',
      });
    }
    var that = this;
    memberApi.info({ member_id: member_id }, function (data) {
      console.log(data);
      that.setData({ earnmoney: data.earnmoney?data.earnmoney:0 });
    });
  },
  cancel(){
    wx.navigateBack({
      
    });
  },
  submit() {
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