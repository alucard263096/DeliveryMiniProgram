// pages/order/payment.js
const app=getApp();
var MoveassessApi=require('../../apis/moveassess.js');
var moveassessApi = new MoveassessApi();
var OrderApi = require('../../apis/order.js');
var orderApi = new OrderApi();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    paymenttype:"",
    paymentamount:0
  },
  submit(){
    if (this.data.paymenttype==""){

      wx.showModal({
        title: '提示',
        content: '请选择支付方式',
        showCancel:false
      })
      return;
    }
    var that=this;
    if(this.data.paymenttype=="OFF"){
      wx.showModal({
        title: '现场支付',
        content: '费用已经给现场负责人',
        success: function (res) {
          if (res.confirm) {

            orderApi.payment({ order_id: that.data.id, member_id: app.globalData.member_id,paymenttype:that.data.paymenttype }, function (data) {
              if(data.code==0){
                var pages = getCurrentPages();
                if (pages.length > 1) {
                  //上一个页面实例对象
                  var prePage = pages[pages.length - 2];
                  //关键在这里
                  prePage.loadOrderList();
                }
                wx.navigateBack();
              }
              
            });
            
          }
        }
      });
    } else if (this.data.paymenttype == "ON") {
      wx.showModal({
        title: '微信支付',
        content: '支付接口申请中',
        showCancel: false, 
        success: function (res) {
          if (res.confirm) {
            orderApi.payment({ order_id: that.data.id, member_id: app.globalData.member_id, paymenttype: that.data.paymenttype }, function (data) {
              if (data.code == 0) {
                var pages = getCurrentPages();
                if (pages.length > 1) {
                  //上一个页面实例对象
                  var prePage = pages[pages.length - 2];
                  //关键在这里
                  prePage.loadOrderList();
                }
                wx.navigateBack();
              }
            });
          }
        }
      });
    }

  },
  changepaymenttype(e){
      var paymenttype=e.currentTarget.id;
      this.setData({ paymenttype: paymenttype});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id;
    this.setData({id:id});
    this.loadData();
  },
  loadData(){
    var that = this;
    moveassessApi._get(this.data.id, function (data) {
      if (data.status != "OF") {
        wx.reLaunch({
          url: '../move/move',
        });
      } else {
        that.setData({ paymentamount: data.paymentamount });
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
    this.loadData();
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