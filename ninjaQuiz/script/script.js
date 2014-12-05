var currentQuestionIndex = 0;
var correctAnswer = 1;
var wrongAnswer = 1;
$(document).ready(function(){
	$("#totalQuestions").html(allQuestions.length);
	showCurrentQuestion(currentQuestionIndex);
	
	$("#next").on("click", function(e){
		e.preventDefault();
		if(isValid()){
			$('#alert').html("");

			gradeCurrentQuestion();
			
			if(currentQuestionIndex < allQuestions.length - 1 ){
				currentQuestionIndex++;
				console.log("current index is " + currentQuestionIndex);
				showCurrentQuestion(currentQuestionIndex);
			} else {
				var score = calculateScore();
				var scoreHTML = "Your score is " + score + ".";
				
				if(score >= 5){
					$('.container').html(scoreHTML + " You did it!" + "<img src='img/ninja.png'>");
				} else if( score >= 3){
					$('.container').html(scoreHTML + " Close " + "<img src='img/ninja.png'>");
				} else {
					$('.container').html(scoreHTML + " Ha noob " + "<img src='img/ninja.png'>");
				}
			}	
		} else {
			// tell user to select an option 
			$('#alert').hide().html("You need to choose an option to continue.").fadeIn('slow ');
			showCurrentQuestion(currentQuestionIndex);
		}
	});

	$('#back').on("click", function(e){
		e.preventDefault();
		gradeCurrentQuestion();
		if(currentQuestionIndex > 0){
			currentQuestionIndex = currentQuestionIndex - 1;
			showPreviousQuestion(currentQuestionIndex, allQuestions[currentQuestionIndex].selection);
		}
		
	});
	
});

function showCurrentQuestion(index){
	$("#currentQuestion").html(index + 1);
	var questionHTMl = "<legend>" + allQuestions[index].question +"</legend>";
	var choicesHTML = '';
	for(var i = 0; i <  allQuestions[index].choices.length; i++){
		choicesHTML += '<label><input type="radio" name="q" value=' + i + '>' + allQuestions[index].choices[i] + '</label>';
	}
	$('.questionradios').html(questionHTMl + choicesHTML);
	if(allQuestions[currentQuestionIndex].selection != -1){
		$(":radio[value=" + allQuestions[currentQuestionIndex].selection +"]").prop("checked", true);
	}
}

function gradeCurrentQuestion(index){
	allQuestions[currentQuestionIndex].selection = +$('input[name=q]:checked').val();
	if(allQuestions[currentQuestionIndex].selection == allQuestions[currentQuestionIndex].correctAnswer){
		$('#wrong').html("Correct answer").fadeIn('slow');
		$('#correct').html(correctAnswer + " " + "correct answer(s)").fadeIn('slow');
		correctAnswer++;
	}
	else
	{
		$('#wrong').html(wrongAnswer + " " + "wrong answer").fadeIn('slow');
		wrongAnswer += 1;
		showCurrentQuestion(index)
	}
}

function showPreviousQuestion(index, choice){
	showCurrentQuestion(index); // display the question
	$(":radio[value=" + choice +"]").prop("checked", true); // select the radio button the user chose
};

function isValid(){
	//checks if a radio button is selected; returns boolean value 
	if($('input[name=q]:checked').val()){
		return true;
	} else {
		return false;
	}
}

function calculateScore(){
	var score = 0;
	for(var i = 0; i <  allQuestions.length; i++){
		if(allQuestions[i].selection == allQuestions[i].correctAnswer){
			score++;
		}
	}
	return score;
}
 
var allQuestions = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "data/data.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 



