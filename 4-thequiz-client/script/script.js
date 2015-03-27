"use strict";

window.addEventListener("load", function() {

	newNinjaQuiz();


function newNinjaQuiz() {

	// Wrong answers displaying them later
    var wrongAnswers = 0;
	var correctAnswers = [];
	
	// ^_^ Ninjastyle!!
	
    var ninjaBoard = document.getElementById("ninjaBoard");
	
    var questionParagraph = document.createElement("p");
    var answerInput = document.createElement("input");
    var answerButton = document.createElement("input");
	var wrongAnswer = document.createElement("div");
	var wrongAnswer2 = document.createElement("div");
	
	// setAttribute
	answerInput.setAttribute("type", "text");
    answerButton.setAttribute("type", "button");
	answerInput.setAttribute("placeholder", "Svar?");
	answerButton.setAttribute("id", "test");
    answerButton.setAttribute("value", "Skicka");
	wrongAnswer.setAttribute("class", "wrongA");
	wrongAnswer2.setAttribute("class", "wrongB");
	
	// Getting questions from the server
    getQuestion("http://vhost3.lnu.se:20080/question/1");
	//getQuestion("./data/data.json");
	
    //Appends
	ninjaBoard.appendChild(wrongAnswer2);
    
    function getQuestion(questionURL) {
        //Create xhr object for retrieving
        var xhrGet = new XMLHttpRequest();

        xhrGet.onreadystatechange = function() {
            if (xhrGet.readyState === 4 && xhrGet.status == 200) {
                //Parse and retrieve question
                var questionObject = JSON.parse(xhrGet.responseText);
				
                //Render question
                questionParagraph.innerHTML = questionObject.question;

                ninjaBoard.appendChild(questionParagraph);
				
                ninjaBoard.appendChild(answerInput);
				
                ninjaBoard.appendChild(answerButton);
                
				ninjaBoard.appendChild(wrongAnswer);
				
                answerButton.onclick = function() {
                    sendAnswer(questionObject.nextURL);
                };
            }
        };
            
        xhrGet.open("GET", questionURL, true);
        xhrGet.send(null);  
    }
    function sendAnswer(answerURL) {
        //Create xhr object for sending
		wrongAnswer.innerHTML = "You have failed:" + wrongAnswers;
        var xhrSend = new XMLHttpRequest();
        
        xhrSend.onreadystatechange = function() {
		
            if(xhrSend.readyState === 4) {
				var answer = JSON.parse(xhrSend.responseText);
				wrongAnswers += 1;
				wrongAnswer2.innerHTML = answer.message;
				getQuestion(answer.nextURL);
				correctAnswers++;
				wrongAnswers -= 1;
				wrongAnswer2.innerHTML = answer.message;
			}
			answerInput.value = "";
        };

        var sendThis = JSON.stringify({"answer": answerInput.value});
		
        xhrSend.open("POST", answerURL, true);
        xhrSend.setRequestHeader('Content-Type', 'application/json');
        xhrSend.send(sendThis);
		
		if(wrongAnswers > 10)
		{
			alert("Sorry but you suck!");
			$('#ninjaBoard').html("<img src='img/ninja.png'>");
		}
		if(correctAnswers >= 4)
		{
			var total = correctAnswers + wrongAnswers;
			alert("Oh great you made it after!!" + " " + total + " " + "trys.");
			$('#ninjaBoard').html("<img src='img/ninja.png'>");
		}


    }

}
});

