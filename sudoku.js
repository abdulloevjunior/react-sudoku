// Пример простого стартового поля (0 — пустая клетка)
const START_BOARD = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

function createBoard(board) {
  const container = document.getElementById('sudoku-board');
  container.innerHTML = '';
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 1;
      input.className = 'cell';
      input.dataset.row = row;
      input.dataset.col = col;
      if (board[row][col] !== 0) {
        input.value = board[row][col];
        input.readOnly = true;
      } else {
        input.value = '';
        input.addEventListener('input', (e) => {
          const val = e.target.value.replace(/[^1-9]/g, '');
          e.target.value = val;
        });
      }
      container.appendChild(input);
    }
  }
}

function getCurrentBoard() {
  const inputs = document.querySelectorAll('.cell');
  const board = [];
  for (let i = 0; i < 9; i++) board.push([]);
  inputs.forEach(input => {
    const row = +input.dataset.row;
    const col = +input.dataset.col;
    board[row][col] = input.value === '' ? 0 : +input.value;
  });
  return board;
}

function checkSudoku() {
  const board = getCurrentBoard();
  let valid = true;

  // Проверка строк, столбцов, блоков 3x3
  for (let i = 0; i < 9; i++) {
    let row = new Set(), col = new Set(), block = new Set();
    for (let j = 0; j < 9; j++) {
      // Проверка строки
      if (board[i][j] !== 0) {
        if (row.has(board[i][j])) valid = false;
        row.add(board[i][j]);
      } else valid = false;
      // Проверка столбца
      if (board[j][i] !== 0) {
        if (col.has(board[j][i])) valid = false;
        col.add(board[j][i]);
      }

      // Проверка блока 3x3
      const br = 3 * Math.floor(i / 3) + Math.floor(j / 3);
      const bc = 3 * (i % 3) + (j % 3);
      if (board[br][bc] !== 0) {
        if (block.has(board[br][bc])) valid = false;
        block.add(board[br][bc]);
      }
    }
  }
  const message = document.getElementById('message');
  if (valid) {
    message.textContent = 'Поздравляем! Судоку решена правильно!';
    message.style.color = '#16a34a';
  } else {
    message.textContent = 'Проверьте решение. Есть ошибки или пустые клетки.';
    message.style.color = '#dc2626';
  }
}

window.onload = () => createBoard(START_BOARD);
