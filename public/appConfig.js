(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.appConfig = factory());
  }(this, function () {
    //设置模式
    var mode = "dev";//pro    
    var allConfig = {
        serverPath:"http://192.168.1.8:7001",
        isLoginVerifyCode:false,
        routeModel: 'hash',
        AppName: "星火篮球俱乐部管理系统",
    }
    var appConfig = allConfig;
    return appConfig;
}))