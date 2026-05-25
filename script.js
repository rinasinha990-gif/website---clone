const rows = 6;
const cols = 7;
let currentPlayer = 1;
let board = [];

const boardElement = document.getElementById('board');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

function createBoard() {
    board = [];
    boardElement.innerHTML = '';

    for (let r = 0; r < rows; r++) {
        board[r] = [];

        for (let c = 0; c < cols; c++) {
            board[r][c] = 0;

            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;

            cell.addEventListener('click', () => makeMove(c));

            boardElement.appendChild(cell);
        }
    }
}

function makeMove(col) {
    for (let row = rows - 1; row >= 0; row--) {
        if (board[row][col] === 0) {
            board[row][col] = currentPlayer;
            updateBoard();

            if (checkWinner(row, col)) {
                statusText.textContent = `Player ${currentPlayer} Wins!`;
                disableBoard();
                return;
            }

            currentPlayer = currentPlayer === 1 ? 2 : 1;
            statusText.textContent = `Player ${currentPlayer} Turn`;
            return;
        }
    }
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;

        cell.classList.remove('player1', 'player2');

        if (board[row][col] === 1) {
            cell.classList.add('player1');
        } else if (board[row][col] === 2) {
            cell.classList.add('player2');
        }
    });
}

function checkWinner(row, col) {
    return (
        checkDirection(row, col, 1, 0) ||
        checkDirection(row, col, 0, 1) ||
        checkDirection(row, col, 1, 1) ||
        checkDirection(row, col, 1, -1)
    );
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 1;

    count += countCells(row, col, rowDir, colDir);
    count += countCells(row, col, -rowDir, -colDir);

    return count >= 4;
}

function countCells(row, col, rowDir, colDir) {
    let count = 0;
    let player = board[row][col];

    let r = row + rowDir;
    let c = col + colDir;

    while (
        r >= 0 && r < rows &&
        c >= 0 && c < cols &&
        board[r][c] === player
    ) {
        count++;
        r += rowDir;
        c += colDir;
    }

    return count;
}

function disableBoard() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        cell.style.pointerEvents = 'none';
    });
}

resetBtn.addEventListener('click', () => {
    currentPlayer = 1;
    statusText.textContent = 'Player 1 Turn';
    createBoard();
});

createBoard();