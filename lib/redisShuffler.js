/*
	redisShuffler - This is a redis specific adapter for
	for handling data and validate the dataformat
	The adapter should have an getData method who takes an callback
	This will be called when the data is OK or return false if somethiong goes wrong
	Author: John Häggerud
	Licensed under the CC0 license.
 */

(function(){
    'use strict';

    // Start redis server for holding data in memory
    var redis = require("redis");

    var HNAME = "questions";
    var res = [];
    var redisSupport = true;



// Load file reader module (stupid but i'm on a training field)
    var fr = require("./fileReader.js");

    exports.getData = function(callback, path) {
        // check if data is in cache otherwise reload the data
        // using hashes
        var client = redis.createClient(6379, "127.0.0.1");
        client.on("error", function() {
            // REFACTOR THIS
            path = path || "data/data.json";
            var data = fr.readFile(path);
            if(!data) {
                callback(false);
                return;
            }
            // parse it as JSON and return the questions array
            res = JSON.parse(data).questions;
            // return an array with questions
            callback(res);
        });
        client.get(HNAME, function (err, replies) {

            if(redisSupport && replies) {
                JSON.parse(replies).questions.forEach(function(el) {
                    res.push(el);
                });
                callback(res);
            }
            else {
                // REFACTOR THIS
                path = path || "data/data.json";
                var data = fr.readFile(path);
                if(!data) {
                    callback(false);
                    return;
                }
                // parse it as JSON and return the questions array
                res = JSON.parse(data).questions;
                // save all data as hashes {"question", 0, object with all the data}
                // Should it goes in a irratable stucture or is this way with a 0 maybe easier?
                if(redisSupport) {
                    client.set(HNAME, data);
                }
                // return an array with questions
                callback(res);
            }
            client.quit();
        });
    };
})();


