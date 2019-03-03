$(document).ready(function () {


  //this declares the global variable of characters, their individual attributes and sets the booleans of chosen character and chosen enemy to false 
  var charSelect = [
    {
      name: 'Dash Rendar',
      health: 120,
      attack: 8,
      counterAtk: 10,
      img: 'assets/images/dash-rendar.jpg'
    },
    {
      name: 'IG-88',
      health: 90,
      attack: 7,
      counterAtk: 20,
      img: 'assets/images/ig-88.jpg'
    },
    {
      name: 'Royal Guard',
      health: 150,
      attack: 7,
      counterAtk: 12,
      img: 'assets/images/imperial-royal-guard.jpg'
    },
    {
      name: 'Xizor',
      health: 120,
      attack: 8,
      counterAtk: 15,
      img: 'assets/images/xizor.jpg'
    }
  ];

  var playerChosen = false;
  var enemyChosen = false;

  // this function sets up the character button and appends them to the character select area 

  function initGame() {
    $('.gameArea').hide();
    for (var i = 0; i < charSelect.length; i++) {
      var charBtn = $('<button>');
      charBtn.addClass('charCard');
      charBtn.attr('name', charSelect[i].name);
      charBtn.attr('health', charSelect[i].health);
      charBtn.attr('attack', charSelect[i].attack);
      charBtn.attr('counter', charSelect[i].counterAtk);
      charBtn.append("<p>" + charSelect[i].name + "</p><img src='" + charSelect[i].img + "'class='charImg'><br><p class='health'>Life: " + charSelect[i].health + "</p>");
      $('#charSelect').append(charBtn);
    }
    var startText = $('<p>');
    startText.append('Choose your character.');
    $('#info').append(startText);
  };



  // // thomas notes
  // Char(charSelect[0]) {
  //   $('<img></img>').src(object.img)
  // }
  // renderChar(charSelect[0])

  // $('<div>').src(charSelect[i].img)
  // charSelect[i]
  //



  //everything starts/resets to all characters in '.charArea'
  //
  // var yourCharacter = $('.charArea')
  // for (var i = 0; i < charSelect.length; i++) {
  //   console.log(charSelect)
  // }


  //function for selecting character one is chosen on click and stays in '.charArea' until loss 
  //then the rest move to '.enemyArea'

  //from here

  //click on '.enemyArea' to select a character to then move to '.defendArea' the other 2 images stay in '.enemyArea'
  // if win player must choose another char from the '.enemyArea'
  //if win2 must choose another char from the '.enemyArea'
  //if win3 must choose another char from the '.enemyArea'
  // if at anytime lose (health to zero)game restarts




  //Battle Mechanic
  // click the '.attkBtn' to trigger fight event btwn your character and and chosen enemy                    //after every 'attack' your character gains plus base attack  
  //
  //
  //

  // });

  initGame();
});
