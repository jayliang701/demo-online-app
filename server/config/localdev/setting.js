/**
 * Created by Jay on 14-5-4.
 */
module.exports = {

    env:"localdev",

    host:"localhost",
    port:3000,

    compress:{
        api:false, //or false,  true -> use MsgPack,   false -> use json
    },

    model: {
        /* mongodb connection config
        db: {
            host:"127.0.0.1",
            port:27017,
            name:"weroll_app",
            option: {
                driver:"mongoose",  //or "native"
                server: {
                    reconnectTries: Number.MAX_VALUE,
                    poolSize: 5,
                    socketOptions: { keepAlive: 120 }
                }
            }
        },
         */
        /* redis connection config */
        redis: {
            host:"127.0.0.1",
            port:6379,
            prefix:{
                "*": "OnlineApp_"
            },
            ttl:24 * 60 * 60,  //sec,
            pass:"",
            maxLockTime:2 * 60,  //sec
            releaseLockWhenStart: true
        }
    },

    session: { },

    //site domain
    site:"http://localhost:3000/",
    siteName:"OnlineApp",

    cdn:{
        res:"http://localhost:3000"
    },
    /* Ecosystem config
    ecosystem: {
        name: "mini",
        port: 3001,
        servers : {
            "test" : {
                message:"127.0.0.1:3101",
                api:"127.0.0.1:3100/api"
            }
        }
    }
    */
};
