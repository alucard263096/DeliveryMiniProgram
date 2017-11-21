
        //使用方法，下面两句复制到page的js文件的头部，然后你猜
        //var GeneraltextApi=require('/apis/generaltext.js');
        //var generaltextApi=new GeneraltextApi();
        var APIConfig=require('../ApiConfig.js');
        var apiconfig = new APIConfig();
class GeneraltextApi
{
   //获取一般文字的信息
                view(request_json,callback){
                  wx.request({
                    url: apiconfig.ServerUrl+'/generaltext/view', 
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
module.exports = GeneraltextApi;
