/*

index.html (gameboard) ids:
  jackpot
  speeding
  accidents
  startdate
  today_num
  shame
  n1-n75

data comes in as:
  start date
  current jackpot
  accidents
  speeding
  today's number
  restarted by

*/

async function getGsheetData(sheetId, tabId) {
    // Steps to set this up
    // 1. publish all the sheets you want to get data from in gSheets
    // 2. allow links in the sharing properties
    // 3. retrieve the sheetId from the url
    //      - looks like this: '1qkR5ALHeEe8TKRBiiAiw_mFmhJ4HsNDPvgulL0ccGhM'
    // 4. determine the tabId. This should be an integer starting at 1
    //    in the order the tabs were created

    var nums = [];
    var url = `https://spreadsheets.google.com/feeds/cells/${sheetId}/${tabId}/public/values?alt=json`;
    var dt = [];
    await $.getJSON(url, function (data) {

        var entry = data.feed.entry;

        for (var i = 0; i < entry.length; i++) {
            dt.push(entry[i].content.$t);
        }

    });
    return dt;

}

// Specifics for Safety Bingo
bingoSheet = '1qkR5ALHeEe8TKRBiiAiw_mFmhJ4HsNDPvgulL0ccGhM';

getGsheetData(bingoSheet, 2).then((setup)  => {
    console.log(setup);
    $('#startdate').html(setup[0]);
    $('#jackpot').html(setup[1]);
    $('#accidents').html(setup[2]);
    $('#speeding').html(setup[3]);
    $('#today_num').html(setup[4]);
    $('#shame').html(setup[5]);
});

getGsheetData(bingoSheet,3).then((numbers) => {
    console.log(numbers);
    for(var i = 1; i < 76; i++){
      hold = "#n" + i;
      console.log(hold);
      $(hold).attr('class', 'bb-txt');
    }

    for(var j = 0; j < numbers.length; j++){
      hold = "#n" + numbers[j];
      console.log("part 2: " + hold);
      $(hold).attr('class', 'bb-txt picked');
    }
});
