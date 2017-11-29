
        //使用方法，下面两句复制到page的js文件的头部，然后你猜
        //var DistributionApi=require('/apis/distribution.js');
        //var distributionApi=new DistributionApi();
        var APIConfig=require('../ApiConfig.js');
        var apiconfig = new APIConfig();
class DistributionApi
{
   //获取下属分销人物列表
                memberlist(request_json,callback, showLoading = true){
					apiconfig.ShowLoading();
                  wx.request({
                    url: apiconfig.ServerUrl+'/distribution/memberlist', 
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
   //获取分销人物的订单状况
                orderlist(request_json,callback, showLoading = true){
					apiconfig.ShowLoading();
                  wx.request({
                    url: apiconfig.ServerUrl+'/distribution/orderlist', 
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
module.exports = DistributionApi;
