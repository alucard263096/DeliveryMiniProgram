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
    assembletotalamount: 0,
    bigstuffoptions: [],
    bigstufftotalamount: 0,

    specialstuffoptions: [],
    specialstufftotalamount: 0,

    time:"",
    timetotalamount:0,

    totalamount:0,
    remark:""
  },
  callOffice:function(){
    wx.makePhoneCall({
      phoneNumber: '4007008942' 
    })
  },
  remarkchange:function(e){
    this.setData({"remark":e.detail.value});
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
  selectbigstuff: function () {

    // trucktype: [],
    //   distance:0,
    //     moveamount:0,
    //       endposition:"",
    //         startposition: "",
    wx.navigateTo({
      url: 'bigstuff?options=' + JSON.stringify(this.data.bigstuffoptions)
    })
  },
  selectspecialstuff: function () {

    // trucktype: [],
    //   distance:0,
    //     moveamount:0,
    //       endposition:"",
    //         startposition: "",
    wx.navigateTo({
      url: 'specialstuff?options=' + JSON.stringify(this.data.specialstuffoptions)
    })
  },
  selecttime: function () {

    // trucktype: [],
    //   distance:0,
    //     moveamount:0,
    //       endposition:"",
    //         startposition: "",
    wx.navigateTo({
      url: 'time?time=' + this.data.time
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
    this.setData({ trucktype: data.trucktype, distance: data.distance, moveamount: data.totalamount, startposition: data.startposition, endposition: data.endposition });
    this.calculateAmount();
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
      movetotalamount: data.moveintotalamount + data.moveouttotalamount
    });
    this.calculateAmount();

  },
  carryselectedcallback: function (data) {
    
    this.setData({
      carryouttype: data.carryouttype,
      carryintype: data.carryintype,
      carryintotalamount: data.carryintotalamount,
      carryouttotalamount: data.carryouttotalamount,
      carrytotalamount: data.carryintotalamount + data.carryouttotalamount
    });
    this.calculateAmount();

  },
  assembleselectedcallback:function(data){

    this.setData({
      assembleoptions: data.options,
      assembletotalamount: data.totalamount
    });
    this.calculateAmount();
  },
  bigstuffselectedcallback: function (data) {

    this.setData({
      bigstuffoptions: data.options,
      bigstufftotalamount: data.totalamount
    });
    this.calculateAmount();
  },
  specialstuffselectedcallback: function (data) {

    this.setData({
      specialstuffoptions: data.options,
      specialstufftotalamount: data.totalamount
    });
    this.calculateAmount();
  },
  timeselectedcallback: function (data) {

    this.setData({
      time: data.time
    });
    this.calculateAmount();
  },
  calculateAmount(){
    var totalamount = this.data.moveamount + this.data.movetotalamount + this.data.carrytotalamount + this.data.assembletotalamount + this.data.bigstufftotalamount + this.data.specialstufftotalamount;
      var timetotalamount=0;
      if(this.data.time=="19to23"){
        timetotalamount = Math.round(totalamount * 0.3);
      } else if (this.data.time == "23to6") {
        timetotalamount = Math.round(totalamount * 0.7);
      }
      totalamount = totalamount + timetotalamount;

      this.setData({ totalamount: totalamount, timetotalamount: timetotalamount});

  },
  submitRegister(){
    if(this.data.moveamount==0){
      wx.showToast({
        title: '你还没选择搬运方式，请先选择',
      });
      return;
    }
    var that=this;
    wx.showModal({
      title: '确认',
      content: '费用一共为' + (this.data.totalamount).toString() + "元，确定提交吗？",
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: 'submit?moveinfo=' + JSON.stringify(that.data),
          });
        }
      }
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