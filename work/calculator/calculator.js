// Jquery for animating button pushes
$("#zero, #one, #two, #three, #four, #five, #six, #seven, #eight, #nine, #point")
  .mousedown(function() {
    $(this).removeClass("shadow").addClass("shadow-pushed").addClass("font-pushed");
  })
  .mouseup(function() {
    $(this).addClass("shadow").removeClass("shadow-pushed").removeClass("font-pushed");
  });

$("#divide, #multiply, #plus, #minus")
  .mousedown(function() {
    $(this).removeClass("shadow").addClass("shadow-pushed");
  })
  .mouseup(function() {
    $(this).addClass("shadow").removeClass("shadow-pushed");
  });

$("#equals")
  .mousedown(function() {
    $(this).removeClass("shadow").addClass("equals-pushed");
  })
  .mouseup(function() {
    $(this).addClass("shadow").removeClass("equals-pushed");
  });

$("#clear")
  .mousedown(function() {
    $(this).removeClass("shadow").addClass("shadow-pushed");
  })
  .mouseup(function() {
    $(this).addClass("shadow").removeClass("shadow-pushed");
  });


// Javascript for the doing of math and displaying the math
var tempArr = [];
var defaultMathArr = [null, null, null];
var mathArr = [null, null, null];
var numToPush;
var fullNum;
var operator;
var operatorTimesPushed = 0;
var pointTimesPushed = 0;
var display;

//
$("#zero, #one, #two, #three, #four, #five, #six, #seven, #eight, #nine").click(function() {
  if(mathArr[1] === null) {
    //Grab the number from the ID's div's html and add it to tempArr
    numToPush = $(this).html();
    tempArr.push(numToPush);
    //Create string from built array
    fullNum = parseFloat(tempArr.join(''));
    //Replace first index of mathArr with fullNum
    mathArr.splice(0, 1, fullNum);
    console.log(mathArr);
    //Display current fullNum to user
    $("#calc-display").html(fullNum);
  }

  else{
    //Grab the number from the ID's div's html and add it to tempArr
    numToPush = $(this).html();
    tempArr.push(numToPush);
    console.log(tempArr);
    //Create string from built array
    fullNum = parseFloat(tempArr.join(''));
    //Replace first index of mathArr with fullNum
    mathArr.splice(2, 1, fullNum);
    console.log(mathArr);
    //Display current fullNum to user
    // display = function() {
    //   if (fullNum%1 === 0) {
    //     display = fullNum;
    //   }
    //   else{
    //     display = fullNum.toFixed()
    //   }
    // };
    $("#calc-display").html(fullNum);
    //Finally, return operatorTimesPushed to 0
    operatorTimesPushed = 0;
    console.log("operatorTimesPushed = " + operatorTimesPushed);
  }
});

//TODO: Add special functionality here for pressing the point button
//When pressing '.' the point button, it must only register once
$("#point").click(function(){
  if (pointTimesPushed === 0){
    //Grab the number from the ID's div's html and add it to tempArr
    numToPush = $(this).html();
    tempArr.push(numToPush);
    //Create string from built array
    fullNum = tempArr.join('');
    //Replace first index of mathArr with fullNum
    mathArr.splice(2, 1, fullNum);
    console.log(mathArr);
    //Display current fullNum to user
    $("#calc-display").html(fullNum);
  }

  pointTimesPushed += 1;
});

//Variables to call based on the operators in the array
var plus = function(a,b) {return a + b;};
var minus = function(a,b) {return a - b;};
var divide = function(a,b) {return a / b;};
var multiply = function(a,b) {return a * b;};

//What to do when pushing operators.
$("#divide, #multiply, #plus, #minus").click(function(){
  operatorTimesPushed += 1;
  console.log(operatorTimesPushed);

  if(mathArr[1] === null) {
    //Grab the operator from the ID's div's html, replace it in mathArr
    operator = $(this).attr('id');
    mathArr.splice(1, 1, operator);
    console.log(mathArr);
    //Display the operator to the user
    $("#calc-display").html($(this).html());
    //Finally, clear tempArr
    tempArr = [];
    pointTimesPushed = 0;

  }

  else if (mathArr[1] !== null && operatorTimesPushed === 1) {
    //First do the math and push to the accumulator at mathArr[0]
    switch (mathArr[1]) {
      case 'plus':
        mathArr[0] = plus(mathArr[0], mathArr[2]);
        break;
      case 'minus':
        mathArr[0] = minus(mathArr[0], mathArr[2]);
        break;
      case 'divide':
        mathArr[0] = divide(mathArr[0], mathArr[2]);
        break;
      case 'multiply':
        mathArr[0] = multiply(mathArr[0], mathArr[2]);
        break;
    }

    //Then splice in the new operator at mathArr[1]
    //Grab the operator from the ID's div's html, replace it in mathArr
    operator = $(this).attr('id');
    mathArr.splice(1, 1, operator);
    console.log(mathArr);
    //Display the operator to the user
    $("#calc-display").html($(this).html());

    //Finally, set mathArr[2] back to null
    mathArr[2] = null;

    //Finally #2, clear tempArr
    tempArr = [];
    pointTimesPushed = 0;
  }

});

//What to do when pressing the equals button
$("#equals").click(function(){
  //First do the math and push to the accumulator at mathArr[0]
  switch (mathArr[1]) {
    case 'plus':
      mathArr[0] = plus(mathArr[0], mathArr[2]);
      break;
    case 'minus':
      mathArr[0] = minus(mathArr[0], mathArr[2]);
      break;
    case 'divide':
      mathArr[0] = divide(mathArr[0], mathArr[2]);
      break;
    case 'multiply':
      mathArr[0] = multiply(mathArr[0], mathArr[2]);
      break;
  }

  mathArr[1] = null;
  mathArr[2] = null;
  operatorTimesPushed = 0;
  console.log(mathArr);
  //Display current fullNum to user
  var display = mathArr[0].toFixed(2);
  $("#calc-display").html(mathArr[0]);
});

//Clear everything when you click "Clear"
$("#clear").click(function() {
  mathArr = [null, null, null];
  tempArr = [];
  operatorTimesPushed = 0;
  pointTimesPushed = 0;
  $("#calc-display").html('');
  console.log("mathArr cleared. mathArr = " + mathArr);
  console.log("operatorTimesPushed cleared. operatorTimesPushed = " + operatorTimesPushed);
  console.log("pointTimesPushed cleared. pointTimesPushed = " + pointTimesPushed);
});
















//
