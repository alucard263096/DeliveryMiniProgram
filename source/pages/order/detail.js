// pages/order/detail.js
const app = getApp();
var MoveassessApi = require('../../apis/moveassess.js');
var moveassessApi = new MoveassessApi();

var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    orderno:"",
    status:"",
    paymenttype:"",
    assessamount:0,
    payamount:0,
    created_date:"",
    accepted_year:1970,
    accepted_date: "",
    paied_year: 1970,
    paied_date:"",
    orderdatetime:"",
    remark:"",
    contactname:"",
    contactnumber:"",
    contactname2:"",
    contactnumber2:""
  },
  goMoveassess(){
    wx.navigateTo({
      url: '../moveassess/moveassess?id='+this.data.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id;
    console.log(id);
    if (id == undefined) {
      id = 5;
    }
    var that=this;
    moveassessApi._get(id,function(data){
      that.setData({
        id:data.id,
        orderno: data.orderno,
        status: data.status,
        paymenttype: data.paymenttype,
        assessamount: data.totalamount,
        payamount: data.paymentamount,
        created_date: utils.formatTime2(new Date(data.created_date)),
        accepted_year: new Date(data.accepted_date).getFullYear(),
        accepted_date: utils.formatTime2(new Date(data.accepted_date)),
        paied_year: new Date(data.paied_date).getFullYear(),
        paied_date: utils.formatTime2(new Date(data.paied_date)),
        orderdatetime: utils.formatTime2(new Date(data.orderdatetime)),
        remark: data.remark,
        contactname: data.contactname,
        contactnumber: data.contactnumber,
        contactname2: data.contactname2,
        contactnumber2: data.contactnumber2
      })
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