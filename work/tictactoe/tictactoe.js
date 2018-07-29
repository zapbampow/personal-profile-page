///
// CODE FOR DETERMINING IF THERE IS A WINNER
//
var winningStates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

var winner;
var thisIsAWinningState;

/** Tests whether a boardState is a winning game
 * @wins
 * @param boardstate - an array of a single boardState.
 * @param player - the player who most recently played - firsPlayer or secondPlayer
 */
function isThereAWinner(boardstate, player) {
  console.log("isThereAWinner called");
  thisIsAWinningState = false;
  for (i = 0; i < winningStates.length; i++) {
    if (boardstate[winningStates[i][0]] !== null && boardstate[winningStates[i][0]] === boardstate[winningStates[i][1]] && boardstate[winningStates[i][1]] === boardstate[winningStates[i][2]]) {
      thisIsAWinningState = true;
      winner = player;
    }
  }
}

//
// jQUERY FOR USER CLICKING ON SQUARES TO ADD THEIR PIECES
//
$('#box0').click(function() {
  boardPosition = 0;
  if (liveBoard[boardPosition] === null && currentPlayer.name != "Computer") {
    activatePlacement(boardPosition, currentPlayer);
  }
});

$('#box1').click(function() {
  boardPosition = 1;
  if (liveBoard[boardPosition] === null && currentPlayer.name != "Computer") {
    activatePlacement(boardPosition, currentPlayer);
  }
});

$('#box2').click(function() {
  boardPosition = 2;
  if (liveBoard[boardPosition] === null && currentPlayer.name != "Computer") {
    activatePlacement(boardPosition, currentPlayer);
  }
});

$('#box3').click(function() {
  boardPosition = 3;
  if (liveBoard[boardPosition] === null && currentPlayer.name != "Computer") {
    activatePlacement(boardPosition, currentPlayer);
  }
});

$('#box4').click(function() {
  boardPosition = 4;
  if (liveBoard[boardPosition] === null && currentPlayer.name != "Computer") {
    activatePlacement(boardPosition, currentPlayer);
  }
});

$('#box5').click(function() {
  boardPosition = 5;
  if (liveBoard[boardPosition] === null && currentPlayer.name != "Computer") {
    activatePlacement(boardPosition, currentPlayer);
  }
});

$('#box6').click(function() {
  boardPosition = 6;
  if (liveBoard[boardPosition] === null && currentPlayer.name !== "Computer") {
    activatePlacement(boardPosition, currentPlayer);
  }
});

$('#box7').click(function() {
  boardPosition = 7;
  if (liveBoard[boardPosition] === null && currentPlayer.name !== "Computer") {
    activatePlacement(boardPosition, currentPlayer);
  }
});

$('#box8').click(function() {
  boardPosition = 8;
  if (liveBoard[boardPosition] === null && currentPlayer.name !== "Computer") {
    activatePlacement(boardPosition, currentPlayer);
  }
});


//
//VARIABLES
//

var firstPlayer = {
  "symbol":"x",
  "name":"1st Player",
};

var secondPlayer = {
  "symbol":"o",
  "name":"2nd Player",
};

var currentPlayer = firstPlayer;
var notOpponent;

//Used in turnNum function for Tracking the number of turns
var turnNum = 0;

//The array of the board
var liveBoard = [null, null, null, null, null, null, null, null, null];

//
var boardPosition;

var boxID;
var almostWin;
var difficultyLevel;

//
// TWO PLAYER GAME - this is the easier portion of the code. So I'm sticking it at the top because that feels more organized to me.
//

/** Function to change the player-header as the turns change
* @changePlayerHeader
*/
function changePlayerHeader() {
  if(currentPlayer.name === "You") {
    $('.player-header').html("<h1>You're Turn</h1>");
  }
  else if(currentPlayer === firstPlayer) {
    $('.player-header').html("<h1>" + firstPlayer.name + "'s Turn</h1>");
  }
  else {
    $('.player-header').html("<h1>" + secondPlayer.name + "'s Turn</h1>");
  }
}

// OPENING SCREEN: Click '2 Players' on opening screen. You go straight to the board.
$('.two-players').click(function() {
  currentPlayer = firstPlayer;
  firstPlayer.name = "1st Player";
  secondPlayer.name = "2nd Player";
  $('#number').toggle('.hidden');
  $('.gameboard').toggle('.hidden');
  $('.headers').toggle('.hidden');
  changePlayerHeader();
  // $('.player-header').html("<h1>" + firstPlayer.name + "'s Turn</h1>");
  // $('.player-2-header').html("<h1>" + secondPlayer.name + "'s Turn</h1>");
  // twoPlayerGame();
});

