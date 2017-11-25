// pages/moveassess/submit.js
const app = getApp();
var MoveassessApi=require('../../apis/moveassess.js');
var moveassessApi=new MoveassessApi();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startdate:"",
    enddate:"",
    date:"",
    time:"7:00",
    contactname:"",
    contactnumber:"",
    contactname2:"",
    contactnumber2:"",
    moveinfo:"",
    showTopTips:""
  },
  bindDateChange(e){
    this.setData({date:e.detail.value});
  },
  bindTimeChange(e){

    this.setData({ time: e.detail.value });
  },
  setValue(e){
    var n= e.target.id;
    switch(n){
      case "contactname": this.setData({ contactname: e.detail.value }); return;
      case "contactnumber": this.setData({ contactnumber: e.detail.value }); return;
      case "contactname2": this.setData({ contactname2: e.detail.value }); return;
      case "contactnumber2": this.setData({ contactnumber2: e.detail.value }); return;
    }
  },
  submit:function(){
    if (this.data.contactname == "" || this.data.contactnumber==""){
      this.setData({ showTopTips:"请正确填写联系人和联系电话"});
      return;
    }
    console.log(this.data.moveinfo);
    var data=JSON.parse(this.data.moveinfo);
    data.orderdatetime=this.data.date+" "+this.data.time;
    data.contactname = this.data.contactname;
    data.contactnumber = this.data.contactnumber;
    data.contactname2 = this.data.contactname2;
    data.contactnumber2 = this.data.contactnumber2;
    data.contactnumber2 = this.data.contactnumber2;
    data.openid = app.globalData.openid;
    console.log(this.moveassessApi);
    moveassessApi.update(data, function (ret){
      if(ret.data==0){

      }else{
        
      }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myDate = new Date();
    myDate = new Date(myDate.getTime()+24*60*60*1000);
    var startdate = myDate.getFullYear().toString() + "-" + (myDate.getMonth() + 1).toString() + "-" + myDate.getDate().toString();
    var tDate = new Date(myDate.getTime() + 90 * 24 * 60 * 60*1000);
    var enddate = tDate.getFullYear().toString() + "-" + (tDate.getMonth() + 1).toString() + "-" + tDate.getDate().toString();
    
    this.setData({ startdate: startdate, date: startdate, enddate: enddate});
    console.log(enddate);

    console.log(options);
    this.setData({moveinfo:options.moveinfo});


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