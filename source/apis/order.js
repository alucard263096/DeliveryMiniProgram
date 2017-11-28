
        //使用方法，下面两句复制到page的js文件的头部，然后你猜
        //var OrderApi=require('/apis/order.js');
        //var orderApi=new OrderApi();
        var APIConfig=require('../ApiConfig.js');
        var apiconfig = new APIConfig();
class OrderApi
{
   //取消订单
                cancel(request_json,callback, showLoading = true){
					apiconfig.ShowLoading();
                  wx.request({
                    url: apiconfig.ServerUrl+'/order/cancel', 
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
module.exports = OrderApi;
