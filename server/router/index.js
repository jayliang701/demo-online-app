var Redis = require("weroll/model/Redis");

//计算当前的在线用户数, range表示N分钟以内的在线数
function countOnlineUser(range, callBack) {
    range =  range * 60 * 1000;

    var now = Date.now();
    var fromTime = now - range;
    Redis.do("zcount", [ Redis.join("user_alive_sort"), fromTime, "+inf" ], function(err, res) {
        if (err) return callBack(err);
        //redis返回的结果即是这个时段内的在线用户数
        var result = { num:Number(res), fromTime:fromTime, toTime:now };
        callBack(null, result);
    });
}

function renderIndexPage(req, res, output, user) {
    //强制触发一次心跳
    req.callAPI("user.heartbeat", {}, function () {

        //获得1分钟内的在线数
        countOnlineUser(1, function(err, result) {
            //如果有异常，则跳到error.html页面来显示错误
            if (err) return output(null, err);
            //渲染页面
            output(result);
        });

    });
}

exports.getRouterMap = function() {
    return [
        { url: "/", view: "index", handle: renderIndexPage, needLogin:false },
        { url: "/index", view: "index", handle: renderIndexPage, needLogin:false }
    ];
}
