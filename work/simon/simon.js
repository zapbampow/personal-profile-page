//
// VARIABLES
// The stuff that needs to be tracked during the game
//
var boardButtons = [
  {color:'green', defaultClass:'green-btn', pressedClass:'light-green', sound:'greenSound'},
  {color:'red', defaultClass:'red-btn', pressedClass:'light-red', sound:'redSound'},
  {color:'yellow', defaultClass:'yellow-btn', pressedClass:'light-yellow', sound:'yellowSound'},
  {color:'blue', defaultClass:'blue-btn', pressedClass:'light-blue', sound:'blueSound'}
];
var theSequence = [];
var playerMoves = [];
var userTurn = false;
var strictMode = false;
var gameOn = false;

//
// BUTTON PRESSING AND STYLING
// The stuff that happens when buttons get pushed, like turning the game on and off.
//

// Start Button - changes styling on press and release. Also starts the game if the game is on.
$('.start-btn')
  .mousedown(function () {
    $(this).removeClass('btn-shadow');
    $('.count-box h2').html('--');
  })
  .mouseup(function() {
    // If the game is off, it just changes the button styling
    if($('.on-off-switch').hasClass('off')) {
      $(this).addClass('btn-shadow');
    }
    // If the game is on, the button moves back up and the count-box blinks before the game starts.
    else{
      $(this).addClass('btn-shadow');
      countBoxBlinking();

      setTimeout(function() {startGame();}, 1200);
    }
  });

// Strict Button - adjusts styling on presses and turns strict mode on and off
$('.strict-btn')
  .mousedown(function () {
    $(this).removeClass('btn-shadow');
  })
  .mouseup(function() {
    // If the game is off, it just changes the button styling
    if($('.on-off-switch').hasClass('off')) {
      $(this).addClass('btn-shadow');
    }
    else if(strictMode === false) {
      $(this).addClass('btn-shadow strict-btn-on');
      strictMode = true;
    }
    // If the game is on, the button moves back up and the count-box blinks before the game starts.
    else {
      $(this).addClass('btn-shadow').removeClass('strict-btn-on');
      strictMode = false;
    }
  });

// On/Off Switch Styling
$('.on-off-switch').click (function() {
  if($(this).hasClass('off')) {
    $(this).removeClass('off').addClass('on');
    $('.count-box').removeClass('count-off').addClass('count-on');
    gameOn = true;
  }
  else {
    gameOn = false;
    $(this).removeClass('on').addClass('off');
    $('.count-box').removeClass('count-on').addClass('count-off');
    $('.count-box h2').html('--');
    $('.green-btn').removeClass('light-green');
    $('.red-btn').removeClass('light-red');
    $('.yellow-btn').removeClass('light-yellow');
    $('.blue-btn').removeClass('light-blue');
  }
});


//
//THE SOUNDS
//
var greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

//
// FUNCTIONS
// The meat of the game.
//

/** Simply makes the text in the count-box blink 2 times.
* @countBoxBlinking
*/
function countBoxBlinking() {
  setTimeout(function(){
    $('.count-box').removeClass('count-on').addClass('count-off');
  }, 200);
  setTimeout(function(){
    $('.count-box').removeClass('count-off').addClass('count-on');
  }, 400);
  setTimeout(function(){
    $('.count-box').removeClass('count-on').addClass('count-off');
  }, 600);
  setTimeout(function(){
    $('.count-box').removeClass('count-off').addClass('count-on');
  }, 800);
}

/** Chooses a random number between 0 and 3 to be used in randomly selecting which buttons the computer will add to the theSequence.
* @addToSequence
*/
function addToSequence() {
  theSequence.push(Math.floor(Math.random() * 4));
}

/** Loops through the sequence of colors and creates a string of code that when run, will turn the color buttons on and off in sequence.
* @buildSequenceRunthroughCode
* @param arr - specifically theSequence where the sequence is stored
*/
var sequenceRunthroughCode;
var runSequence;

