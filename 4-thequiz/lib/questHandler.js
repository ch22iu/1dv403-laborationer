/*
 *
 * Licensed under the CC0 license.
 */

(function(){
	'use strict';

	/** USED MODULES **/
	var redisShuffler = require('./redisShuffler.js');
	var events = require('events');
	var util = require('util');


	/** IMPLEMENTATION **/

	// Create an constructor to extends the EventEmitter functionallity
	// Use this as an internal Object that will be return in a factory method
	function QuestHandler() {
		this.questions = [];
	}
	util.inherits(QuestHandler, events.EventEmitter);

	// I have to export this object to get the tests working when
	// checking that the create-method is return a correct instance
	exports.QuestHandler = QuestHandler;

	/** Methods **/

	/*
		This method is used to start fetching data
		from the redis-server or file.
		emits the event "onData" when the data is ready
	*/
	QuestHandler.prototype.fetchData = function() {
		var currentObject = this;
		redisShuffler.getData(function(data){
            console.log("Get data in Questhandler");
			currentObject.questions = data;
			currentObject.emit("onData");
		});
	};

	/*
		Return the number off questions that are ready
		return 0 if no questions are read
	*/
	QuestHandler.prototype.getNumberOfQuestions = function() {
		return this.questions.length;
	};

	QuestHandler.prototype.getNextQuestion = function(id) {
		var len = this.questions.length -1; // dont check the last

		for(var i = 0; i < len; i++) {
			if(Number(this.questions[i].id === Number(id))) {
				return this.questions[i+1];
			}
		}
		return false;
	};

	/*
		get a specific question. The number parameter is
		the number, not the index (hide the implementation)
	*/
	QuestHandler.prototype.getQuestion = function(id) {
		var len = this.questions.length;

		if(len < 1) {
			throw new Error("Don´t have any data yet");
		}
		// check if we have a question
		for(var i = 0; i < len; i++) {

			if(Number(this.questions[i].id) === Number(id)) {
				return this.questions[i];
			}
		}
		throw new Error("Did call a question that doesn´t exists");
	};
	QuestHandler.prototype.getAnswer = function(id) {
		var answer = this.questions.length;
		
		for(var i = 0; i < answer; i++) {

			if(Number(this.questions[i].id) === Number(id)) {
				return this.questions[i].answer;
			}
		}
		throw new Error("Did call a question that doesn´t exists");
	};
	QuestHandler.prototype.getAllquestions = function(id) {
		var array = this.questions;
		var allQuestions = array.valueOf();
		return allQuestions;
	};
	// exports the modeule
	exports.createQuestHandler = function() {
		// Should create the internal Object and return it
		var rqh = new QuestHandler();
		return rqh;
	};
})();
