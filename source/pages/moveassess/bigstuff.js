// pages/carryassess/floor.js
var BigstuffoptionApi=require('../../apis/bigstuffoption.js');
var bigstuffoptionApi=new BigstuffoptionApi();
var APIConfig = require('../../ApiConfig.js');
var apiconfig = new APIConfig();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    totalamount: 0,
    options: []
  },
  cancel: function (e) {
    wx.navigateBack({

    });
  },
  plus(e) {
    var id = e.target.id;
    var options = this.data.options;
    for (var i = 0; i < options.length; i++) {
      if (options[i].id == id) {
        options[i].qty = options[i].qty + 1;
        if (options[i].qty < 0) {
          options[i].qty = 0;
        }
        options[i].amount = options[i].qty * options[i].price;
      }
    }
    this.setData({ options: options });
    this.calculatoramount();
  },
  minus(e) {

    var id = e.target.id;
    var options = this.data.options;
    for (var i = 0; i < options.length; i++) {
      if (options[i].id == id) {
        options[i].qty = options[i].qty - 1;
        if (options[i].qty < 0) {
          options[i].qty = 0;
        }
        options[i].amount = options[i].qty * options[i].price;
      }
    }
    this.setData({ options: options });
    this.calculatoramount();
  },
  submit: function () {
    this.calculatoramount();

    this.setData({ showTopTips: "" });
    var that = this;
    wx.showModal({
      title: '确认',
      content: '大件费用为' + (this.data.totalamount).toString() + "元，确定提交吗？",
      success: function (res) {
        if (res.confirm) {
          var pages = getCurrentPages();
          if (pages.length > 1) {
            //上一个页面实例对象
            var prePage = pages[pages.length - 2];
            //关键在这里
            prePage.bigstuffselectedcallback(that.data);
          }
          wx.navigateBack();
        } else if (res.cancel) {

        }
      }
    })

  },
  calculatoramount() {
    var totalamount = 0;
    var options = this.data.options;
    for (var i = 0; i < options.length; i++) {
      options[i].amount = options[i].qty * options[i].price;
      totalamount += options[i].amount;
    }
    this.setData({ options: options, totalamount: totalamount });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ id: options.id });

    // carrytotalamount: 0,
    //   carryouttotalamount: 0,
    //     carryoutfloornumber: null,
    //       carryouttype: "",
    //         carryintotalamount: 0,
    //           carryinfloornumber: null,
    var that = this;
    var options = JSON.parse(options.options);
    if (options.length == 0) {

      bigstuffoptionApi.list({ "orderby": "seq", "status": "A" }, function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i].qty = 0;
          data[i].amount = 0;
        }
        that.setData({ options: data });
      });
    } else {
      this.setData({ options: options });
      this.calculatoramount();
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