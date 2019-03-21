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
    countdown: 30, //time left to answer
    intId: undefined, //can't leave obj props blank, so undefined will do
    clockRunning: false,

    // preparing for future
    reset: () => {
        clearInterval(timer_ui.intId);
        timer_ui.clockRunning = false;
        timer_ui.countdown = 30;
        $('#time-alert').toggleClass('alert-info alert-danger');
        $('#time-alert').html(`<h3>Time remaining: ${timer_ui.countdown}</h3>`);
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
        if (timer_ui.countdown === 0) {
            timer_ui.stop();
            $('#time-alert').toggleClass('alert-info alert-danger');
        }
    }
};

//this deals with API
const api = {
    fetch: () => {
        let url = `https://opentdb.com/api.php?amount=10&category=9&type=multiple`;
        $.ajax({
            type: 'GET',
            url: url
        })
            .then(res => {
                if (res.response_code === 0) {
                    api.createQuiz(res.results);
                    console.log(
                        `Succesfully fetched! Passed to createQuiz(). Response Code: ${
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
        return `Requested, Waiting...`;
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

            // console.log(quest);
        }
        return quest;
    },
    displayDOM: () => {
        clg;
    }
};

//main
$(function() {
    $('#start-btn').click(() => {
        timer_ui.start();
        $('#start-btn').hide();
        $('#quiz_ui').show();
        $('hr').show();
        $('#time-alert').show();
    });
});
