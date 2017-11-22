
        //使用方法，下面两句复制到page的js文件的头部，然后你猜
        //var MemberApi=require('/apis/member.js');
        //var memberApi=new MemberApi();
        var APIConfig=require('../ApiConfig.js');
        var apiconfig = new APIConfig();
class MemberApi
{
   //获取用户的账户资料
                info(request_json,callback, showLoading = true){
					apiconfig.ShowLoading();
                  wx.request({
                    url: apiconfig.ServerUrl+'/member/info', 
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
   //更新用户账号资料，基本资料为主
                infoupdate(request_json,callback, showLoading = true){
					apiconfig.ShowLoading();
                  wx.request({
                    url: apiconfig.ServerUrl+'/member/infoupdate', 
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
   //检查手机号码是否已经被注册
                mobileisuse(request_json,callback, showLoading = true){
					apiconfig.ShowLoading();
                  wx.request({
                    url: apiconfig.ServerUrl+'/member/mobileisuse', 
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
   //授权注册
                oauthregister(request_json,callback, showLoading = true){
					apiconfig.ShowLoading();
                  wx.request({
                    url: apiconfig.ServerUrl+'/member/oauthregister', 
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
   //发送注册短信验证码
                sendregisterverifycode(request_json,callback, showLoading = true){
					apiconfig.ShowLoading();
                  wx.request({
                    url: apiconfig.ServerUrl+'/member/sendregisterverifycode', 
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
   //授权登录
                oauthlogin(request_json,callback, showLoading = true){
					apiconfig.ShowLoading();
                  wx.request({
                    url: apiconfig.ServerUrl+'/member/oauthlogin', 
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
module.exports = MemberApi;
