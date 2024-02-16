// let userWins = 0;
// let computerWins = 0;

function generateComputerMove() {
    const moves = ['batu', 'kertas', 'gunting'];
    return moves[Math.floor(Math.random() * moves.length)];
}

function determineWinner(userMove, computerMove, usWins, comWins) {
    let result;
    console.log("usWins", usWins);
    console.log("comWins", comWins);
    if (userMove === computerMove) {
        result = 'Draw! Roll Again!';
        var userWins = parseInt(usWins)
        var computerWins = parseInt(comWins)
    } else if (
        (userMove === 'batu' && computerMove === 'gunting') ||
        (userMove === 'kertas' && computerMove === 'batu') ||
        (userMove === 'gunting' && computerMove === 'kertas')
    ) {
        result = 'YOU WIN! JUST LUCKY!';
        var userWins = parseInt(usWins) + 1; 
        var computerWins = parseInt(comWins)
        console.log("userWins", userWins);
    } else {
        result = 'YOU LOSE! SUCH A LOSER!';
        var computerWins = parseInt(comWins) + 1;
        var userWins = parseInt(usWins)
        console.log("computerWins", computerWins);
    }
    return { result, userWins, computerWins };
}

function playGame(userMove, computerMove, usWins, comWins) {
    const { result, userWins, computerWins }= determineWinner(userMove, computerMove, usWins, comWins);
    return { userMove, computerMove, result, userWins, computerWins };
}

module.exports = { playGame };