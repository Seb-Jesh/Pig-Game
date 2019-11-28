/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gameOn;

startGame();

document.querySelector(".btn-roll").addEventListener('click', function() {
    if(gameOn) {
      //Generate random number between 1 and 6 with dice
    let dice = Math.floor(Math.random() * 6 + 1);
    //Change the dice display to block or visible
    let diceDom = document.querySelector(".dice");
    diceDom.style.display = 'block';
    //Select the appropriate image source to display the dice
    diceDom.src = "dice-" + dice + ".png";

    //Update the round score only if dice greater than 1 or not equal to 1
    if(dice !== 1) {
        //Update the score
        roundScore += dice;
        //Display the score
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
        /*Other player's turn
        if(activePlayer === 0) {
            activePlayer = 1;
        } else {
            activePlayer = 0;
        }*/
        nextPlayer();
      }
    }    
});

document.querySelector(".btn-hold").addEventListener('click', function() {
    if(gameOn) {
        //1. Update the global player score
        scores[activePlayer] += roundScore;
    //2. Update the global player score
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
    //3. Check if player global score is greater or equal to 100
         if(scores[activePlayer] >= 100) {
        //Change text from player number to winner
        document.querySelector("#name-" + activePlayer).textContent = 'Winner!!!';
        //Remove the dice
        document.querySelector(".dice").style.display = 'none';
        //Remove the active class from the winner 
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        //Add the winner style class 
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        gameOn = false;
        } else {
    //4. Next Player
         nextPlayer();
        }
     }
    
    });

function nextPlayer () {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        //Reset current score for each player
        document.getElementById("current-0").textContent = roundScore;
        document.getElementById("current-1").textContent = roundScore;
        //Toggle the css of the active player by removing/adding the active class
        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active");
        //Remove the dice to show other player turn
        document.querySelector(".dice").style.display = 'none';
}

document.querySelector(".btn-new").addEventListener('click', startGame);

function startGame() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gameOn = true;
    document.getElementById("score-0").textContent = '0';
    document.getElementById("score-1").textContent = '0';
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';
    document.querySelector("#name-0").textContent = 'Player 1';
    document.querySelector("#name-1").textContent = 'Player 2';
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active"); 
    document.querySelector(".dice").style.display = 'none';
    
}