"use strict";

window.addEventListener("load", function() {
	var mainWindow = [];
	
	var newBack = document.getElementById("newBack");
	var newRSS = document.getElementById("newRSS");
	var newMem = document.getElementById("newGame");
	var newChat = document.getElementById("newChat");
	var moveThis = document.querySelector(".test");
	var check = 1;
	
	// Nytt Bakgrunds Fönster
	newBack.onclick = function() {
			var newB = new newBackground();
			newB.init();
			console.log("You have a new background.");
		};
	
	// Nytt RSS Fönster
	newRSS.onclick = function() {
			var wrapper = document.querySelector(".test");
			var newBoard = document.createElement("div");
			newBoard.id = "Chatboard: " + " " + check;
			newBoard.setAttribute("class", "RSS");
			wrapper.appendChild(newBoard);
			var rssflow = new RssWindow(newBoard.id);
			rssflow.init();
			check += 1;
			console.log("You have created a new RSS.");
	};
	// Nytt spel
	newMem.onclick = function() {
			var wrapper = document.querySelector(".content");
			var newBoard = document.createElement("div");
			newBoard.id = "Gameboard: " + " " + check;
			newBoard.setAttribute("class", "board");
			wrapper.appendChild(newBoard);
			var memory = new MemoryGame(newBoard.id);
			memory.init();
			check += 1;
			console.log("You have created a new game.");
	};
	
	// Nytt Chat Fönster
	newChat.onclick = function() {
			var wrapper = document.querySelector(".ninjaBoard");
			var newBoard = document.createElement("div");
			newBoard.id = "Chatboard: " + " " + check;
			newBoard.setAttribute("class", "ninja");
			wrapper.appendChild(newBoard);
			var chat = new ChatWindow(newBoard.id);
			chat.init();
			check += 1;
			console.log("You have created a new Chat Window.");
	};
		
	draggable(moveThis);

	function newBackground(newBack) {
		var that = this;
		
		that.init = function() {
			this.backGround();
		}
		 that.backGround = function() {
			 
			//skapar element för fönster och dess delar
			var divChooseBackground = $("<div class='chooseBackgroundWindow'></div>");
			var header = $("<header class='headerChooseBackgroundWindow'></header>");
			var iconChooseBackground = $("<img class='iconChooseBackgroundWindow' src='pics/icon_DSC00846.png'/>");
			var headerTextChooseBackground = $("<span class='headerTextChoosenBackgroundWindow'>Välj bakgrundsbild</span>");
			var aCloseChooseBackground = $("<a class='aClose' href='#' titel='Stäng'></a>");
			var imgCloseChooseBackground = $("<img class='imgClose' src='pics/fileclose.png'/>");
			var mainChooseBackground = $("<main class ='mainChooseBackgroundWindow'></main>");
			var footerChooseBackground = $("<footer class='footerChooseBackgroundWindow'></footer>");

			//lägger ut elementen i DOMen
			$(".content2").append(divChooseBackground);
			divChooseBackground.append(header);
			divChooseBackground.append(mainChooseBackground);
			divChooseBackground.append(footerChooseBackground);
			header.append(iconChooseBackground);
			header.append(headerTextChooseBackground);
			header.append(aCloseChooseBackground);
			aCloseChooseBackground.append(imgCloseChooseBackground);
			
			
			
			
			
			var that = this;
			aCloseChooseBackground.click(function() {
				that.closeBackgroundWindow(divChooseBackground);
			});
			this.positionWindow();

			divChooseBackground.click(function() {
				that.moveWindowToTop(divChooseBackground);
			})
			//Läser in json-sträng, parsar och presenterar tumnagelbilder i fönstret
			//callback anropas vid "onreadystate" och skickar då in responstext från Ajax-anrop
			var callback = function(respons) {
				/*I callback är "this" beroende på vem som anropar funktionen callback. 
				 Använder det "that" som deklarerats i den yttre funktionen eftersom jag vill ha samma this som där */
				var images = JSON.parse(respons);
				
				var imageDivs = that.makeImageDivs(images);
				mainChooseBackground.append(imageDivs);

				//Kopplar klickevent till alla a-taggar
				var as = $(".aAroundImgsToChoose");
				as.click(function(e) {
					that.changeBackgroundImage(e);
				});
				/*Tar bort ladda-symbol om det finns */
				that.deleteLoadingIcon(footerChooseBackground);
			};
			
			/* 		xhr.onreadystatechange = function(e) {
			console.log("are");
			
			if (xhr.readyState == 4) {
				console.log(xhr.status);
				
			if (xhr.status == 200) {
				loadingIcon.parentNode.removeChild(loadingIcon);
				newBack.thumbImages = JSON.parse(xhr.responseText);
			}
			}
			},
			xhr.open('GET', "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true);
			xhr.send(null);
			}; */
			new XMLHttpReq("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", callback, footerChooseBackground);
		};
		
		
		/*Skapar en img-tag i en a-tag för varje tumnagebild som lästs in med json
		 Varje a-tag läggs i en div*/
		that.makeImageDivs = function(images) {
			//Hittar den högsta höjden bland tumnagelbilderna...
			var heights = images.map(function(image) {
				return image.thumbHeight;
			});
			var highestImg = Math.max.apply(Math, heights);

			//...och den största bredden bland tumnagelbilderna
			var widths = images.map(function(image) {
				return image.thumbWidth;
			});
			var widestImg = Math.max.apply(Math, widths);
			//skapar array och divar med bilder i a-taggar. Divarna läggs i arrayen som returneras
			var divArray = [];
			var i;
			for ( i = 0; i < images.length; i += 1) {
				var thumbSrc = images[i].thumbURL;
				var picture = images[i].URL;
				var a = $("<a class ='aAroundImgsToChoose' href='#' title='Choose background'></a>");
				var jsImg = "<img class='imgsToChoose' src='" + thumbSrc + "' data-bigImg ='" + picture + "'  />";
				var jQImg = $(jsImg);
				var jsDiv = "<div class='imageDivs' style='height: " + highestImg + "px ;width: " + widestImg + "px' ></div>";
				var thumbDiv = $(jsDiv);
				thumbDiv.append(a);
				a.append(jQImg);
				divArray.push(thumbDiv);
			}
			return divArray;
		}

		that.deleteLoadingIcon = function(footerChooseBackground) {
			footerChooseBackground.children().remove();
		}
		that.changeBackgroundImage = function(e) {
			var background = $("html");
			var imgTag = e.currentTarget.firstChild;
			var jQImgTag = $(imgTag);
			var newSrc = jQImgTag.attr("data-bigImg");
			background.css("background-image", "url(" + newSrc + ")");
			background.css("background-size", "inherit");
			background.css("background-repeat", "repeat");
		}
		 that.closeBackgroundWindow = function(divChooseBackground) {
			divChooseBackground.remove();
		}
		that.moveWindowToTop = function(divChooseBackground) {
			var divs = $(".chooseBackgroundWindow");

			divs.each(function(index) {
				var divJqIndex = $(divs[index]);
				divJqIndex.removeClass("front");
			});
			divChooseBackground.addClass("front");
		}
		that.positionWindow = function() {
			var move = document.querySelector(".chooseBackgroundWindow");

				draggable(move);
		}
		
	};

	
	// Här skapar jag upp mitt memory objekt.
	function MemoryGame(boardID) {
		
		var that = this;
		// Mina Closures variabler
		var countArray = [];
		var guessCount = 0;
		var clickCount = 0;
		var pairCount = 0;
		
		that.init = function() {
			that.generateMemory();
		};
		
		that.random = function() {
			var randomTiles = RandomGenerator.getPictureArray(4, 4);
			return randomTiles;
		};
		
		that.generateMemory = function() {
			var currentBoard, a, img, memoryBoard, randomArray, count, closeTab, wrapper;
			
			randomArray = that.random();
			wrapper = document.querySelector(".content");
			currentBoard = document.getElementById(boardID);
			closeTab = document.createElement("a");
			closeTab.href = "#";
			closeTab.textContent = "";
			closeTab.setAttribute("class", "closeTab");
			memoryBoard = document.createElement("div");
			memoryBoard.setAttribute("class", "memoryBoard");
			currentBoard.appendChild(closeTab);
			currentBoard.appendChild(memoryBoard);

			// Gör så att man kan ändra position på fönstret.
			draggable(wrapper);
			
			// close memoryBoardboard
			closeTab.onclick = function() {
			wrapper.removeChild(currentBoard);
			console.log("You closed down " + " " +boardID);
			return false;
			};
			
			for (var i = 0; i < randomArray.length; i += 1) {
			randomTiles(i);
			}
		
			
		/*
		Funktionen som tar hand om/skapar upp bilderna
		Sätter även lite attribut till dom olika childsen.
		Loggar även när en användare trycker på en bild.
		*/
		
		function randomTiles(i) {
			a = document.createElement("a");
			img = document.createElement("img");
			a.href = "#";
			a.setAttribute("class", "tile");
			img.src = "pics/start.png";
			memoryBoard.appendChild(a);
			a.appendChild(img);
			
				a.onclick = function() {
					that.switchTile(this, randomArray[i]);
					console.log("You pressed on picture:" + " " + randomArray[i]);
					return false;
				};
			}
		};
		/*
		Skapar upp en funktion som jag skickar in två argument (click, random)
		I denna funktion har jag även 2 variabler som kommer ta hand om
		vilka som kommer vara firstChild osv.
		*/
		that.switchTile = function(click, randomArray) {
		
			var imgOne;
			var imgTwo;
			
			clickCount += 1;
		/*
		Om cc är 1 så kommer den först kolla om det är par och sätter
		attribut till dom olika värdena.
		Kollar att första klicket inte tillhör par
		*/
		
		if (clickCount == 1)
		{
			if (click.firstChild.classList.contains("pair")) {
			
				clickCount = 0;
				return;
			}
		
			imgOne = click.firstChild;
			imgOne.src = "pics/" + randomArray + ".png";
			imgOne.setAttribute("class", "open");
			countArray.splice(0, 1, imgOne);
			return;
			
		}
		
		// Kollar att andra klicket inte tillhör par
		if (clickCount === 2) 
			{
			
			if (click.firstChild.getAttribute("class") == "open")
			{
				clickCount = 1;
				return;
			}
			if (click.firstChild.classList.contains("pair")) {
				clickCount = 1;
				return;
			}
			
		imgTwo = click.firstChild;
		imgTwo.src = "pics/" + randomArray + ".png";
		countArray.splice(1, 1, imgTwo);
		/*
		Om Första i arryen är samma
		som andra så sätter den ut
		attributen att dom är samma.
		Samt att den lägger till en i par.
		Även sätter click till 0.
		*/
		if (countArray[0].src === countArray[1].src) 
		{
			countArray[0].setAttribute("class", "pair");
			countArray[1].setAttribute("class", "pair");
			pairCount += 1;
			clickCount = 0;
		}
		// Sätter om man svara fel byter tillbaka.
		else {
		setTimeout(function() 
		{
			countArray[0].src = "pics/start.png";
			countArray[1].src = "pics/start.png";
			countArray[0].classList.remove("open");
			countArray[1].classList.remove("open");
			clickCount = 0;
		}, 1000);
		}
		guessCount += 1;
		}
		// Om man har svarat rätt på alla 8st.
		if (pairCount === 8) {
			alert("Nice, You did it on" + " " + guessCount + " " + "trys.");
		}
		// Om man har gissat 10x
		if (guessCount === 10) 
		{
			alert("You have guessed 10 times. You have 15 guesses left. Be careful.");
		}
		// Om man har gissat 10x
		if (guessCount === 20) 
		{
			alert("You have only 5 guesses left. Be careful.");
		}
		// Om man har svarat över 25 gissningar.
		if (guessCount === 25) 
		{
			var currentBoard, a, img, memoryBoard, randomArray, count, closeTab, wrapper;
			
			randomArray = that.random();
			wrapper = document.querySelector(".content");
			currentBoard = document.getElementById(boardID);
			closeTab = document.createElement("a");
			closeTab.href = "#";
			closeTab.textContent = "Close";
			closeTab.setAttribute("class", "closeTab");
			memoryBoard = document.createElement("div");
			memoryBoard.setAttribute("class", "memoryBoard");
			currentBoard.appendChild(closeTab);
			currentBoard.appendChild(memoryBoard);

			wrapper.removeChild(currentBoard);

			alert("Epic fail. You suck!");
			
		}
		};
	};

	function RssWindow(rssID) {
		
		var refreshRate = 2000;
		
		var that = this;
		
		that.init = function() {
			that.RSS();
		};
		
		that.RSS = function() {
			var currentBoard = document.getElementById(rssID);
			var currentBoard, a, closeTab, wrapper, mainRSS;
			wrapper = document.querySelector(".test");
			currentBoard = document.getElementById(rssID);
			
			mainRSS = document.createElement("div");
			mainRSS.href = "#";
			mainRSS.setAttribute("class", "mainRSS");
			currentBoard.appendChild(mainRSS);
			
			closeTab = document.createElement("a");
			closeTab.href = "#";
			closeTab.textContent = "";
			closeTab.setAttribute("class", "closeTab3");
			currentBoard.appendChild(closeTab);
			
			closeTab.onclick = function() {
				wrapper.removeChild(currentBoard);
				console.log("You closed down " + " " +rssID);
				return false;
			};	
			
			
			var dn = "http://www.dn.se/m/rss/senaste-nytt";
			var svd = "http://www.svd.se/?service=rss";
			
			var xhr = new XMLHttpRequest();
			
			xhr.open('GET', 'http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url='+escape(svd), true);
			xhr.send(null);
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 2) {
					mainRSS.innerHTML = "Laddar RSS";
				}
				if (xhr.readyState === 4 && xhr.status === 200) {
					
					mainRSS.innerHTML = xhr.responseText;
				}
				
			};
		
			

			
/* 			that.reloadRSS = function() {
							// close memoryBoardboard

				$('.test').rssfeed('http://www.svd.se/?service=rss', {
					limit: 3,
					updateInterval: 500,
					reloadRSS: 500,
					reload: 500,
				});
				
				closeTab.onclick = function() {
					wrapper.removeChild(currentBoard);
					console.log("You closed down " + " " +rssID);
					return false;
				};				
				
			}; */


		};
	};
	function ChatWindow(boardID) {
		
		var that = this;
		
		that.init = function() {
			that.newChatWin();
		};
		
		that.newChatWin = function() {

			// Wrong answers displaying them later
			var wrongAnswers = 0;
			var correctAnswers = [];
			
			// ^_^ Ninjastyle!!
			var currentBoard, a, closeTab, wrapper;
			var ninjaBoard = document.querySelector(".ninjaBoard");
			var questionParagraph = document.createElement("p");
			var answerInput = document.createElement("input");
			var answerButton = document.createElement("input");
			var wrongAnswer = document.createElement("div");
			var wrongAnswer2 = document.createElement("div");
			
			// Gör så att det går att flytta objektet.
			draggable(ninjaBoard);
			
			// setAttribute
			answerInput.setAttribute("type", "text");
			answerButton.setAttribute("type", "button");
			answerInput.setAttribute("placeholder", "Svar?");
			answerButton.setAttribute("id", "test2");
			answerButton.setAttribute("value", "Skicka");
			wrongAnswer.setAttribute("class", "wrongA2");
			wrongAnswer2.setAttribute("class", "wrongB2");
			closeTab = document.createElement("a");
			closeTab.href = "#";
			closeTab.textContent = "";
			closeTab.setAttribute("class", "closeTab2");
			// Getting questions from the server
			getQuestion("http://vhost3.lnu.se:20080/question/1");
			//getQuestion("./data/data.json");
			
			//Appends
			ninjaBoard.appendChild(wrongAnswer2);
			
			wrapper = ninjaBoard;
			ninjaBoard = document.getElementById(boardID);

			ninjaBoard.appendChild(closeTab);
			
			// close memoryBoardboard
			closeTab.onclick = function() {
				wrapper.removeChild(ninjaBoard);
				wrapper.removeChild(wrongAnswer2);
				console.log("You closed down " + " " +boardID);
				return false;
			}
			
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
					$('.ninjaBoard').html("<img src='pics/ninja.png'>");
				}
			}
			
		};
	};


});

