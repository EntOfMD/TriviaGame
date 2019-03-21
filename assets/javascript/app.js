//Constructor for questions
function Question(
  category,
  correct_answer,
  difficulty,
  incorrect_answers,
  question,
  type
) {
  this.catergory = category;
  this.correct_answer = correct_answer;
  this.difficulty = difficulty;
  this.incorrect_answers = incorrect_answers;
  this.question = question;
  this.type = type;
}

//this deals with timer
const timer_ui = {
  countdown: 10, //time left to answer
  intId: undefined, //can't leave obj props blank, so undefined will do
  clockRunning: false,

  // preparing for future
  reset: () => {
    clearInterval(timer_ui.intId);
    timer_ui.clockRunning = false;
    timer_ui.countdown = 10;
    $('#time-alert').html(`<h3>Time remaining: ${timer_ui.countdown}</h3>`);
    $('#incorrect-id').hide();
    $('#correct-id').hide();
    api.fetch();
    $('#quiz_ui').show();
    timer_ui.start();
  },
  //this will initiate the counter (think of it like the starter motor on the car..)
  start: () => {
    $('#time-alert').html(`<h3>Time remaining: ${timer_ui.countdown}</h3>`);

    if (!timer_ui.clockRunning) {
      timer_ui.clockRunning = true;
      timer_ui.intId = setInterval(timer_ui.counter, 1000);
    }
  },
  stop: () => {
    clearInterval(timer_ui.intId);
    timer_ui.clockRunning = false;
  },
  //this is the counter. (this is the "engine")
  counter: () => {
    timer_ui.countdown--;
    $('#time-alert').html(`<h3>Time remaining: ${timer_ui.countdown}</h3>`);
    //when the timer runs out, do this
    if (timer_ui.countdown === 0) {
      timer_ui.stop();
      $('#time-alert').toggleClass('alert-info alert-danger');
    }
  }
};

//this deals with API
const api = {
  qList: [],
  cAnswer: '',
  fetch: () => {
    let url = `https://opentdb.com/api.php?amount=1&category=9&type=multiple`;
    $.ajax({
      type: 'GET',
      url: url
    })
      .then(res => {
        if (res.response_code === 0) {
          api.createQuiz(res.results);
          console.log(
            `Succesfully fetched from API! Passed to createQuiz(). Response Code: ${
              res.response_code
            }`
          );
        } else if (res.response_code === 2) {
          console.log(
            `Unable to fetch! Check the URL. Response Code: ${
              res.response_code
            }`
          );
        }
      })
      .catch(err => {
        throw err;
      });
    return `Initial request sent to API, Waiting for response...`;
  },
  createQuiz: data => {
    //Uses constructor fx and creates a new object for each question
    for (i = 0; i < data.length; i++) {
      var quest = new Question(
        data[i].category,
        data[i].correct_answer,
        data[i].difficulty,
        data[i].incorrect_answers,
        data[i].question,
        data[i].type
      );
      // api.displayDOM(quest);
      // api.qList = JSON.stringify(quest);
      api.qList = Object.entries(quest);
    }
    api.displayDOM();
    return quest;
  },
  displayDOM: () => {
    // var random = pullMyHairOutOMG => {
    //     let sqrtle =
    //         pullMyHairOutOMG[
    //             Math.floor(Math.random() * pullMyHairOutOMG.length)
    //         ];
    //     return sqrtle;
    // };

    const corAnswer = api.qList[1][1],
      wrongAnswer1 = api.qList[3][1][0],
      wrongAnswer2 = api.qList[3][1][1],
      wrongAnswer3 = api.qList[3][1][2];

    const answerList = [wrongAnswer1, wrongAnswer2, wrongAnswer3, corAnswer];
    api.cAnswer = corAnswer;
    console.log(api.cAnswer);
    Array.prototype.shuffle = function() {
      let list = answerList;

      for (i = list.length - 1; i >= 0; i--) {
        let rIndex = Math.floor(Math.random() * (i + 1));
        let iIndex = list[rIndex];

        list[rIndex] = list[i];
        list[i] = iIndex;
      }
      return list;
    };
    var randomArray = answerList.shuffle();

    $('#question_ui').html(api.qList[4][1]);
    $('#question-1').html(randomArray[0]);
    $('#question-2').html(randomArray[1]);
    $('#question-3').html(randomArray[2]);
    $('#question-4').html(randomArray[3]);
  }
};

const vals = {
  correct: 0,
  incorrect: 0,
  wins: 0,
  losses: 0,
  timeout: 0,
  corCheck: e => {
    if (e == api.cAnswer) {
      timer_ui.stop();
      vals.correct++;
      console.log(vals.correct);
      $('#quiz_ui').hide();
      $('#correct-card').html(
        `  <img
              src="https://media3.giphy.com/media/md3TNZtG6n9E4/giphy.gif"
              alt="pichuparty"
              style="width:400px;"
          /><br>
          <br>Correct: ${vals.correct} Incorrect: ${vals.incorrect}`
      );
      $('#correct-id').show();
      setTimeout(timer_ui.reset, 5000);
    } else if (e !== api.cAnswer) {
      timer_ui.stop();
      vals.incorrect++;
      console.log(vals.incorrect);
      $('#quiz_ui').hide();
      $('#incorrect-card').html(
        ` <img
                src="https://media.giphy.com/media/V4sY8JCTxGyaI/giphy.gif"
                alt="charcharwaterfire" style="width:400px;"
            /><br>Correct Answer is :<br><h1>${api.cAnswer}</h1>
            <br>Correct: ${vals.correct} Incorrect: ${vals.incorrect}`
      );
      $('#incorrect-id').show();
      setTimeout(timer_ui.reset, 5000);
    }
  }
};

//main
$(function() {
  $(this).bind('contextmenu', function(e) {
    e.preventDefault();
  });
  $(this).keydown(function(e) {
    e.preventDefault();
  });
  $('#start-btn').click(() => {
    $('#options').hide();
    timer_ui.start();
    $('#start-btn').hide();
    $('#quiz_ui').show();
    $('hr').show();
    $('#time-alert').show();
    api.fetch();
  });
  $('.list-group-item').click(e => {
    console.log();
    vals.corCheck(e.target.innerText);
  });
});

/* 
TODO:
* cap quizzes at 10
    * display gameover component
        * display correct/incorrect score
        * ask to play again
        * display wins/rounds
    * new component should display wins/rounds
* add timeout component
    * display time
    * display timeout component
    * show next question
* ADD TO PORTFOLIO and submit the link also to BCS
*/
