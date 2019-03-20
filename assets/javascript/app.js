//object name
const timer_ui = {
  countdown: 10, //time left to answer
  intId: undefined, //can't leave obj props blank, so undefined will do
  clockRunning: false,

  // preparing for future
  reset: () => {
    $('#time-alert').html(`<h3>Time remaining: ${timer_ui.countdown}</h3>`);
  },
  //this will initiate the counter
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
  //this is the counter. put the check to see if time hits 0 here
  counter: () => {
    timer_ui.countdown--;
    $('#time-alert').html(`<h3>Time remaining: ${timer_ui.countdown}</h3>`);
    if (timer_ui.countdown === 0) {
      timer_ui.stop();
    }
  }
};

$(function() {
  $('#start-btn').click(() => {
    timer_ui.start();
    $('#start-btn').hide();
    $('#quiz_ui').show();
    $('hr').show();
    $('#time-alert').show();
  });
});
