"use strict";

window.onload = function() {
	var messageBoard = document.querySelector(".messageBoard");
	var check = 0;
	
	messageBoard.onclick = function() {
		var content = document.querySelector(".content");
		var newMess = document.createElement("div");
		newMess.setAttribute("id", "board" +check);
		content.appendChild(newMess);
		
		var board = new MessageBoard("board" +check);
		board.init();
		console.log(check);
		return false;
	};
};
/* window.onload = function() {
	// Ska försöka skapa upp nytt här senare..
} */

function messageBoard(newBoard) {
	var that = this;
	
	that.message = [];
	
	that.init = function() {
		var content = document.querySelector('.content');
		var board = document.getElementById(newBoard);
		var textarea = document.createElement("textarea");
		var messageBox = document.createElement("div");
		var header = document.createElement("header");
		var h1 = document.createElement("h1");
		
		
		// Lägger till attributen
		
		// Append
		board.appendChild(messageBox);
		board.appendChild(spanMessageCount);
		board.appendChild(textarea);
	}
	
}
		