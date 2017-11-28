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
    id:0,
    status: "",
    comment: "",
    professional_point: 5,
    atitude_point: 5,
    effect_point: 5
  },
  cancel(){
    wx.navigateBack({
      
    });
  },
  submit(){


    var that=this;

    orderApi.comment({ order_id: that.data.id, member_id: app.globalData.member_id, comment: that.data.comment
      , effect_point: that.data.effect_point
      , professional_point: that.data.professional_point
      , atitude_point: that.data.atitude_point }, function (data) {
      if (data.code == 0) {
        var pages = getCurrentPages();
        if (pages.length > 1) {
          //上一个页面实例对象
          var prePage = pages[pages.length - 2];
          //关键在这里
          prePage.onload();
        }
        wx.navigateBack();
      }
      });
  
  },
  comment(e) {

  }, 
  setprofessional_point(e){

    if (this.data.status == "S") {
      return;
    }
    this.setData({ professional_point: e.currentTarget.id });
  },
  setatitude_point(e) {

    if (this.data.status == "S") {
      return;
    }
    this.setData({ atitude_point: e.currentTarget.id });
  },
  seteffect_point(e) {

    if (this.data.status == "S") {
      return;
    }
    this.setData({ effect_point: e.currentTarget.id });
  },
  commentchange(e){
    if(this.data.status=="S"){
      return;
    }
    this.setData({comment:e.detail.value});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    id=5;
    this.setData({ id: id });
    this.loadData();
  },
  loadData() {
    var that = this;
    moveassessApi._get(this.data.id, function (data) {
      console.log(data);
      if ( data.status == "S") {
                  that.setData({
                    comment: data.comment
                    , professional_point: data.professional_point
                    , atitude_point: data.atitude_point
                    , effect_point: data.effect_point
                    , id: data.id
                    , status: data.status });
      } else if (data.status == "PS" ) {
          that.setData({ id: data.id
            , status: data.status
          });
        } else {
        wx.reLaunch({
          url: '../move/move',
        });
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