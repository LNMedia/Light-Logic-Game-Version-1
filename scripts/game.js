document.addEventListener('DOMContentLoaded', function() {
    const gameBoard = document.getElementById('gameBoard');
    let gameData;
    let rows, cols;

    function createGameBoard(rows, cols) {
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

        gameData = Array.from({ length: rows }, () => Array(cols).fill(false));

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cell = document.createElement('div');
                cell.classList.add('gameCell', 'off');
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', () => toggleCells(row, col));
                gameBoard.appendChild(cell);
            }
        }

        randomizeBoard();
    }

    function toggleCells(row, col) {
        const directions = [
            [0, 0],  // Center
            [-1, 0], // Above
            [1, 0],  // Below
            [0, -1], // Left
            [0, 1]   // Right
        ];

        directions.forEach(([dRow, dCol]) => {
            const newRow = row + dRow;
            const newCol = col + dCol;

            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                gameData[newRow][newCol] = !gameData[newRow][newCol];
                updateCell(newRow, newCol);
            }
        });

        if (checkWin()) {
            setTimeout(() => {
                alert('Gewonnen!');
                document.getElementById('gameContainer').style.display = 'none';
                document.getElementById('mainMenu').style.display = 'block';
                document.getElementById('mainMenu').style.scale = '1';
                isMainMenu = true;
                isDiffMenu = false;
            }, 100);
        }
    }

    function updateCell(row, col) {
        const cell = gameBoard.querySelector(`.gameCell[data-row='${row}'][data-col='${col}']`);
        if (gameData[row][col]) {
            cell.classList.add('on');
            cell.classList.remove('off');
        } else {
            cell.classList.add('off');
            cell.classList.remove('on');
        }
    }

    function randomizeBoard() {
        gameData.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (Math.random() > 0.5) {
                    toggleCells(rowIndex, colIndex);
                }
            });
        });
    }

    function checkWin() {
        return gameData.every(row => row.every(cell => !cell));
    }

    // Event listeners for difficulty buttons
    document.getElementById('stufe1').addEventListener('click', function() {
        startGame(5, 7);
    });

    document.getElementById('stufe2').addEventListener('click', function() {
        startGame(8, 8);
    });

    document.getElementById('stufe3').addEventListener('click', function() {
        startGame(9, 12);
    });

    document.getElementById('stufe4').addEventListener('click', function() {
        startGame(11, 15);
    });

    document.getElementById('stufe5').addEventListener('click', function() {
        startGame(13, 18);
    });

    document.getElementById('stufe6').addEventListener('click', function() {
        startGame(13, 25);
    });

    document.getElementById('restartButton').addEventListener('click', function() {
        createGameBoard(rows, cols);
    });

    function startGame(r, c) {
        rows = r;
        cols = c;
        document.getElementById('difficultyMenu').style.display = 'none';
        document.getElementById('gameContainer').style.display = 'block';
        createGameBoard(rows, cols);
    }
});
