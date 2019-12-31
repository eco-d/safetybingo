/*
input.html (game_setup) ids:
  Name_of_restarter
  Num_of_accidents
  Num_of_speeding
  starting_pot
  pot_increase
  pot_max
  reset_button

index.html (gameboard) ids:
  jackpot
  speeding
  accidents
  startdate
  today_num
  shame
  n1-n75

*/

//global variables
var in_ids = ["Name_of_restarter","Num_of_accidents","Num_of_speeding","starting_pot","pot_increase","pot_max"];
var dis_ids = ["shame","accidents","speeding","jackpot"];
var holders = [];
var called_nums = [];


//functions
function startDate(){
  var d = new Date();
  var hold = d.getMonth() + "/" + d.getDate() + "/" + d.getYear();
  $("#startdate").html(hold);
}

function pullOver(ins, h){
  for(var i = 0; i < ins.length; i++){
    var hold = "#" + ins[i];
    h.push($(hold).val());
  }
  return(h);
}

function pushInto(d, h){
  $("#"+d[0]).html(h[0]);
  $("#"+d[1]).html(h[1] + " Days");
  $("#"+d[2]).html(h[2] + " Days");
  $("#"+d[3]).html("$" + h[3]);
}

function clearCalled(n){
  var hold = "";
  for(var i = 1; i< n.length; i++){
    hold = "#n" + i;
    $(hold).attr('class', 'bb-txt');
  }
}

function newNum(n){

  var bad = true;
  var nu = 0;

  while(bad){

    bad = false;
    nu = Math.round((Math.random()*75)+1);

    for(var i = 0; i < n.length; i++){
      if(nums[i] == nu){
        bad = true;
      }
    }
  }
  n.push(nu);
  $("#today_num").html(nu);
  hold = "#n" + nu;
  $(hold).attr('class', 'bb-txt picked');

}


function update(h){
  var addr = h[4];
  var max = h[5];
  var holdS = parseInt($("#speeding").html());
  var holdA = parseInt($("#accidents").html());
  var holdM = parseInt($("#jackpot").html().slice(1));

  holdS = holdS + 1;
  holdA = holdA + 1;
  if((addr+holdM) <= max){
    holdM = holdM + addr;
  }

  $("#speeding").html(holdS);
  $("#accidents").html(holdA);
  $("#jackpot").html(holdM);


}


function play(holder, n) {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var d = today.getDay();

  if(d != 0 && d!= 6){
    if(h == 6){
      if(m == 50 || m == 51 || m == 52){
        newNum(n);
        update(holder);
      }
    }
  }
  t = setTimeout(function() {
    play(holder, n);
  }, 180000);
}


//function calls
$("#resetter").on('click', function() {
  pullOver(in_ids, holders);
  pushInto(dis_ids, holders);
  clearCalled(called_nums);
  newNum(called_nums);
  startDate();
  play(holder, called_nums);
  $("#game_setup").hide();
  $("#gameboard").show();
});

$("#back2menu").on('click', function() {
  $("#game_setup").show();
  $("#gameboard").hide();
});
