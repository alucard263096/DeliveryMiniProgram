// pages/member/auth.js
const app=getApp();

var MemberApi=require('../../apis/member.js');
var memberApi=new MemberApi();
var APIConfig = require('../../ApiConfig.js');
var apiconfig = new APIConfig();



Page({

  /**
   * 页面的初始数据
   */
  data: {
    realname: "",
    position: "",
    address: "",
    authed_status: "",
    communityphoto1: "",
    communityphoto2: "",
    communityphoto3: "",
    uploadpath:"",
    showTopTips:""
  },
  cancel(){
    wx.navigateBack({
      
    });
  },
  submit() {
    console.log(this.data);
    if(this.data.realname==""){
      this.setData({ showTopTips:"请填写真实姓名"});
      return;
    }
    if (this.data.position == "") {
      this.setData({ showTopTips: "请填写岗位" });
      return;
    }
    if (this.data.address == "") {
      this.setData({ showTopTips: "请填写小区地址" });
      return;
    }
    if (this.data.communityphoto1 == "" 
      && this.data.communityphoto2 == "" 
      && this.data.communityphoto3 == "" ) {
      this.setData({ showTopTips: "请至少上传一张小区照片" });
      return;
    }
    this.setData({ showTopTips: "" });
    memberApi.auth({
      member_id:app.globalData.member_id,
      realname: this.data.realname,
      position: this.data.position,
      address: this.data.address,
      communityphoto1: this.data.communityphoto1,
      communityphoto2: this.data.communityphoto2,
      communityphoto3: this.data.communityphoto3,
    },function(data){
      if (data.code == 0) {
        wx.navigateBack({

        });
      }else{
        wx.showToast({
          title: '认证提交失败，请联系客服',
        })
      }
    });
  },
  realnamechange(e){
    this.setData({realname:e.detail.value});
  },
  positionchange(e) {
    this.setData({ position: e.detail.value });
  },
  addresschange(e) {
    this.setData({ address: e.detail.value });
  },
  photochange(e){
    var id=e.currentTarget.id;
    var that=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        wx.uploadFile({
          url: app.apiconfig.FileUploadUrl, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'module': 'member',
            "field": "file"
          },
          success: function (res) {
            var data = res.data
            if (data.substr(0, 7) == "success") {
              data = data.split("|");
              if(id==1){
                that.setData({ communityphoto1: data[2] });
              }else if(id==2){
                that.setData({ communityphoto2: data[2] });
              } else if (id == 3) {
                that.setData({ communityphoto3: data[2] });
              }
            } else {
              wx.showToast({
                title: '上传失败，请重试',
                icon: 'warn',
                duration: 2000
              })
            }
            //do something
          }
        });
      }
    });
  },
  clearphoto(e){
    var id = e.currentTarget.id;
    if (id == 1) {
      this.setData({ communityphoto1: "" });
    } else if (id == 2) {
      this.setData({ communityphoto2: "" });
    } else if (id == 3) {
      this.setData({ communityphoto3: "" });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({uploadpath: apiconfig.UploadFolderUrl});
    var that=this;
    memberApi.info({ member_id: app.globalData.member_id }, function (data) {
      if(data==false){
        return;
      }
      that.setData({
        realname: data.realname,
        position: data.position,
        address: data.address,
        authed_status: data.authed_status,
        communityphoto1: data.communityphoto1,
        communityphoto2: data.communityphoto2,
        communityphoto3: data.communityphoto3
      });
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