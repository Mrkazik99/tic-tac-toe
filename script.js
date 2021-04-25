let activePlayer;
let board
let moves;
let gameActive = false;
const winingConditions = [
    [{'x': 0, 'y': 0}, {'x': 0, 'y': 1}, {'x': 0, 'y': 2}], //top horizontal
    [{'x': 1, 'y': 0}, {'x': 1, 'y': 1}, {'x': 1, 'y': 2}], //middle horizontal
    [{'x': 2, 'y': 0}, {'x': 2, 'y': 1}, {'x': 2, 'y': 2}], //bottom horizontal
    [{'x': 0, 'y': 0}, {'x': 1, 'y': 0}, {'x': 2, 'y': 0}], //left vertical
    [{'x': 0, 'y': 1}, {'x': 1, 'y': 1}, {'x': 2, 'y': 1}], //middle vertical
    [{'x': 0, 'y': 2}, {'x': 1, 'y': 2}, {'x': 2, 'y': 2}], //right vertical
    [{'x': 0, 'y': 0}, {'x': 1, 'y': 1}, {'x': 2, 'y': 2}], // \
    [{'x': 2, 'y': 0}, {'x': 1, 'y': 1}, {'x': 0, 'y': 2}]  // /
]

function startGame() {
    gameActive = true;
    activePlayer = 'X';
    moves = 0;
    notify(`Now playing ${activePlayer}`);
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    $('.game__cell').each(function() {
        $(this).click('click', endTour);
    });
}

function endTour() {
    let pos = $(this).attr('id').split(':');
    if(gameActive && board[pos[0]][pos[1]] == '') {
        moves++;
        $(this).addClass(`--filled-${activePlayer}`);
        board[pos[0]][pos[1]] = activePlayer;
        checkWin();
        if(moves >= 9) {
            draw();
        }
    }
}

function checkWin() {
    let won = false;
    winingConditions.forEach(coords => {
        if(board[coords[0]['x']][coords[0]['y']] === activePlayer && board[coords[1]['x']][coords[1]['y']] === activePlayer && board[coords[2]['x']][coords[2]['y']] === activePlayer) {
            won = true;
            notify(`${activePlayer} won.`)
            endGame();
        }
    });
    if(!won) {
        activePlayer = activePlayer === 'X' ? 'O' :  'X';
        notify(`Now playing ${activePlayer}`);
    }
}

function draw() {
    endGame();
    notify('Draw');
}

function endGame() {
    $('.game_cell').each(function() {
        $(this).unbind();
    });
    gameActive = false;
}

function restartGame() {
    endGame();
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    $('.game__cell').each(function() {
        if($(this).hasClass('--filled-X'))
            $(this).removeClass('--filled-X');
        if($(this).hasClass('--filled-O'))
            $(this).removeClass('--filled-O');
    });
    gameActive = true;
    activePlayer = 'X'
    moves = 0;
    startGame();
}

function notify(message) {
    $('#notification').html(message);
}