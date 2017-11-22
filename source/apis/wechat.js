
        //使用方法，下面两句复制到page的js文件的头部，然后你猜
        //var WechatApi=require('/apis/wechat.js');
        //var wechatApi=new WechatApi();
        var APIConfig=require('../ApiConfig.js');
        var apiconfig = new APIConfig();
class WechatApi
{
   //解密微信相关
                decryption(request_json,callback, showLoading = true){
					apiconfig.ShowLoading();
                  wx.request({
                    url: apiconfig.ServerUrl+'/wechat/decryption', 
                    data:request_json,
                    method:'POST',
                    dataType:'json',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                      if(callback!=null){
                        callback(res.data);
                      }
                    },
                    fail:function(res){
                      console.log(res);
                      callback(false);
                    },
                    complete:function(res){
                      console.log(res);
                      apiconfig.CloseLoading();
                    }
                  })
                };

}
module.exports = WechatApi;
