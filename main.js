/**
 * Created by Jay on 14-4-30.
 */
var App = require("weroll/App");
var app = new App();

var Setting = global.SETTING;

app.addTask(function(cb) {
    var Model = require("weroll/model/Model");
    Model.init(Setting.model, function(err) {
        cb(err);
    });
});
app.addTask(function(cb) {
    //create and start a web application
    var webApp = require("weroll/web/WebApp").start(Setting, function(webApp) {
        cb();
    });
});

app.run();