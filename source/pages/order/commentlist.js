// pages/order/list.js
const app = getApp();
var MoveassessApi = require('../../apis/moveassess.js');
var moveassessApi = new MoveassessApi();
var OrderApi = require('../../apis/order.js');
var orderApi = new OrderApi();

var utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  comment(e) {

    var id = e.currentTarget.id; wx.navigateTo({
      url: 'comment?id=' + id,
    });
  },
  payment(e) {
    var id = e.currentTarget.id; wx.navigateTo({
      url: 'comment?id=' + id,
    });
  },
  cancelorder(e) {
    var id = e.currentTarget.id;
    var that = this;

    orderApi.cancel({ order_id: id, member_id: app.globalData.member_id }, function (data) {
      if (data.code == 0) {
        var list = that.data.list;
        for (var i = 0; i < list.length; i++) {
          if (list[i].id == id) {
            list[i].status = 'C';
            break;
          }
        }
        that.setData({ list: list });
        wx.showToast({
          title: '取消成功',
        });

      } else {

        wx.showToast({
          title: '取消失败，请联系客户进行处理',
        });
      }
    });
  },
  goDetail(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: 'detail?id=' + id,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
    moveassessApi.list({ member_id: member_id,status:"PS", "orderby": "orderdatetime desc" }, function (data) {
      for (var i = 0; i < data.length; i++) {
        var date = new Date(data[i].orderdatetime);
        data[i].orderdatetime = utils.formatTime2(date);
        date = new Date(data[i].created_date);
        console.log(data[i].created_date);
        data[i].created_date = utils.formatTime2(date);
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
    this.loadOrderList();
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