// pages/distribution/list.js
const app=getApp();
var DistributionApi=require('../../apis/distribution.js');
var distributionApi=new DistributionApi();

var utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:"a",
    member_id:0,
    inputShowed: false,
    inputVal: "",
    memberlist:[],
    orderlist:[],
    activeorderlist:[]
  },
  changetab(e){
    var tab=e.currentTarget.id;
    this.setData({ tab: tab});
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
    var e={detail:{value:""}};
    this.inputTyping(e);
  },
  inputTyping: function (e) {
    var that = this;
    this.setData({
      inputVal: e.detail.value
    });
    var key = e.detail.value;
    var memberlist = this.data.memberlist;
    var orderlist = this.data.orderlist;
    var activeorderlist = this.data.activeorderlist;

    for(var i=0;i<memberlist.length;i++){
      if(key==""){
        memberlist[i].inkey = true;
        continue;
      }
      if (memberlist[i].name.indexOf(key)>-1
        || memberlist[i].mobile.indexOf(key) > -1){
        memberlist[i].inkey=true;
      }else{
        memberlist[i].inkey = false;
      }
    }

    for (var i = 0; i < orderlist.length; i++) {
      if (key == "") {
        orderlist[i].inkey = true;
        continue;
      }
      if (orderlist[i].disorderno.indexOf(key) > -1
        || orderlist[i].member_mobile.indexOf(key) > -1) {
        orderlist[i].inkey = true;
      } else {
        orderlist[i].inkey = false;
      }
    }

    for (var i = 0; i < activeorderlist.length; i++) {
      if (key == "") {
        activeorderlist[i].inkey = true;
        continue;
      }
      if (activeorderlist[i].disorderno.indexOf(key) > -1
        || activeorderlist[i].member_mobile.indexOf(key) > -1) {
        activeorderlist[i].inkey = true;
      } else {
        activeorderlist[i].inkey = false;
      }
    }

    this.setData({memberlist:memberlist,
    orderlist:orderlist,
    activeorderlist: activeorderlist});

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var member_id = app.globalData.member_id;
    //member_id=1;
    var that=this;
    distributionApi.memberlist({member_id:member_id},function(data){
      for(var i=0;i<data.length;i++){
        data[i].created_date = utils.formatTime2(new Date(data[i].created_date));
        data[i].inkey = true;
      }
      that.setData({memberlist:data});
    });
    distributionApi.orderlist({ member_id: member_id }, function (data) {
      for (var i = 0; i < data.length; i++) {
        data[i].orderdatetime = utils.formatTime2(new Date(data[i].orderdatetime));
        data[i].inkey=true;
      }
      var activeorderlist=[];
      for(var i=0;i<data.length;i++){
        var order=data[i];
        if (order.status == "PS" || order.status == "S"){
          activeorderlist.push(order);
        }
      }
      that.setData({ orderlist: data, activeorderlist: activeorderlist });

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