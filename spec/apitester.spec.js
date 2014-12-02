//apitester.spec.js
"use strict";


var request = require('request');
var sh = require("./spechelper.js");
var state = false;
var base = "http://localhost:";
var counter = 0;
var nrOfTests = 2;
var cF;
function checkAndClose(){
    counter++;

    if(counter >= nrOfTests) {
        cF();
    }
}

describe("API tests", function(){


    it("test", function(done){
        sh.startServer(function(closeFnk, port){
            expect(port).toBe(3000);
            cF = closeFnk;
            base  += port + "/";
            state = true;
            done();
        });

    });

    it('Server should respond to /question/1', function(done) {
        request.get(base +'question/1', function(err, response){
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    it('Server should respond to /question/1', function(done) {
         request.get(base +'question/1', function(err, response){
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    it('Server should respond to /bad with 404', function(done) {
        request.get(base +'bad', function(err, response){
            expect(response.statusCode).toBe(404);
            done();
        });
    });

    it('Server should respond to /question/1234567xxx with 404', function(done) {
        request.get(base +'question/1234567xxx', function(err, response){
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    it("When a GET is send to /answer/:id a 405 (bad method) should be returned", function(done) {
        request.get(base +'answer/1', function(error, response, body){

            expect(response.statusCode).toBe(405);
            done();

        });
    });

    it("When wrong answer is submitted server should return 400 and a message", function(done) {
        request.post({
            url:     base + 'answer/1',
            body:    '{"answer" : "1"}',
            headers: {
                'Content-Type': 'application/json'
            }
        }, function(error, response, body){
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    it("When correct answer is submitted we should get a 200 and a nextURL", function(done) {
        request.post({
            url:     base + 'answer/1',
            body:    '{"answer" : "2"}',
            headers: {
                'Content-Type': 'application/json'
            }
        }, function(error, response, body){
            expect(response.statusCode).toBe(200);
            var mess = JSON.parse(body).message;
            expect(mess).toContain("Correct answer");
            var next = JSON.parse(body).nextURL;
            expect(next).toBeDefined();
            done();
        });
    });


    // Stupid
    it('close', function(done){
        setInterval(function(){

            cF();
           // expect(true).toBeTruthy();
            done();
        }, 500);


    });
/*

*/

});

