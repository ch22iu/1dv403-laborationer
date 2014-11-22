"use strict";

window.addEventListener("load", function() {
	var mBoard = document.querySelector(".messageBoard");
	
	// Kollar hur många meddelande man har skapat upp
	var check = 0;
	
	mBoard.onclick = function() {
		var content = document.querySelector(".content");
		var newMess = document.createElement("div");
		newMess.setAttribute("id", "board" +check);
		content.appendChild(newMess);
		mBoard.style.color = "grey";
		var board = new messageBoard("board" +check);
		board.init();
		
		// Loggar nytt meddelande (Obj).
		check += 1;
		console.log(check);
		console.log("Nytt meddelande!!");
		return false;
	};
});

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
		var messageCount = document.createElement("span");
		var timeButton = document.createElement("a");
		var timeStamp = document.createElement("span");
		
		// Lägger till attributen
		messageCount.setAttribute("class", "messageCount");
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
		timeStamp.setAttribute("class", "time-stamp");
		timeButton.setAttribute("href", "#");
		timeButton.setAttribute("class", "time");
		// Append
		board.appendChild(header);
		header.appendChild(h1);
		h1.textContent = "LabbyMezzage v 1337";
		board.appendChild(messageBox);
		board.appendChild(textarea);
		board.appendChild(button);
		board.appendChild(messageCount);
		
		
		
		
		button.addEventListener("click", that.newMessage, false);
	
		closeBoard.onclick = function() {
		
			content.removeChild(board);
			
			// Loggar
			console.log("Ta bort!");
			
			return false;
		
		};

	};
	that.newMessage = function() {
		var text = document.querySelector("#" +newBoard+ " textarea");
		var messageObject = new Message(text.value, new Date());

		that.message.push(messageObject);
		that.renderMessages();
		
		// Rensar
		text.value = "";
				
		// Loggar
		console.log("Lägger till meddelande.");
	};
		
	that.renderMessages = function() {
		var messageArea = document.querySelector("#" +newBoard+ " .message-box");
		// Tar bort alla meddelanden
		messageArea.innerHTML = "";
		
		// Sätter antal meddelanden
		var messageCounter = document.querySelector("#" +newBoard+ " .messageCount");

		messageCounter.innerHTML = "Antal meddelanden: " + that.message.length;


		for (var i = 0; i < that.message.length; i += 1) {
			renderMessage(i);
			}

		function renderMessage(messageID) {
			var text = document.createElement("p");
			var messageContainer = document.createElement("article");
			var deleteButton = document.createElement("a");
			var infoContainer = document.createElement("div");
			var timeButton = document.createElement("a");
			var timeStamp = document.createElement("span");

			infoContainer.setAttribute("class", "info");
			deleteButton.setAttribute("href", "#");
			deleteButton.setAttribute("class", "delete");
			timeButton.setAttribute("href", "#");
			timeButton.setAttribute("class", "time");
			timeStamp.setAttribute("class", "time-stamp");
			infoContainer.setAttribute("class", "info");
			messageContainer.setAttribute("class", "message");

			// Lägger till meddelandet
			text.innerHTML = that.message[messageID].getHTMLText();
			
			// Lägger till tiden
			timeStamp.innerHTML = that.message[messageID].getDateText();

			messageArea.appendChild(messageContainer);
			messageContainer.appendChild(text);
			messageContainer.appendChild(timeStamp);
			infoContainer.appendChild(timeButton);
			infoContainer.appendChild(deleteButton);
			messageContainer.appendChild(infoContainer);
			
				// Ta bort meddelande
				deleteButton.onclick = function() {
					var textbox = document.querySelector("#" +newBoard+ " textarea");
					if (window.confirm("Vill du verkligen radera meddelandet?")) {
						console.log("Användare har tagit bort meddelande: " + " " + messageID);
						that.removeMessage(messageID);
						messageArea.innerHTML = "";
						that.renderMessages();
						textbox.focus();
					}

					return false;
				};

				// Visa tid i alert
				timeButton.onclick = function() {
					that.alertTime(messageID);
					return false;
				};
				
			that.removeMessage = function(messageID) {
				this.message.splice(messageID, 1);
			};

			that.alertTime = function(messageID) {
				alert(this.message[messageID].getDateText(true));
			};
		}
	};
}

		