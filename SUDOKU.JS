const sudokuGrid = document.querySelector('.sudoku-grid');

const sudokuPuzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const solution = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

function createGrid() {
    sudokuGrid.innerHTML = '';
    sudokuPuzzle.forEach((row, rIdx) => {
        row.forEach((num, cIdx) => {
            const cell = document.createElement('input');
            cell.type = 'text';
            cell.dataset.row = rIdx;
            cell.dataset.col = cIdx;
            cell.maxLength = 1;

            if (num !== 0) {
                cell.value = num;
                cell.readOnly = true;
            }

            sudokuGrid.appendChild(cell);
        });
    });
}

function validate() {
    const inputs = document.querySelectorAll('.sudoku-grid input');
    let isCorrect = true;

    inputs.forEach(input => {
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        const value = parseInt(input.value) || 0;

        if (value !== solution[row][col]) {
            input.style.backgroundColor = '#ffdddd';
            isCorrect = false;
        } else {
            input.style.backgroundColor = '#ddffdd';
        }
    });

    return isCorrect;
}

function provideHint() {
    const inputs = document.querySelectorAll('.sudoku-grid input');
    for (let input of inputs) {
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        const value = parseInt(input.value) || 0;

        if (value === 0 || value !== solution[row][col]) {
            input.value = solution[row][col];
            input.style.backgroundColor = '#ffffcc';
            break;
        }
    }
}

// Event Listeners
document.getElementById('check-btn').addEventListener('click', () => {
    if (validate()) {
        alert('Congratulations! The solution is correct!');
    } else {
        alert('There are mistakes in your solution.');
    }
});

document.getElementById('reset-btn').addEventListener('click', createGrid);
document.getElementById('hint-btn').addEventListener('click', provideHint);

// Initialize the grid
createGrid();

