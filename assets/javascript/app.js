var panel = $('#quiz-area');
var countStartNumber = 30;


///////////////////////////////////////////////////////////////////////////////

//CLICK EVENTS

///////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#play-again', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#wrapper2').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

///////////////////////////////////////////////////////////////////////////////


//QUESTIONS


///////////////////////////////////////////////////////////////////////////////

var questions = [{
  question: "What 2016 presidential candidate should've won the Primary and ultimately the Presidency?",
  answers: ["Jill Stein", "Ted Cruz", "Bernie Sanders", "Ben Carson"],
  correctAnswer: "Bernie Sanders",
}, {
  question: "What's the best The Legend of Zelda game of all time?",
  answers: ["Ocarina of Time", "A Link to the Past", "The Legend of Zelda", "Breath of the Wild"],
  correctAnswer: "A Link to the Past",
}, {
  question: "What's the best sport to play/do at the beach?",
  answers: ["Frisbee", "Surfing", "Boogie Boarding", "Volleyball"],
  correctAnswer: "Volleyball",
}, {
  question: "What's the craziest programming language?",
  answers: ["Whitespace", "LOLCODE", "Malbolge", "JavaScript"],
  correctAnswer: "LOLCODE",
}, {
  question: "Which country is the coolest?",
  answers: ["Iceland", "Wales", "Italy", "Spain"],
  correctAnswer: "Iceland",
}, {
  question: "How many licks does it take to get to the Tootsie Roll center of a Tootsie Pop?",
  answers: ["One", "Two", "Three", "None, you just bite it, silly"],
  correctAnswer: "None, you just bite it, silly",
}, {
  question: "What's the best The Lord of the Rings movie?",
  answers: ["The Fellowship of the Ring", "The Two Towers", "The Return of the King", "Don't make me do this..."],
  correctAnswer: "Don't make me do this...",
}, {
  question: "What's the best FromSoftware game?",
  answers: ["Demon's Souls", "Dark Souls", "Dark Souls 3", "Bloodborne"],
  correctAnswer: "Dark Souls",
}];

///////////////////////////////////////////////////////////////////////////////


//GAME OBJECT


///////////////////////////////////////////////////////////////////////////////

var game = {
  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },

  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },

  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    // panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {
    clearInterval(timer);

    panel.html("<h2>Here are your results!</h2>");
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="play-again">Play Again?</button>');
  },

  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Incorrect!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    // panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    // panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};