//
//GAME END OPTIONs
//
$('.yes').click(function() {
  resetGame();
  $('.game-end').toggle('.hidden');
  $('.gameboard, .headers').toggle('.hidden');
  changePlayerHeader();
});

$('.no').click(function() {
  resetGame();
  $('.game-end').toggle('.hidden');
  $('#number').toggle('.hidden');
});


//
// ONE PLAYER GAME - This is the harder part.
//

// Click '1 Player'
$('.one-player').click(function() {
  $('#number').toggle('.hidden');
  $('#order').toggle('.hidden');
});

//Clicking first or second player sends user to screen for difficulty level and saves info for playing the game
$('.order').click(function() {
  if($(this).hasClass('first-player')){
    firstPlayer.name = 'You';
    secondPlayer.name = 'Computer';
  }
  else {
    firstPlayer.name = 'Computer';
    secondPlayer.name = 'You';
  }

  $('#order').toggle(".hidden");
  $('#difficulty-div').toggle('.hidden');
  changePlayerHeader();
});

// Difficulty level click events - leads to the easy or difficult game agains the computer
$('.level').click(function() {
	$('#difficulty-div').toggle('.hidden');
  $('.gameboard').toggle('.hidden');
  $('.headers').toggle('.hidden');
	difficultyLevel = $(this).hasClass('easy') ? 'easy' : 'impossible';
	onePlayerGame(difficultyLevel);
});

//
// THE FUNCTIONS
//


/** Function for a one player game.
* @onePlayerGame
*/
function onePlayerGame(diffLevel) {
  console.log(diffLevel + " OnePlayerGame called.");
  if (currentPlayer.name === 'Computer') {
    if (diffLevel === "easy") {
      setTimeout(easyComputerTurn, 500);
	}
	else {
   	  setTimeout(aiTurn, 1000);
	}
  }
}

/** The computer plays in random positions
 * @easyComputerTurn
 */
function easyComputerTurn() {
  console.log("easyComputerTurn called.");
  boardPosition = Math.floor(Math.random() * 9);
  console.log("boardPosition is " + boardPosition);
  if (liveBoard[boardPosition] === null) {
    setTimeout(function() {activatePlacement(boardPosition, currentPlayer);}, 500);
    // singlePlayerTurn();
  }
  else {
    easyComputerTurn();
  }
}

/** Everything that needs to happen when someone places their symbol on the board
* @activatePlacement
* @param boardPosition
* @param player
*/
function activatePlacement(boardPosition, player) {
  console.log("activatePlacement called.");
  boxID = "#box" + boardPosition;
  console.log("aP 1. boxID = " + boxID);
  liveBoard.splice(boardPosition, 1, player.symbol);
  console.log("aP 2. Spliced liveBoard = " + liveBoard);
  $(boxID).html(player.symbol);
  console.log("aP3. jQuery adds playerSymbol to board");
  isThereAWinner(liveBoard, player.name);
  checkForAlmostWin();
  gameEndOrNot();
}

/** After a player has played, this determines whether a game has ended yet. If so, was it a win or draw. If not, what happens next.
* @gameEndOrNot
**/
function gameEndOrNot() {
  console.log('gameEndOrNot called');
  if(thisIsAWinningState === true) {
    gameWon();
  }
  else if (liveBoard.includes(null) === false ) {
    gameDraw();
  }
  else {
    turnNum++;
    changeCurrentPlayer();
    nextTurn();
    // $('.player-1-header, .player-2-header').toggle('.hidden');
  }
}

/** Changes the current player after a turn has been played, but the game is not over.
* @changeCurrentPlayer
**/
function changeCurrentPlayer() {
  console.log("changeCurrentPlayer called");
    if(currentPlayer === firstPlayer) {
      currentPlayer = secondPlayer;
      currentOpponent = firstPlayer;
    }
    else if (currentPlayer === secondPlayer) {
      currentPlayer = firstPlayer;
      currentOpponent = secondPlayer;
    }
}

/** Calls the next turn if the game is not over.
* @nextTurn
*/
function nextTurn() {
  console.log ('nextTurn called');
  if(currentPlayer.name === "Computer" && difficultyLevel === "easy") {
    changePlayerHeader();
    setTimeout(easyComputerTurn, 1500);

  }
  else if(currentPlayer.name === "Computer" && difficultyLevel === "impossible") {
    changePlayerHeader();
    setTimeout(aiTurn, 500);
  }
  else {
    changePlayerHeader();
  }
}

