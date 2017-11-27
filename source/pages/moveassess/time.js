// pages/carryassess/floor.js
var SpecialstuffoptionApi = require('../../apis/specialstuffoption.js');
var specialstuffoptionApi = new SpecialstuffoptionApi();
var APIConfig = require('../../ApiConfig.js');
var apiconfig = new APIConfig();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    time: ""
  },
  cancel: function (e) {
    wx.navigateBack({

    });
  }, timeselect(e){
      this.setData({time:e.target.id});
  },
  submit: function () {

    this.setData({ showTopTips: "" });
    var that = this;
    wx.showModal({
      title: '确认',
      content: "确定提交吗？",
      success: function (res) {
        if (res.confirm) {
          var pages = getCurrentPages();
          if (pages.length > 1) {
            //上一个页面实例对象
            var prePage = pages[pages.length - 2];
            //关键在这里
            prePage.timeselectedcallback(that.data);
          }
          wx.navigateBack();
        } else if (res.cancel) {

        }
      }
    })

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
    var time = options.time;

    this.setData({ time: time });


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