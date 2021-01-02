'use strict';

// Selecting elements for scores
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNewEL = document.querySelector('.btn--new');
const btnRollEL = document.querySelector('.btn--roll');
const btnHoldEL = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const reset = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    score0EL.textContent = 0;
    score1EL.textContent = 0;
    current0EL.textContent = 0;
    current1EL.textContent = 0;
    diceEL.classList.add('hidden');
    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');
    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');
}
reset();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; 
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
}

//Rolling Functionality
btnRollEL.addEventListener('click', function() {
    if(playing){
    //generate dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    //check if rolled 1 is true, if true switch player
    if(dice !== 1) {
        //add dice to score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        // Switch Player
        switchPlayer();
    }
    }
});

btnHoldEL.addEventListener('click', function() {
    if(playing){
    // Add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    //Check if score is 100
    if(scores[activePlayer] >= 100) {
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        diceEL.classList.add('hidden');
    } else {
    // If not switch player
        switchPlayer();
    }
    }
});

btnNewEL.addEventListener('click', reset);