/** Brings up the screen when a game ends
* @gameEndScreen
*/
function gameEndScreen() {
  $('.headers').toggle('.hidden');
  $('.gameboard').toggle('.hidden');
  $('.game-end').toggle('.hidden');
}

/** When a game is won, this function displays the winner and asks if they want to play again. If yes, it resets the game. If no, it resets everything and sends them to the player-number screen.
 * @gameWon
 */
function gameWon() {
  if(currentPlayer.name === "You") {
    $('.win-draw-div').html("<h3 class='winner-or-draw'>" + currentPlayer.name + " win!!!</h3>");
    gameEndScreen();
  }
  else {
  $('.win-draw-div').html("<h3 class='winner-or-draw'>" + currentPlayer.name + " wins!!!</h3>");
  gameEndScreen();
}
}

/** If the game is a draw, it tells you so and offers another game.
 * @gameDraw
 */
function gameDraw() {
  $('.win-draw-div').html("<h3 class='winner-or-draw'>It's a draw!</h3>");
  gameEndScreen();
}

/** Resets all the variables related to a game.
 * @resetGame
 */
function resetGame() {
  console.log("resetGame was called.");
  turnNum = 0;
  liveBoard = [null, null, null, null, null, null, null, null, null];
  currentPlayer = firstPlayer;
  currentOpponent = secondPlayer;
  thisIsAWinningState = undefined;
  boardPosition = undefined;
  emptySquares = [];
  boxID = undefined;
  almostWin = false;
  $('.box').html("");
  onePlayerGame(difficultyLevel);

}


//
//AI TURN FOR HARDER Play
//

/** Lays out the conditions for the AI to decide where to place on the board
* @aiTurn
*/
//These variables are all needed for aiTurn - random, cornerArray, and sideArray
var random = Math.floor(Math.random() * 5);
var cornerArray = [0, 2, 6, 8];
var sideArray = [1, 3, 5, 7];

