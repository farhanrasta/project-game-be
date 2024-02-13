function generateComputerMove() {
    const moves = ['batu', 'kertas', 'gunting'];
    return moves[Math.floor(Math.random() * moves.length)];
}

function determineWinner(userMove, computerMove) {

    let userWins = 0;
    let computerWins = 0;
    let result;

    if (userMove === computerMove) {
        return 'SERI!';
    } else if (
        (userMove === 'batu' && computerMove === 'gunting') ||
        (userMove === 'kertas' && computerMove === 'batu') ||
        (userMove === 'gunting' && computerMove === 'kertas')
    ) {
        result = 'YOU WIN! JUST LUCKY!';
        userWins++; 
    } else {
        result = 'YOU LOSE! SUCH A LOSER!';
        computerWins++; 
    }
    return { result, userWins, computerWins };
}

function playGame(userMove, computerMove) {
    const { result, userWins, computerWins }= determineWinner(userMove, computerMove);
    return { userMove, computerMove, result, userWins, computerWins };
}

module.exports = { playGame };