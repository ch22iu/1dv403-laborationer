var Quiz = {

  config: null,
  idx: 0,
  total: 0,
  qnum: 0,
  $main: null,
  $current: null,
  $next: null,
  dataArray: null,

  init: function(settings) {
    this.config = {
      $next: $('#next'),
      $back: $('#back')
    };
    // wait until file is initialized to set variable, or else it may not find it
    this.$main = $('#main');
    this.$currentDiv = $('#main div:last');
    this.$previousDiv = $('#main div:last').prev();
    this.$answer = $('#answer');
    
    this.getQuizData();
    this.eventBindings();
  },

  // iterate through data
  // get next div
  // pass to template  get Quiz data
  // render into dom 
  // show

  getQuizData: function() {
    if(this.dataArray === null) {
    // this is all of the data  
      this.dataArray = AJAXPromiseManager.init();
    }
    var templateSource = $('#question-template').html(),
      templateCompile = Handlebars.compile(templateSource),
      scope = this;
    this.renderQuizData(templateCompile);
  },
  // was setup function

  renderQuizData: function(template) {
    var scope = this;
    this.$main.append(template(scope.dataArray[scope.idx]));
  },

  eventBindings: function() {
    var scope = this;
    this.config.$next.on('click', function(){ 
      scope.handleNextClick(); 
    });
    this.config.$back.on('click', function(){
      scope.handleBackClick();
    });
  },
  
  handleNextClick: function() {
    if(this.isAtLeastOneAnswerSelected()){
      if (this.isSelectedAnswerCorrect()) {
        this.total++;
        $('#total').text(this.total);
        console.log('correct');
      }
      else{
        console.log('incorrect');
      }
      
      this.displayCorrectAnswerForQIndex(this.idx);
      this.$answer.show();
      
      if (this.isQuizAtEnd()) {
        this.onQuizComplete();
      }
      else {
        this.idx++;
        this.loadQuestionByIndex();
      }

    }
    else{
      alert("ANSWER ME NOW");
    }
  },
  
  handleBackClick: function() {
    this.lastQuestion();
    this.displayCorrectAnswer();
    // prevents a negative score 
    this.total > 0 ? this.total-- : this.total = 0;
    $('#total').text(this.total);
    this.qnum--;
    this.$answer.hide();
  },
  
  isAtLeastOneAnswerSelected: function() {
    return $("input:radio").is(":checked");
  },

  isQuizAtEnd: function() {
    return (this.idx+1) >= this.dataArray.length;
  },

  isSelectedAnswerCorrect: function() {
    var cAnsIndex = this.dataArray[this.idx].correctAnswer;

    console.log(cAnsIndex, this.getCurrentSelectedAnswerIndex());
    return cAnsIndex == this.getCurrentSelectedAnswerIndex();
  },

  getCurrentSelectedAnswerIndex: function(){
    return Number($('input[type="radio"]:checked').val());
  },

  displayCorrectAnswerForQIndex: function(Index) {
    // see if you can make a custom handlebars helper to make this display answer for previous question
    var answerIndex = this.dataArray[Index].correctAnswer;
    $('#answer').text('Correct answer to the previous question: ' + this.dataArray[Index].choices[answerIndex]);  
  },

  loadQuestionByIndex: function() {
    var scope = this;
    this.$current = $('#main div:last');
    this.$next = $('#main div:last').next();
    console.log(this.idx)
    if(this.$current.is(':visible')&& this.idx < Quiz.dataArray.length) {
      this.$current.removeClass('current').fadeOut('fast', function(){
        // load next one 
        Quiz.getQuizData();
        //pass to render fn then fade it in
        scope.loadNextDiv(scope.dataArray[scope.idx]);
      });
    };

    if(this.idx == 1) {
      this.config.$back.show();
    };

  },

  loadNextDiv: function() {
    //console.log(nextObj);
    
    //remove elements without class of current from the DOM
    if(!this.$current.hasClass('current')) {
      this.$current.remove();
    }
    //turn this into a jquery object (wrap in a jquery selector)
    //then fade in
    this.$next.addClass('current').fadeIn('fast');
  },

  nextQuestion: function() {
    this.idx++;
    this.loadQuestionByIndex();
  },

  lastQuestion: function() {
    this.idx--;
    this.loadQuestionByIndex();
  },
  
  onQuizComplete: function() {
    var scope = this;
    setTimeout(function(){
      $('#main, #next, #back').hide();
      $('h1').text('The End.');
      $('h2').text('Your Score Is: ' + scope.total);
    }, 750);
  }
};

$(function() {
  AJAXPromiseManager.init();
  Quiz.init();
});