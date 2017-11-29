// pages/distribution/list.js
const app = getApp();
var DistributionApi = require('../../apis/distribution.js');
var distributionApi = new DistributionApi();
var MemberApi = require('../../apis/member.js');
var memberApi = new MemberApi();

var utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    earnmoney:0,
    member_id: 0,
    inputShowed: false,
    inputVal: "",
    activeorderlist: []
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
    var e = { detail: { value: "" } };
    this.inputTyping(e);
  },
  inputTyping: function (e) {
    var that = this;
    this.setData({
      inputVal: e.detail.value
    });
    var key = e.detail.value;
    var activeorderlist = this.data.activeorderlist;


    for (var i = 0; i < activeorderlist.length; i++) {
      if (key == "") {
        activeorderlist[i].inkey = true;
        continue;
      }
      if (activeorderlist[i].disorderno.indexOf(key) > -1
        || activeorderlist[i].member_mobile.indexOf(key) > -1) {
        activeorderlist[i].inkey = true;
      } else {
        activeorderlist[i].inkey = false;
      }
    }

    this.setData({
      activeorderlist: activeorderlist
    });

  },
  goWithdraw(){
    wx.navigateTo({
      url: 'widthdraw',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var member_id = app.globalData.member_id;
    
    console.log(member_id);
    if(member_id==undefined||member_id==0){
      wx.switchTab({
        url: '../member/member',
      });
    }
    var that=this;
    memberApi.info({member_id:member_id},function(data){
      that.setData({earnmoney:data.earnmoney});
    });


    var that = this;
    distributionApi.orderlist({ member_id: member_id }, function (data) {
      for (var i = 0; i < data.length; i++) {
      }
      var activeorderlist = [];
      for (var i = 0; i < data.length; i++) {
        var order = data[i];
        if (order.status == "PS" || order.status == "S") {
          order.shared_date = utils.formatTime2(new Date(order.shared_date));
          order.orderdatetime = utils.formatTime2(new Date(order.orderdatetime));
          order.inkey = true;
          activeorderlist.push(order);
        }
      }
      that.setData({activeorderlist: activeorderlist });

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