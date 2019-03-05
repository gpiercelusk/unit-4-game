$(document).ready(function () {
  // declares the global variable of characters, their individual attributes and sets the booleans of chosen character and chosen enemy to false 
  var charSelect = [
    {
      name: 'Dash Rendar',
      health: 120,
      attack: 8,
      counter: 10,
      img: 'assets/images/dash-rendar.jpg'
    },
    {
      name: 'IG-88',
      health: 90,
      attack: 7,
      counter: 20,
      img: 'assets/images/ig-88.jpg'
    },
    {
      name: 'Royal Guard',
      health: 150,
      attack: 7,
      counter: 12,
      img: 'assets/images/Imperial-royal-guard.jpg'
    },
    {
      name: 'Xizor',
      health: 120,
      attack: 8,
      counter: 15,
      img: 'assets/images/xizor.jpg'
    }
  ];

  var playerChosen = false;
  var enemyChosen = false;

  // initGame function creates the character buttons attcaches their attributes to each button and then appends them to the character select area 

  function initGame() {
    $('.gameArea').hide();
    for (var i = 0; i < charSelect.length; i++) {
      var charBtn = $('<button>');
      charBtn.addClass('charCard');
      charBtn.attr('name', charSelect[i].name);
      charBtn.attr('health', charSelect[i].health);
      charBtn.attr('attack', charSelect[i].attack);
      charBtn.attr('counter', charSelect[i].counter);
      charBtn.append("<p>" + charSelect[i].name + "</p><img src='" + charSelect[i].img + "'class='charImg'><br><p class='life'>Life: " + charSelect[i].health + "</p>");
      $('#charSelect').append(charBtn);
    }
    // in the same function append a new "p" tag with text 
    var startText = $('<p>');
    startText.append('Choose your character. Do. Or do not. There is no try.');
    $('#info').append(startText);
  };
  //function for selecting character one is chosen on click and stays in '.charArea' until loss 
  //then the rest move to '.enemyArea' 
  //(this is selecting the charSelect global obj)

  $(document).on('click', '.charCard', function () {
    if (!playerChosen) {
      //clears previous info
      $('#info').empty();
      //brings back the game area
      $('.gameArea').show();
      var user = $(this);
      //add a class user variable
      user.addClass('user');
      //appends to yourChar in html
      $('#yourChar').append(user);
      playerChosen = true;
      //appends rest of characters to the enemy area and adds a class to them 
      $('#enemyArea').append($('#charSelect').children().addClass('enemyChoice'));
      //changes info text
      var chooseEnemy = $('<p>');
      chooseEnemy.append('Choose opponent: I’ve got a bad feeling about this.');
      $('#info').append(chooseEnemy);
    }
  });
  //click on '#enemyArea' to select a character to then move to '#defendArea' the other 2 images stay in '#enemyArea'
  $(document).on('click', '.enemyChoice', function () {
    if (!enemyChosen) {
      //clears text
      $('#info').empty();
      var opponent = $(this);
      //adds enmyCard class and rmoves enemyChoice class
      opponent.addClass('enmyCard').removeClass('enemyChoice');
      // appends 'opponent' to the defender area
      $('#defArea').append(opponent);
      enemyChosen = true;
      //adds new 'p' tag to the info section
      var atk = $('<p>');
      atk.append('Use the attack button to fight.');
      $('#info').append(atk);
    }
  });
  ///Battle Mechanic
  // click the '.attkBtn' to trigger fight event btwn your character and and chosen enemy                     
  $(document).on('click', '#attkBtn', function () {
    var userCharName = $('#yourChar').children().attr('name');
    var userCharHealth = $('#yourChar').children().attr('health');
    var userCharAttk = $('#yourChar').children().attr('attack');
    var compCharName = $('#defArea').children().attr('name');
    var compCharHealth = $('#defArea').children().attr('health');
    var compCharAtk = $('#defArea').children().attr('counter');
    //player and enemy are chosen now the fun begins
    if (playerChosen && enemyChosen && userCharHealth > 0) {
      $('#info').empty();
      compCharHealth -= userCharAttk;
      $('#defArea').children().attr('health', compCharHealth);
      $('#defArea .life').text("Life: " + compCharHealth);
      //enemy counter attack
      userCharHealth -= compCharAtk;
      $('#yourChar').children().attr('health', userCharHealth);
      $('#yourChar .life').text("Life: " + userCharHealth);
      var fightText = $('<p>');
      fightText.append(userCharName + " attacked " + compCharName + " for " + userCharAttk + " life.<br>" + compCharName + " attacked you for " + compCharAtk + " life.");
      $('#info').append(fightText);

      //after every 'attack' your character gains plus base attack 
      if ($('#yourChar').children().length > 0 && $('#defArea').children().length > 0 && userCharHealth > 0) {
        for (var i = 0; i < charSelect.length; i++) {
          if (charSelect[i].name == userCharName) {
            var baseAtkPwr = charSelect[i].attack;
          };
        };
        userCharAttk = parseInt(userCharAttk) + parseInt(baseAtkPwr);
        $('#yourChar').children().attr('attack', userCharAttk);
        console.log(userCharAttk);
      };
      // for loop starting after player has beaten enemy 
      if (compCharHealth <= 0) {
        $('#info').empty();
        $('#defArea').empty();
        enemyChosen = false;
        var winText = $('<p>');
        winText.append(userCharName + ' has vanquished ' + compCharName + '. Select another opponent.');
        $('#info').append(winText);
      }//sets win conditions 
      if ($('#enemyArea').children().length == 0 && $('#defArea').children().length == 0 && playerChosen) {
        $('#info').empty();
        $('#attkBtn').hide();
        var winner = $('<p>');
        winner.append('You won by using the Force!');

        //trigger restart button upon win
        var pgBr = $('<br>');
        winner.append(pgBr);
        var reset = $('<button>Reset</button>');
        reset.addClass('btn btn-warning reset');
        pgBr.append(reset);
        $('#info').append(winner);
      }//trigger reset button upon loss
      if (userCharHealth <= 0) {
        $('#info').empty();
        $('#attkBtn').hide();
        var defeat = $('<p>');
        defeat.append//.text//('Game Over! ');

        var pgBr = $('<br>');
        defeat.append(pgBr);
        var reset = $('<button>Reset</button>');
        reset.addClass('btn btn-warning reset');
        defeat.append(pgBr);
        $('#info').append(defeat);
      }
    } else if (playerChosen && !enemyChosen && $('#enemyArea').children().length > 0) {
      $('#info').empty();
      var enemySel = $('<p>');
      enemySel.append('Choose an opponent');
      $('#info').append(enemySel);
    } else if (!playerChosen) {
      $('#info').empty();
      var charSel = $('<p>');
      charSel.append('Choose Your Character');
      $('#info').append(charSel);
    }
  });

  $(document).on('click', '.reset', function () {
    playerChosen = false;
    enemyChosen = false;
    $('#charSelect').empty();
    $('#yourChar').empty();
    $('#defArea').empty();
    $('#enemyArea').empty();
    $('#info').empty();
    initGame();
  });

  initGame();
});




   // thomas notes
      // Char(charSelect[0]) {
      //   $('<img></img>').src(object.img)
      // }
      // renderChar(charSelect[0])

      // $('<div>').src(charSelect[i].img)
      // charSelect[i]
      //











      // if win player must choose another char from the '.enemyArea'
      //if win2 must choose another char from the '.enemyArea'
      //if win3 must choose another char from the '.enemyArea'
      // if at anytime lose (health to zero)game restarts
