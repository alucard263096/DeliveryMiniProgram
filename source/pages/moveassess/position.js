// pages/searchlocation/searchlocation.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 22.536738,
    longitude: 114.021864,
    markers: [{
      iconPath: "../../images/icons/location.png",
      id: 0,
      latitude: 123.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    inputShowed: false,
    inputVal: "",
    items: [],
    lat: 0,
    lng: 0
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      items: []
    });
  },
  addressok(){
    if(this.data.items.length==0){
      return;
    }
    var json = { currentTarget:{id:this.data.items[0].id}};
    this.addresstap(json);
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      items: []
    });
  },
  inputTyping: function (e) {
    var that = this;
    this.setData({
      inputVal: e.detail.value
    });
    app.qqmapsdk.getSuggestion({
      keyword: e.detail.value,
      region: "深圳市",
      region_fix: 1,
      //policy:1,
      success: function (res) {
        console.log(res); 

        var items=[];
        for(var i=0;i<res.data.length;i++){
          if (res.data[i].type==0){
            items.push(res.data[i]);
          }
        }
        res.data=items;
        
        var markers = that.data.markers;
        if(res.data.length>0){
          console.log(res.data[0]);
          markers[0].latitude = res.data[0].location.lat;
          markers[0].longitude = res.data[0].location.lng;
          that.setData({
            latitude: res.data[0].location.lat,
            longitude: res.data[0].location.lng,
            markers: markers
          });
        }else{
          markers[0].latitude = 100;
          markers[0].longitude = 100;
          that.setData({
            markers: markers
          });
        }
        that.setData({
           items: res.data
         });
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
    // app.qqmapsdk.search({
    //   keyword: e.detail.value,
    //   address_format: "short",
    //   location: {
    //     latitude: this.data.lat,
    //     longitude: this.data.lng
    //   },
    //   success: function (res) {
    //     console.log(res.data);
    //     that.setData({
    //       items: res.data
    //     });
    //   },
    //   fail: function (res) {
    //     console.log(res.status, res.message);
    //   },
    //   complete: function (res) {
    //     console.log(res.status, res.message);
    //   }
    // });
  },
  addresstap(e) {
    var id = e.currentTarget.id;
    var items = this.data.items;
    for (var i = 0; i < items.length; i++) {
      if (id == items[i].id) {
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];  //当前页面
        var prevPage = pages[pages.length - 2]; //上一个页面
        if(this.data.returntype=="start"){
          prevPage.startpositioncallback(items[i]);
        } else if(this.data.returntype == "end"){
          prevPage.endpositioncallback(items[i]);
        }
        
        wx.navigateBack();
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var address=options.address;
    var returntype = options.returntype;

    this.setData({ returntype: returntype});

    if(address!=""){
      var json={detail:{value:address}};
      this.inputTyping(json);
    }else{
      wx.getLocation({
        "type": "gcj02",
        success: function (res) {
          console.log(res);
          that.setData({
            lat: res.latitude,
            lng: res.longitude
          });
        }
      });
    }

  },
  mapCtx:null,
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('map');
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