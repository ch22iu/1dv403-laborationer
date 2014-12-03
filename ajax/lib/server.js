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
        res.status(400).send({"message" : "The input is not valid JSON"});
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
				var question;
				try {
					question = JSON.stringify(r.getQuestion(id)); // must make a copy since we want to delete the answer
					question = JSON.parse(question); // stringyfy the object and create a new variable to avoid copy properties
				}
				catch (err){
					res.status(400); // Should be 404, but for this assignment we indicate a call to a question not found
					res.end();
					return;
				}

				// Remove the answer for the response
				delete question.answer;

				// Send back the question
				question.nextURL = req.protocol +"://" +req.get('host') +"/answer/" +id;
				question.message = "You got your question! Now send me the answer via HTTP POST to the nextURL in JSON-format";
				res.send(question);
			});

			router.get("/answer/:id", function(req, res) {
				res.status(405).send('{"message" : "This URL only accept POST"}');
				res.end();
			});
			//http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4
			router.route("/answer/:id").post(function(req, res) {
				var id = req.params.id;
				var question;


				try {
					question = r.getQuestion(id);
				}
				catch (err){
					res.status(400).send({"message" : "Bad URL - no question found on that URI"}); // Should be 404, but for this assignment we indicate a call to a question not found
					res.end();
					return;
				}


				// Check if user send correct property
				if(!req.body.hasOwnProperty("answer")) {
					res.status(400).send({"message" : 'The JSON-input should have a property named "answer"'});
					res.end();
					return;
				}
				else {
					if(question.answer === req.body.answer) {
						// fetch the nest question
						var nextID = r.getNextQuestion(id).id;

                        // fix the last url
                        if(nextID === undefined) {
                            res.status(200).send({"message" : "Correct answer!"});
                        }
                        else {
                            var nextUrl = req.protocol +"://" +req.get('host') +"/question/" +nextID;
                            res.status(200).send({"message" : "Correct answer!", "nextURL" : nextUrl});
                        }

					}
					else {
						res.status(400).send({"message" : "Wrong answer! :("});
					}
				}
				res.end();

			});

			// catch other path
			router.get('*', function(req, res){
				res.status(404);
				res.end();
			});

			router.post('*', function(req, res){
				res.status(404);
				res.end();
			});

			app.use('/', router);
			var server = app.listen(app.get('port')); console.log("Server listen on port " + app.get('port') +" in dev MODE");
			callback(server);
		});
// prepere the data befor start the server
		r.fetchData();
	};






})();
