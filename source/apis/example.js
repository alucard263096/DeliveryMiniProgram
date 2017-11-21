
        //使用方法，下面两句复制到page的js文件的头部，然后你猜
        //var ExampleApi=require('/apis/example.js');
        //var exampleApi=new ExampleApi();
        var APIConfig=require('../ApiConfig.js');
        var apiconfig = new APIConfig();
class ExampleApi
{
   //传参数，获取我的名字，请注意这个范例
                hello(request_json,callback){
                  wx.request({
                    url: apiconfig.ServerUrl+'/example/hello', 
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
                    }
                  })
                };

}
module.exports = ExampleApi;