function aiTurn() {
  console.log('aiTurn Called');
  if (almostWin === true) {
    console.log("almostWin = " + almostWin);
    console.log("currentPlayer.symbol in aiTurn = " + currentPlayer.symbol);
    // If someone is about to win, loop through winningStates and determine a move based on who is about to win.
    for (i = 0; i < winningStates.length; i++) {
      // If the currentPlayer can win, then the AI should play for an immediate win
      console.log(i + " for aiTurn first if-statement");
      if (liveBoard[winningStates[i][0]] === currentPlayer.symbol && liveBoard[winningStates[i][1]] === currentPlayer.symbol && liveBoard[winningStates[i][2]] === null) {
        setTimeout(function() {activatePlacement(winningStates[i][2], currentPlayer);}, 500);
        break;
      } else if (liveBoard[winningStates[i][1]] === currentPlayer.symbol && liveBoard[winningStates[i][2]] === currentPlayer.symbol && liveBoard[winningStates[i][0]] === null) {
        setTimeout(function() {activatePlacement(winningStates[i][0], currentPlayer);}, 500);
        break;
      } else if (liveBoard[winningStates[i][0]] === currentPlayer.symbol && liveBoard[winningStates[i][2]] === currentPlayer.symbol && liveBoard[winningStates[i][1]] === null) {
        setTimeout(function() {activatePlacement(winningStates[i][1], currentPlayer);}, 500);
        break;
      }
      // If the currentOpponent is about to win, then the AI should play to block their next move to win
      else if (liveBoard[winningStates[i][0]] === currentOpponent.symbol && liveBoard[winningStates[i][1]] === currentOpponent.symbol && liveBoard[winningStates[i][2]] === null) {
        setTimeout(function() {activatePlacement(winningStates[i][2], currentPlayer);}, 500);
        break;
      } else if (liveBoard[winningStates[i][1]] === currentOpponent.symbol && liveBoard[winningStates[i][2]] === currentOpponent.symbol && liveBoard[winningStates[i][0]] === null) {
        setTimeout(function() {activatePlacement(winningStates[i][0], currentPlayer);}, 500);
        break;
      } else if (liveBoard[winningStates[i][0]] === currentOpponent.symbol && liveBoard[winningStates[i][2]] === currentOpponent.symbol && liveBoard[winningStates[i][1]] === null) {
        setTimeout(function() {activatePlacement(winningStates[i][1], currentPlayer);}, 500);
        break;
      }
    }
  }

  else {
    // If no one is about to win, there are a few set moves at the beginning in the first few if-else statements. Then it plays randomly later in the game. Though that shouldn't actually happen very often because the first if-statement should kick in in most situations later in the game.

    if (turnNum === 0) {
      // If the AI is firstPlayer it should take a random corner
      setTimeout(function() {activatePlacement(cornerArray[random], currentPlayer);}, 500);
    } else if (turnNum === 1 && liveBoard[4] === null) {
      // If AI is secondPlayer, it should take the middle if it's available
      setTimeout(function() {activatePlacement(4, currentPlayer);}, 500);
    } else if (turnNum === 1 && liveBoard[4] !== null) {
      //If AI is secondPlayer and middle is taken, take a random corner
      setTimeout(function() {activatePlacement(cornerArray[random], currentPlayer);}, 500);
    } else if (turnNum === 2) {
        // If AI is first player and this is its second turn. It should play the opposite corner from it's first play. If that corner is not available it should take a random corner.
        var firstCorner = liveBoard.indexOf('x');
        var oppositeCorner;
        if(firstCorner === 0 && liveBoard[8] === null) {
          oppositeCorner = 8;
        }
        else if (firstCorner === 2 && liveBoard[6] === null) {
          oppositeCorner = 6;
        }
        else if (firstCorner === 6 && liveBoard[2] === null) {
          oppositeCorner = 2;
        }
        else if (firstCorner === 8 && liveBoard[0] === null){
          oppositeCorner = 0;
        }
        else {
          oppositeCorner = cornerArray[random];
        }
        setTimeout(function() {activatePlacement(oppositeCorner, currentPlayer);}, 500);
    }
    else if (turnNum === 3 && liveBoard[0] === currentOpponent.symbol && liveBoard[8] === currentOpponent.symbol) {
      // If on turnNum 3 the opponent has 2 corners, the AI should take a random side square.
      console.log("sideArray[random] is used here for placement");
      setTimeout(function() {activatePlacement(sideArray[random], currentPlayer);}, 500);
    } else if (turnNum === 3 && liveBoard[2] === currentOpponent.symbol && liveBoard[6] === currentOpponent.symbol) {
      // If on turnNum 3 the opponent has 2 corners, the AI should take a random side square.
      setTimeout(function() {activatePlacement(sideArray[random], currentPlayer);}, 500);
    }
    else {
      // If none of the above are currently true, then the AI loops through the empty squares and places on a random square.
      console.log("final else called");
      var emptySquares = [];
      for (i = 0; i < liveBoard.length; i++) {
        if (liveBoard[i] === null) {
          emptySquares.push(i);
        }
      }
      console.log("emptySquares = " + emptySquares);
      if (emptySquares.length === 1) {
        console.log("emptySquares.length = 1");
        setTimeout(function() {activatePlacement(emptySquares[0], currentPlayer);}, 500);
      } else {
        randomPlacement(emptySquares);
      }
    }
  }
}

/** Returns true is someone is about to win. Returns false if not.
 * @checkForAlmostWin
 */
function checkForAlmostWin() {
  almostWin = false;

  for (i = 0; i < winningStates.length; i++) {
    if (liveBoard[winningStates[i][0]] !== null && liveBoard[winningStates[i][1]] !== null && liveBoard[winningStates[i][0]] === liveBoard[winningStates[i][1]] && liveBoard[winningStates[i][2]] === null) {
      almostWin = true;
      break;
    } else if (liveBoard[winningStates[i][1]] !== null &&  liveBoard[winningStates[i][2]] !== null && liveBoard[winningStates[i][1]] === liveBoard[winningStates[i][2]] && liveBoard[winningStates[i][0]] === null) {
      almostWin = true;
      break;
    } else if (liveBoard[winningStates[i][0]] !== null &&   liveBoard[winningStates[i][2]] !== null && liveBoard[winningStates[i][0]] === liveBoard[winningStates[i][2]] && liveBoard[winningStates[i][1]] === null) {
      almostWin = true;
      break;
    }
  }
  console.log('almostWin from func = ' + almostWin);
}


/** Makes a random placement based on the empty spaces available defined in the emptySquares array
* @randomPlacement
* @param emptySquares - the array that holds the current empty spaces on the board. It's created in final else of the aiTurn()
*/
function randomPlacement (emptySquares) {
  boardPosition = emptySquares[Math.floor(Math.random() * (emptySquares.length+1))];
  console.log('boardPosition = ' + boardPosition + ' AND currentPlayer = ' + currentPlayer.name);
  if (liveBoard[boardPosition] === null) {
    activatePlacement(boardPosition, currentPlayer);
  }
  else {
    randomPlacement(emptySquares);
  }
}
