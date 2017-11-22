class APIConfig{
  ServerUrl="https://cmsdev.app-link.org/alucard263096/lights/api";//填写你自己服务器的服务器域名信息
  UploadFolderUrl = "https://cmsdev.app-link.org/alucard263096/lights/upload";//上传文件的存储路径
  FileUploadUrl ="https://cmsdev.app-link.org/alucard263096/lights/fileupload";//文件上传接口
  //显示loading相关的代码
  showLoadingCounter=0;
  ShowLoading=function(){
    if (this.showLoadingCounter==0){
      wx.showLoading({
        title: '加载中',
      });
    }
    this.showLoadingCounter = this.showLoadingCounter+1;
  };
  CloseLoading = function () {
    this.showLoadingCounter = this.showLoadingCounter - 1;
    if (this.showLoadingCounter == 0) {
      console.log(this.showLoadingCounter);
      wx.hideLoading();
    }
  };
};

module.exports = APIConfig;