function buildSequenceRunthroughCode(arr) {
  var codeArr = [];
  var code = '';
  for(i=0; i<arr.length; i++) {
    codeArr.push(code.concat("setTimeout(function() {if(gameOn === true) {$('." + boardButtons[arr[i]].defaultClass + "').addClass('" + boardButtons[arr[i]].pressedClass + "'); " + boardButtons[arr[i]].sound + ".play();}}, " + (i*1000+200) + ");"+ "setTimeout(function() {if(gameOn === true) {$('." + boardButtons[arr[i]].defaultClass + "').removeClass('" + boardButtons[arr[i]].pressedClass + "');}}, " + (i+1)*1000 + ");"
  ));
  }
  sequenceRunthroughCode = codeArr.join("");
  sequenceRunthroughCodePlusUserTurnTrue = sequenceRunthroughCode.concat("setTimeout(function() {if(gameOn === true) {userTurn = true;}}, " + (theSequence.length*1000+1) + "); $('.color-game-btn').css( 'cursor', 'pointer' );");
  runSequence = new Function(sequenceRunthroughCodePlusUserTurnTrue);
}

/**
*
*/
function updateCountBox(arr) {
  $('.count-box h2').html(arr.length);
}

/** Runs through the initial steps for starting a game.
* @startGame
*/
function startGame() {
  theSequence = [];
  lengthenSequence();
}

/** It clears the playerMoves variable for the next round of user input
* @clearPlayerMoves
*/
function clearPlayerMoves() {
  playerMoves = [];
}

/** Adds a step to the sequence and plays through it for the user
* @lengthenSequence
*/
function lengthenSequence() {
  addToSequence();
  buildSequenceRunthroughCode(theSequence);
  clearPlayerMoves();
  updateCountBox(theSequence);
  runSequence();
}

//Event listener for user pressing colored buttons
// Includes
$('.color-game-btn').click(function() {
    // Check if it's actually the user's turn to go
    if(userTurn === true) {
      userTurn = false;
      // Check for green button
      if($(this).hasClass('green-btn')) {
        // Add move to the playerMoves array
        playerMoves.push(0);
        $('.green-btn').addClass('light-green');

        // If the move matches the sequence, play correct sound, return button to original color, then correctUserInput
        if(checkUserInputAgainstSequence(theSequence, playerMoves) === true){
          greenSound.play();
          setTimeout(function(){$('.green-btn').removeClass('light-green');}, 500);
          setTimeout(correctUserInput, 700);
        }
        // If doesn't match, wrong sound, original color, and wrongUserInput
        else {
          if(strictMode === true){
            strictReset();
          }
          else {
            wrongMoveSound();
            setTimeout(function(){$('.green-btn').removeClass('light-green');}, 500);
            setTimeout(wrongUserInput, 700);
          }
        }
      }
      // Check for Red Button
      else if($(this).hasClass('red-btn')) {
        // Add move to the playerMoves array
        playerMoves.push(1);
        $('.red-btn').addClass('light-red');

        // If the move matches the sequence, play correct sound, return button to original color, then correctUserInput
        if(checkUserInputAgainstSequence(theSequence, playerMoves) === true){
          redSound.play();
          setTimeout(function(){$('.red-btn').removeClass('light-red');}, 500);
          setTimeout(correctUserInput, 700);
        }
        // If doesn't match, wrong sound, original color, and wrongUserInput
        else {
          if(strictMode === true){
            strictReset();
          }
          else {
          wrongMoveSound();
          setTimeout(function(){$('.red-btn').removeClass('light-red');}, 500);
          setTimeout(wrongUserInput, 700);
        }
        }
      }
      // Check for yellow Button
      else if($(this).hasClass('yellow-btn')) {
        // Add move to the playerMoves array
        playerMoves.push(2);
        $('.yellow-btn').addClass('light-yellow');

        // If the move matches the sequence, play correct sound, return button to original color, then correctUserInput
        if(checkUserInputAgainstSequence(theSequence, playerMoves) === true){
          yellowSound.play();
          setTimeout(function(){$('.yellow-btn').removeClass('light-yellow');}, 500);
          setTimeout(correctUserInput, 700);
        }
        // If doesn't match, wrong sound, original color, and wrongUserInput
        else {
          if(strictMode === true){
            strictReset();
          }
          else {
          wrongMoveSound();
          setTimeout(function(){$('.yellow-btn').removeClass('light-yellow');}, 500);
          setTimeout(wrongUserInput, 700);
        }
        }
      }
      // Check for Red Button
      else if($(this).hasClass('blue-btn')) {
        // Add move to the playerMoves array
        playerMoves.push(3);
        $('.blue-btn').addClass('light-blue');

        // If the move matches the sequence, play correct sound, return button to original color, then correctUserInput
        if(checkUserInputAgainstSequence(theSequence, playerMoves) === true){
          blueSound.play();
          setTimeout(function(){$('.blue-btn').removeClass('light-blue');}, 500);
          setTimeout(correctUserInput, 700);
        }
        // If doesn't match, wrong sound, original color, and wrongUserInput
        else {
          if(strictMode === true){
            strictReset();
          }
          else {
          wrongMoveSound();
          setTimeout(function(){$('.blue-btn').removeClass('light-blue');}, 500);
          setTimeout(wrongUserInput, 700);
        }
        }
      }
    }
  });


