const h1 = document.querySelector('h1');
const winningScoreSelect = document.querySelector('#playTo');



const player1 = {
    score: 0,
    button: document.querySelector('#playerOne'),
    display: document.querySelector('#playerOneDisplay')
}

const player2 = {
    score: 0,
    button: document.querySelector('#playerTwo'),
    display: document.querySelector('#playerTwoDisplay')
}

// const playerOneBtn = document.querySelector('#playerOne');
// const player1Display = document.querySelector('#playerOneDisplay')

// const playerTwoBtn = document.querySelector('#playerTwo');
// const player2Display = document.querySelector('#playerTwoDisplay')

const resetBtn = document.querySelector('#reset');

// let player1Score = 0, player2Score = 0;
let isGameOver = false;
let winningScore = 3;

function updateScore(player, opponent){
    if (!isGameOver) {
        player.score++;

        if (player.score === winningScore) {
            player.display.classList.add('winner');
            player.button.disabled = true;

            opponent.display.classList.add('loser');
            opponent.button.disabled = true;

            isGameOver = true;
        }

        player.display.textContent = player.score;
    }
}

player1.button.addEventListener('click', function (e) {
    updateScore(player1, player2);
});

player2.button.addEventListener('click', function (e) {
    updateScore(player2, player1);
});

winningScoreSelect.addEventListener('change', function (){
    winningScore = parseInt(this.value);
    reset();
});

resetBtn.addEventListener('click', reset);

function reset() {
    isGameOver = false;

    for (let p of [player1, player2]) {
        p.display.textContent = 0;
        p.display.classList.remove('winner', 'loser');
        p.button. disabled = false;
        p.score = 0;
    }

    // player1.display.textContent = 0;
    // player1.display.classList.remove('winner', 'loser');
    // player1.button. disabled = false;
    // player1.score = 0;

    // player2.display.textContent = 0;
    // player2.display.classList.remove('winner', 'loser');
    // player2.button. disabled = false;
    // player2.score = 0;
}