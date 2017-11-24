// pages/moveassess/floor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moveouttotalamount: 0,
    moveoutfloornumber: null,
    moveouttype: "",
    moveintotalamount: 0,
    moveinfloornumber: null,
    moveintype: "",
    movetype:"out",
    showTopTips:""
  },
  cancel: function (e) {
    wx.navigateBack({

    });
  },
  submit: function () {
    this.calculatoramount();

    this.setData({ showTopTips: "" });
    var that = this;
    wx.showModal({
      title: '确认',
      content: '楼层费用为' + (this.data.moveouttotalamount + this.data.moveintotalamount).toString() + "元，确定提交吗？",
      success: function (res) {
        if (res.confirm) {
          var pages = getCurrentPages();
          if (pages.length > 1) {
            //上一个页面实例对象
            var prePage = pages[pages.length - 2];
            //关键在这里
            prePage.floorselectedcallback(that.data);
          }
          wx.navigateBack();
        } else if (res.cancel) {

        }
      }
    })

  },
  tomovein:function(){
    this.setData({movetype:"in"});
  },
  tomoveout:function(){

    this.setData({ movetype: "out" });
  },
  moveoutfloornumberchange:function(e){
    console.log(e);
    var moveoutfloornumber=e.detail.value;
    try{
      moveoutfloornumber = parseInt(moveoutfloornumber);
      if(moveoutfloornumber<0){
        moveoutfloornumber=0;
      }
    }catch(e){
      moveoutfloornumber=0;
    }
    this.setData({ moveoutfloornumber: moveoutfloornumber });
    this.calculatoramount();
  },
  moveoutchange: function (e) {
    this.setData({ moveouttype: e.target.id });
    this.calculatoramount();
  },
  moveinfloornumberchange: function (e) {
    console.log(e);
    var moveinfloornumber = e.detail.value;
    try {
      moveinfloornumber = parseInt(moveinfloornumber);
      if (moveinfloornumber < 0) {
        moveinfloornumber = 0;
      }
    } catch (e) {
      moveinfloornumber = 0;
    }
    this.setData({ moveinfloornumber: moveinfloornumber });
    this.calculatoramount();
  },
  moveinchange: function (e) {
    this.setData({ moveintype: e.target.id });
    this.calculatoramount();
  },
  calculatoramount(){
    var moveoutamount=0;
    if (this.data.moveouttype == "floor" && this.data.moveoutfloornumber>=3){
      moveoutamount = (this.data.moveoutfloornumber-2)*30;
    }else{
      moveoutamount = 0;
    }
    var moveinamount = 0;
    if (this.data.moveintype == "floor" && this.data.moveinfloornumber >= 3) {
      moveinamount = (this.data.moveinfloornumber - 2) * 30;
    } else {
      moveinamount = 0;
    }
    this.setData({ moveintotalamount: moveinamount, moveouttotalamount:moveoutamount});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // movetotalamount: 0,
    //   moveouttotalamount: 0,
    //     moveoutfloornumber: null,
    //       moveouttype: "",
    //         moveintotalamount: 0,
    //           moveinfloornumber: null,
    console.log(options);
    this.setData({
        moveouttotalamount: options.moveouttotalamount
      , moveoutfloornumber: options.moveoutfloornumber
      , moveouttype: options.moveouttype
      , moveintotalamount: options.moveintotalamount
      , moveinfloornumber: options.moveinfloornumber
      , moveintype: options.moveintype});

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