/** Checks if this is the final index in the sequence. If so, it adds another and plays for the user.
* @correctUserInput
*/
function correctUserInput() {
  if(playerMoves.length === 20 && theSequence.length === 20) {
    celebration();
  }
  else if(playerMoves.length === theSequence.length) {
    $('.color-game-btn').css( 'cursor', 'default' );
    lengthenSequence();
  }
  else {
    userTurn = true;
  }
}

/** Plays through the sequence and resets the playerMoves array so the player can try again.
* @wrongUserInput
*/
function wrongUserInput() {
  clearPlayerMoves();
  setTimeout(function() {runSequence();}, 800);
}

/** Plays all 4 button sounds at once.
* @wrongMoveSound
*/
function wrongMoveSound() {
  greenSound.play();
  redSound.play();
  blueSound.play();
  yellowSound.play();
}

/** Resets appropriate factors to reset game. Used when someone is using strict mode and clicks a wrong sequence.
* @strictReset
*/
function strictReset() {
  wrongMoveSound();
  $('.count-box h2').html('--');
  $('.green-btn').removeClass('light-green');
  $('.red-btn').removeClass('light-red');
  $('.yellow-btn').removeClass('light-yellow');
  $('.blue-btn').removeClass('light-blue');
  theSequence = [];
  playerMoves = [];
  userTurn = false;
  setTimeout(function() {lengthenSequence();}, 1400);
}

/** Returns true or false. Checks each color button the user presses against theSequence.
* @checkUserInputAgainstSequence
* @param theSequence - the first array is the sequence, which the player moves must exactly match to return true
* @param playerMoves - the second array is the user's input
*/
function checkUserInputAgainstSequence(theSequence, playerMoves) {
  var inputIndex = playerMoves.length - 1;
  if(playerMoves[inputIndex] !== theSequence[inputIndex]) {
    return false;
  }
  else {
    return true;
  }
}

/** Animation for winning the game
* @celebration
*/
function celebration() {
  $('.color-game-btn').css( 'cursor', 'default' );
  greenSound.play();
  $('.green-btn').addClass('light-green');
  $('.count-box h2').html('WIN');
  setTimeout(function(){
    $('.green-btn').removeClass('light-green');
    $('.red-btn').addClass('light-red');
    redSound.play();
  }, 250);
  setTimeout(function(){
    $('.red-btn').removeClass('light-red');
    $('.blue-btn').addClass('light-blue');
    blueSound.play();
  }, 500);
  setTimeout(function(){
    $('.blue-btn').removeClass('light-blue');
    $('.yellow-btn').addClass('light-yellow');
    yellowSound.play();
  }, 750);
  setTimeout(function(){
    $('.yellow-btn').removeClass('light-yellow');
    $('.green-btn').addClass('light-green');
    greenSound.play();
  }, 1000);
  setTimeout(function(){
    $('.green-btn').removeClass('light-green');
    $('.red-btn').addClass('light-red');
    redSound.play();
  }, 1250);
  setTimeout(function(){
    $('.red-btn').removeClass('light-red');
    $('.blue-btn').addClass('light-blue');
    blueSound.play();
  }, 1500);
  setTimeout(function(){
    $('.blue-btn').removeClass('light-blue');
    $('.yellow-btn').addClass('light-yellow');
    yellowSound.play();
  }, 1750);
  setTimeout(function(){
    $('.yellow-btn').removeClass('light-yellow');
  }, 2000);

}

// TODO: When hitting off, stop everything, apparently by throwing some big error.
// TODO: When hitting start, do the same as hitting off before doing anything else. This way you can start over immediately.
// TODO: Add StrictMode
//
