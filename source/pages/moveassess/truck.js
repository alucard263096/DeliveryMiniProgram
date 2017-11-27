// pages/moveassess/truck.js

var TrucktypeApi=require('../../apis/trucktype.js');
var trucktypeApi=new TrucktypeApi();
var APIConfig = require('../../ApiConfig.js');
var apiconfig = new APIConfig();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    distance:32.5,
    totalamount:0,
    startposition: "深圳市南山区沛鸿大厦",
    endposition: "深圳市福田区招商银行大厦",
    trucktype:[],
    uploadpath:""
  },
  cancel:function(e){
      wx.navigateBack({
        
      });
  },
  submit:function(){
    this.calculateAmount(0,0);
    if (this.data.distance <=0) {
      this.setData({ showTopTips: "请选择起点和终点的搬运位置" });
      return;
    }
    var qty = 0;
    for (var i =0;i< this.data.trucktype.length;i++)
    {
      qty += this.data.trucktype[i].qty;
    }
    if (qty <= 0) {
      this.setData({ showTopTips: "请至少选择一种运输车辆" });
      return;
    }
    this.setData({ showTopTips: "" });
    var that=this;
    wx.showModal({
      title: '确认',
      content: '车辆费用为'+this.data.totalamount.toString()+"元，确定提交吗？",
      success: function (res) {
        if (res.confirm) {
          var pages = getCurrentPages();
          if (pages.length > 1) {
            //上一个页面实例对象
            var prePage = pages[pages.length - 2];
            //关键在这里
            prePage.truckselectedcallback(that.data);
          }
          wx.navigateBack();
        } else if (res.cancel) {
          
        }
      }
    })

  },
  minustruck: function (e) {
    this.calculateAmount(e.target.id,-1);
  },
  plustruck: function (e) {
    this.calculateAmount(e.target.id, 1);
  },
  calculateAmount(truck_id=0,qty=0){
    var trucktype = this.data.trucktype;
      for(var i=0;i<trucktype.length;i++){
        if(trucktype[i].id==truck_id){
          trucktype[i].qty+=qty;
        }
      }
      var distance=this.data.distance;
      var overdistance = Math.ceil(distance - 10);//distance-10;

      var totalamount=0;

      for (var i = 0; i < trucktype.length; i++) {
      if(trucktype[i].qty<0){
        trucktype[i].qty=0;
      }
      //trucktype[i].amount=0;
      trucktype[i].amount = Number(trucktype[i].qty) * Number(trucktype[i].price);
      totalamount += trucktype[i].amount + Number(trucktype[i].qty) * overdistance*10;
    }
    if(distance>500){
      totalamount=totalamount*0.8;
    }else if(distance>300){
      totalamount=totalamount*0.9;
    }
    this.setData({ trucktype: trucktype, totalamount: totalamount});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({id:options.id});
    var that=this;
    that.setData({ uploadpath: apiconfig.UploadFolderUrl });

    var trucktype = JSON.parse(options.trucktype);
    var distance = options.distance;
    var moveamount = options.moveamount;
    var endposition = options.endposition;
    var startposition = options.startposition;

    if(distance==0){
      distance=32.5;
    }
    if (endposition == "") {
      endposition = "深圳市福田区招商银行大厦";
    }
    if (startposition == "") {
      startposition = "深圳市南山区沛鸿大厦";
    }

    this.setData({
      trucktype: trucktype,
      distance: distance,
      moveamount: moveamount,
      endposition: endposition,
      startposition: startposition
    });
    if(trucktype.length==0){
      trucktypeApi.list({"orderby":"seq","status":"A"},function(data){
        for (var i = 0; i < data.length; i++) {
          data[i].qty = 0;
          data[i].amount = 0;
        }
          that.setData({ trucktype:data});
      });
    }else{
      this.calculateAmount();
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