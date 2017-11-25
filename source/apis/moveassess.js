
        //使用方法，下面两句复制到page的js文件的头部，然后你猜
        //var MoveassessApi=require('/apis/moveassess.js');
        //var moveassessApi=new MoveassessApi();
        var APIConfig=require('../ApiConfig.js');
        var apiconfig = new APIConfig();
class MoveassessApi
{
   //获取搬家评估列表，传入对应的搜索条件
    list(searchcondition_json,callback, showLoading = true){
		apiconfig.ShowLoading();
                  wx.request({
                    url: apiconfig.ServerUrl+'/moveassess/list', 
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

   //获取搬家评估详情, 传入对应的id
    _get(id,callback, showLoading = true){
		apiconfig.ShowLoading();
      var json={id:id};
                  wx.request({
                    url: apiconfig.ServerUrl+'/moveassess/get', 
                    data:json,
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

   //更新搬家评估，传入对应的表字段
    update(field_json,callback, showLoading = true){
					apiconfig.ShowLoading();
                  wx.request({
                    url: apiconfig.ServerUrl+'/moveassess/update', 
                    data:field_json,
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
module.exports = MoveassessApi;
