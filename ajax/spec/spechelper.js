/**
 * Created by thajo on 08/10/14.
 */


(function(){
    "use strict";
    var app = require("../lib/server.js");
    var s;
    var base;
    var close = function(){
        s.close();
    };

    exports.startServer = function(callback){
        // starta servern
        app.startApp(function(server) {
            console.log("application started...");
            s = server;
            callback(close, s.address().port);
        });



    };



})();