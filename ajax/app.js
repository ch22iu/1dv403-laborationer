"use strict";

var app = require("./lib/server.js");
app.startApp(function(){
    console.log("Got callback");
});