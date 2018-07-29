//VARIABLES
var min = 25;
var sessMin = 25;
var breakMin = 5;
var sec = '00';
var originalSec = '00';
var countClicks = 0;
var countDown;
var audio = $("#mySoundClip")[0];

//Setting the lengths of the animations for Session Clock and Break Clock
var eclipseSessionLength;
var eclipseBreakLength;

//
//The Plus Minus Buttons
//
//Pressing the buttons does stuff

//Session plus and minus buttons
$('#session-minus').click(function() {
  if(sessMin > 1 && countClicks%2 == 0){
    sessMin--;
    min = sessMin;
    sec = originalSec;
    $('#session-length, #min').html(min);
    $('#sec').html(sec);
  }
});

$('#session-plus').click(function() {
  if(countClicks%2 == 0) {
    sessMin++;
    min = sessMin;
    sec=originalSec;
    $('#session-length, #min').html(min);
    $('#sec').html(sec);
  }
});

//Break plus and minus buttons
$('#break-minus').click(function() {
  if(breakMin > 1 && countClicks%2 == 0){
    breakMin--;
    $('#break-length').html(breakMin);
  }
});

$('#break-plus').click(function() {
  if (countClicks%2 == 0) {
    breakMin++;
    $('#break-length').html(breakMin);
  }
});

//
//THE CLOCK
//

$('#the-clock').click(function() {

  //Start or pause the timer based on number of clicks
  countClicks++;
  // console.log("countClicks = " + countClicks);

  if (countClicks%2 === 1) {
    eclipseSessionLength = (sessMin * 60) + "s";
    //Sets the the session animation-duration for the session clock on the first click
    $('.inner-circle').css('animation-duration', eclipseSessionLength);

    //Runs the countdown
    eachSecond();
  }

  else {
    pauseTimer();
  }
});

//Function for pausing the timer
function pauseTimer() {
  clearInterval(countDown);
}

//Function to start and run the timer
function eachSecond () {
  countDown = setInterval(updateTimer, 1000);
}

//Function to actually update the timer
function updateTimer() {
  if($('#session-or-break').html() === 'Session') {
    sessionClock();
  }
  else if ($('#session-or-break').html() === 'Break') {
    breakClock();
  }
}

//Function for the Clock for the session length
function sessionClock() {
  if(min == 0 && sec == 0) {
    audio.play();
    min = breakMin;
    $('#session-or-break').html('Break');
    $('#min').html(min);
    $('#sec').html("0" + sec);
    eclipseBreakLength = (breakMin * 60) + "s";
    $('.inner-circle').css({'animation-name':'eclipse-break', 'animation-duration':eclipseBreakLength});

  }

  else if (min > 0 && sec == 0){
    min -= 1;
    sec = 59;
    $('#min').html(min);
    $('#sec').html(sec);
  }

  else if (sec > 10) {
    sec -= 1;
    $('#sec').html(sec);
  }

  else if (sec <= 10) {
    sec -= 1;
    $('#sec').html("0" + sec);
  }
}

//Function for the Clock for break length
function breakClock() {
  if(min == 0 && sec == 0) {
    audio.play();
    min = sessMin;
    $('#session-or-break').html('Session');
    $('#min').html(min);
    $('#sec').html("0" + sec);
    $('.inner-circle').css({'animation-name':'eclipse-session', 'animation-duration':eclipseSessionLength});
  }

  else if (min > 0 && sec == 0){
    min -= 1;
    sec = 59;
    $('#min').html(min);
    $('#sec').html(sec);
  }

  else if (sec > 10) {
    sec -= 1;
    $('#sec').html(sec);
  }

  else if (sec <= 10) {
    sec -= 1;
    $('#sec').html("0" + sec);
  }
}


//
//THE ECLIPSE ANIMATION
//

//Pause and Play Animation. It's ALIVE!!!!
$('#the-clock').click(function () {
  $('.inner-circle').toggleClass('inner-circle-play');
});























//
