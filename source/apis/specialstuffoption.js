
        //使用方法，下面两句复制到page的js文件的头部，然后你猜
        //var SpecialstuffoptionApi=require('/apis/specialstuffoption.js');
        //var specialstuffoptionApi=new SpecialstuffoptionApi();
        var APIConfig=require('../ApiConfig.js');
        var apiconfig = new APIConfig();
class SpecialstuffoptionApi
{
   //获取特殊件项目列表，传入对应的搜索条件
    list(searchcondition_json,callback, showLoading = true){
		apiconfig.ShowLoading();
                  wx.request({
                    url: apiconfig.ServerUrl+'/specialstuffoption/list', 
                    data:searchcondition_json,
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
module.exports = SpecialstuffoptionApi;
