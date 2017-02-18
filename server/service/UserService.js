/**
 * Created by Jay on 2017/2/18.
 */

exports.config = {
    name: "user",
    enabled: true,
    security: {
        //@heartbeat 用户心跳
        "heartbeat":{ needLogin:false }
    }
};

var Redis = require("weroll/model/Redis");

//使用Redis的有序集来维护用户的在线时间
function keepAlive(identifyID, offline) {
    var redisKey = Redis.join("user_alive_sort");
    if (offline) {
        //如果用户登出，则从有序集中删除用户信息
        Redis.do("zrem", [ redisKey, identifyID ], function(err) {
            if (err) return console.error("Redis.zrem('user_alive_sort') error --> ", err);
            console.log( "user offline: " + identifyID );
        });
    } else {
        //如果用户登入或触发心跳，则刷新有序集中的用户最新在线时间
        Redis.do("zadd", [ redisKey, Date.now(), identifyID ], function(err) {
            if (err) return console.error("Redis.zadd('user_alive_sort') error --> ", err);
            console.log( "keep user alive: " + identifyID );
        });
    }
}

exports.heartbeat = function(req, res, params) {
    //写入在线状态
    //req._identifyID 表示客户端的UUID，由weroll自动生成
    keepAlive(req._identifyID);
    //响应客户端
    res.sayOK();
}