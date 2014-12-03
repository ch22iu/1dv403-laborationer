// server.js
(function(){
	"use strict";
	// call the packages we need
	var express     = require('express');   // call express
	var app         = express(); // define our app using express
	var bodyParser  = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

    /*jshint undef:false */
    app.use(function (error, req, res, next) {
        res.json({ message: 'The input is not valid JSON'});
        res.end();
        return;
    });
	app.set('port', process.env.PORT || 3000);

	app.use(function (req, res, next) {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type');
			res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
			next();
		}
	);

	exports.startApp = function(callback) {
		var router = express.Router();

		var r = require('./questHandler.js').createQuestHandler();
		r.on("onData", function() {
			router.get("/question/:id", function(req, res) {
				var id = req.params.id;
				var correct = req.params.answer;
				var nextID = r.getNextQuestion(id).id;
				var question;
				try {
					correct = req.params.answer;
					question = JSON.stringify(r.getQuestion(id)); // must make a copy since we want to delete the answer
					question = JSON.parse(question); // stringyfy the object and create a new variable to avoid copy properties
				}
				catch (err){
					res.json({message: 'error 400'}); // Should be 404, but for this assignment we indicate a call to a question not found
					res.end();
					return;
				}

				// Remove the answer for the response
				delete question.answer;

				// Send back the question
				
				question.message = "Nytt meddelande";
				question.howManyQuestions = r.getNumberOfQuestions(id);
				question.time = new Date();
				question.correctAnswer = r.getAnswer();
				question.url = req.protocol +"://" +req.get('host') +"/question/" +id;
				question.nextUrl = req.protocol + "://" +req.get('host') +"/question/" +nextID;
				question.description = "Awesome answers";
				question.author = "Christopher Holmberg";
				res.json(question);
			});
			
			
			router.get("/answer/:id", function(req, res) {
				res.json({message: 'ONLY POST!!' });
				res.end();
			});	
			
			//http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4
			router.route("/answer/:id").post(function(req, res) {
				var id = req.params.id;
				var question;
				
				try {
					question = JSON.stringify(r.getQuestion(id));
					question = JSON.parse(question);
					res.json(question);
				}
				catch (err){
					res.json({ message: 'error 404 answer' + ' ' + 'for' + ' ' +id + ' ' +question}); // Should be 404, but for this assignment we indicate a call to a question not found
					res.end();
					return;
				}

				
				// Check if user send correct property
				if(!req.body.hasOwnProperty("answer")) {
					var id = req.body.answer;
					var answer;
					answer = JSON.stringify(r.getQuestion(id));
					answer = JSON.parse(answer);
					res.json(answer);
					res.end();
					return;
				}
				else {
					if(question.answer === req.body.answer) {
						// fetch the nest question
						var nextID = r.getNextQuestion(id).id;

                        // fix the last url
                        if(nextID === undefined) {
                            res.json({ message: 'Correct Answer!' });
                        }
                        else {
                            var nextUrl = req.protocol +"://" +req.get('host') +"/question/" +nextID;
							res.json(nextUrl);
                        }

					}
					else {
						res.json({ message: 'Wrong Answer!' });
					}
				}
				res.end();

			});

			// catch other path
			router.get('/', function(req, res){
				res.json({ message: 'My first API' });
				res.end();
			});

			router.post('*', function(req, res){
				res.json({ message: 'error 404' });
				res.end();
			});

			app.use('/', router);
			
			var server = app.listen(app.get('port')); console.log("Server listen on port " + app.get('port') +" in dev MODE");
			callback(server);
		});
// prepere the data before start the server
		r.fetchData();
	};






})();
