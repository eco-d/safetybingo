// id targets:

// n1 - n75
// jackpot
// speeding
// accidents
// startdate
// today
// shame

// class to signify: picked

// data order:
// 0: date the game started on
// 1: jackpot number
// 2: days since speeding
// 3: days since accidents
// 4: name of person whomst made the game restart
// 5: boolean if the game needs to restart


//GET THE NEW NUMBER OF THE DAY
function bingoNums(currentNums){

  var checkNum = true;
  var newNum = 0;

  // Check if the game has been started before
  if(currentNums.length < 1){
    newNum = Math.round((Math.random() * 75) + 1);
  }
  else{

    // generate new number, check it against previously picked numbers, only allow unique numbers
    while(checkNum){
      checkNum = false;
      newNum = Math.round((Math.random() * 75) + 1);
      for(var i = 0; i<currentNums.length;i++){
        if(newNum == currentNums[i]){
          checkNum = true;
        }
      }
    }
  }

  // Set the classes of the newly picked number
  $("#n"+newNum).attr('class', 'bb-txt picked');

}


// GET ALL PICKED NUMBERS FOR THE CURRENT GAME
function getPicked(r){
  n = [];

  // for all possible numbers
  for (var i=1;i<76;i++){

    // clear the board if the game should be reset
    if(r){
      $("#n"+ i).attr('class', 'bb-txt');
    }

    // add the previously picked numbers to an array
    else{
      if($("#n"+ i).attr('class').split(' ').length > 1){
        n.push(i);
      }
    }
  }

  // return list of numbers previously picked for current game.
  return(n);
}


// GET DAY AND TIME
function timeCheck(reset) {
  var today = new Date();
  var d = today.getDay();
  var h = today.getHours();
  var m = today.getMinutes();

  // Check if the time frame is right (3min window Mon-Fri)
  if(d > 0 && d < 6){
    if(h == 7){
      if(m < 3){
        bingoNums(getPicked(reset));
      }
    }
  }
}


function stacks(){
  var nums = [];
  var sheets_data = [];
  var url = 'https://spreadsheets.google.com/feeds/cells/1Umo6p6gCajpWGD-uUVnD7IU3EBet-fgXufmhME4mslc/24/public/values?alt=json';
  sheets_data = $.getJSON(url, function(data){
      var dt = [];
      var entry = data.feed.entry;
      for (var i = 0; i < entry.length; i++){
          dt.push(entry[i].content.$t);
      }
      return dt;
  });

  // Give off all the data
  for (var i = 0; i<sheets_data.length; i++){
    if(i == 0){
      $("#startdate").html(sheets_data[i]);
    }
    else if(i == 1){
      $("#jackpot").html(sheets_data[i]);
    }
    else if(i == 2){
      $("#speeding").html(sheets_data[i]);
    }
    else if(i == 3){
      $("#accidents").html(sheets_data[i]);
    }
    else if(i == 4){
      $("#shame").html(sheets_data[i]);
    }
    else if(i == 5){
      timeCheck(sheets_data[i]);
    }
    else{
      console.log("ERROR: data improperly imported from Google Sheets");
    }
  }

  t = setTimeout(function() {
    stacks();
  }, 180000);
}



stacks();
