"use strict";

window.onload = function() {
	var mBoard = document.querySelector(".messageBoard");
	var check = 0;
	
	mBoard.onclick = function() {
		var content = document.querySelector(".content");
		var newMess = document.createElement("div");
		newMess.setAttribute("id", "board" +check);
		content.appendChild(newMess);
		
		var board = new messageBoard("board" +check);
		board.init();
		
		check += 1;
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
		var button = document.createElement("input");
		var closeBoard = document.createElement("a");
		
		// Lägger till attributen
		
		closeBoard.setAttribute("href", "#");
		closeBoard.setAttribute("class", "closeBoard");
		closeBoard.textContent = "Stäng";
		header.appendChild(closeBoard);
		header.setAttribute("class", "header");
		messageBox.setAttribute("class", "message-box");
		textarea.setAttribute("autofocus", "autofocus");
		button.setAttribute("value", "Skicka");
		button.setAttribute("class", "button send");
		button.setAttribute("type", "submit");
		
		// Append
		board.appendChild(header);
		header.appendChild(h1);
		h1.textContent = "LabbyMezzage v 1337";
		board.appendChild(messageBox);
		board.appendChild(textarea);
		board.appendChild(button);
		
		button.addEventListener("click", that.newMessage, false);
	
		closeBoard.onclick = function() {
		
			content.removeChild(board);
			
			return false;
		
		};
	};
		that.newMessage = function() {
			var text = document.querySelector("#" +newBoard+ " textarea");
			var messageObject = new Message(text.value, new Date());
			
			that.messages.push(messageObject);
			
			text.value = "";
		};
}

		