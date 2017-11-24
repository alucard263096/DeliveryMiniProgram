// pages/moveassess/moveassess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trucktype:[],
    distance:0,
    moveamount:0,
    endposition:"",
    startposition: "",
    movetotalamount: 0,
    moveouttotalamount: 0,
    moveoutfloornumber: null,
    moveouttype: "",
    moveintotalamount: 0,
    moveinfloornumber: null,
    moveintype: "",

    carrytotalamount: 0,
    carryouttotalamount: 0,
    carryouttype: "",
    carryintotalamount: 0,
    carryintype: "",
    assembleoptions:[],
    assembletotalamount:0
  },
  callOffice:function(){
    wx.makePhoneCall({
      phoneNumber: '4007008942' //仅为示例，并非真实的电话号码
    })
  },
  selecttruck:function(){

    // trucktype: [],
    //   distance:0,
    //     moveamount:0,
    //       endposition:"",
    //         startposition: "",
    wx.navigateTo({
      url: 'truck?trucktype='+JSON.stringify(this.data.trucktype)
      + "&distance=" + this.data.distance.toString()
      + "&moveamount=" + this.data.moveamount.toString()
      + "&endposition=" + this.data.endposition.toString()
      + "&startposition=" + this.data.startposition.toString(),
    })
  },
  selectassemble: function () {

    // trucktype: [],
    //   distance:0,
    //     moveamount:0,
    //       endposition:"",
    //         startposition: "",
    wx.navigateTo({
      url: 'assemble?options=' + JSON.stringify(this.data.assembleoptions)
    })
  },
  selectfloor: function () {

    // movetotalamount: 0,
    //   moveouttotalamount: 0,
    //     moveoutfloornumber: null,
    //       moveouttype: "",
    //         moveintotalamount: 0,
    //           moveinfloornumber: null,
    
    wx.navigateTo({
                url: 'floor'
                + "?moveouttotalamount=" + this.data.moveouttotalamount.toString()
                + "&moveoutfloornumber=" + (this.data.moveoutfloornumber == null ? 0 : this.data.moveoutfloornumber).toString()
                + "&moveouttype=" + this.data.moveouttype
                + "&moveintotalamount=" + this.data.moveintotalamount.toString()
                + "&moveinfloornumber=" + (this.data.moveinfloornumber == null ? 0 : this.data.moveinfloornumber).toString()
                + "&moveintype=" + this.data.moveintype
    })
  },
  selectcarry: function () {
    wx.navigateTo({
      url: 'carry'
      + "?carryouttotalamount=" + this.data.carryouttotalamount.toString()
      + "&carryouttype=" + this.data.carryouttype
      + "&carryintotalamount=" + this.data.carryintotalamount.toString()
      + "&carryintype=" + this.data.carryintype
    })
  },
  truckselectedcallback:function(data){
    this.setData({ trucktype: data.trucktype, distance: data.distance,moveamount:data.totalamount,startposition:data.startposition,endposition:data.endposition});
  },
  floorselectedcallback:function(data){
    //data.moveoutfloornumber = data.moveoutfloornumber == null ? 0 : data.moveoutfloornumber;
    //data.moveinfloornumber = data.moveinfloornumber == null ? 0 : data.moveinfloornumber;
    if (data.moveouttype!="floor"){
      data.moveoutfloornumber=null;
    }
    if (data.moveintype != "floor") {
      data.moveinfloornumber = null;
    }
    this.setData({
      moveoutfloornumber: data.moveoutfloornumber,
      moveouttype: data.moveouttype,
      moveinfloornumber: data.moveinfloornumber,
      moveintype: data.moveintype,
      moveouttotalamount: data.moveintotalamount,
      moveouttotalamount: data.moveouttotalamount,
      movetotalamount: data.moveintotalamount + data.moveouttotalamount});

  },
  carryselectedcallback: function (data) {
    
    this.setData({
      carryouttype: data.carryouttype,
      carryintype: data.carryintype,
      carryintotalamount: data.carryintotalamount,
      carryouttotalamount: data.carryouttotalamount,
      carrytotalamount: data.carryintotalamount + data.carryouttotalamount
    });

  },
  assembleselectedcallback:function(data){

    this.setData({
      assembleoptions: data.options,
      assembletotalamount: data.totalamount
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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