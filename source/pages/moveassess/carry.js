// pages/carryassess/floor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    carryouttotalamount: 0,
    carryouttype: "",
    carryintotalamount: 0,
    carryintype: "",
    carrytype: "out",
    showTopTips: ""
  },
  cancel: function (e) {
    wx.navigateBack({

    });
  },
  submit: function () {
    this.calculatoramount();
    this.setData({ showTopTips: "" });
    console.log(this.data);
    var that = this;
    wx.showModal({
      title: '确认',
      content: '距离费用为' + (this.data.carryouttotalamount + this.data.carryintotalamount).toString() + "元，确定提交吗？",
      success: function (res) {
        if (res.confirm) {
          var pages = getCurrentPages();
          if (pages.length > 1) {
            //上一个页面实例对象
            var prePage = pages[pages.length - 2];
            //关键在这里
            prePage.carryselectedcallback(that.data);
          }
          wx.navigateBack();
        } else if (res.cancel) {

        }
      }
    })

  },
  tocarryin: function () {
    this.setData({ carrytype: "in" });
  },
  tocarryout: function () {

    this.setData({ carrytype: "out" });
  },
  carryoutchange: function (e) {
    this.setData({ carryouttype: e.target.id });
    this.calculatoramount();
  },
  carryinchange: function (e) {
    this.setData({ carryintype: e.target.id });
    this.calculatoramount();
  },
  calculatoramount() {
    var carryinamount = this.tryamount(this.data.carryintype);
    var carryoutamount = this.tryamount(this.data.carryouttype);
    

    this.setData({ carryintotalamount: carryinamount, carryouttotalamount: carryoutamount });
  },
  tryamount(carrytype){
    switch (carrytype){
      case "less30": return 0;
      case "30to50": return 30;
      case "50to100": return 50;
      case "more100": return 100;
      case "underground": return 0;
      default: return 0;
    }
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
    console.log(options);
    this.setData({
      carryouttotalamount: options.carryouttotalamount
      , carryouttype: options.carryouttype
      , carryintotalamount: options.carryintotalamount
      , carryintype: options.carryintype
    });

    this.calculatoramount();

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