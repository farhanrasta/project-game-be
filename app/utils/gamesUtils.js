function generateComputerMove() {
    const moves = ['batu', 'kertas', 'gunting'];
    return moves[Math.floor(Math.random() * moves.length)];
}

function determineWinner(userMove, computerMove) {
    if (userMove === computerMove) {
        return 'Seri';
    } else if (
        (userMove === 'batu' && computerMove === 'gunting') ||
        (userMove === 'kertas' && computerMove === 'batu') ||
        (userMove === 'gunting' && computerMove === 'kertas')
    ) {
        return 'User wins';
    } else {
        return 'Computer wins';
    }
}

function playGame(userMove) {
    const computerMove = generateComputerMove();
    const result = determineWinner(userMove, computerMove);
    return { userMove, computerMove, result };
}

module.exports = { playGame };