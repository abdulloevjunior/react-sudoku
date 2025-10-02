const BOARD_SIZE = 9;
    const BLOCK_SIZE = 3;
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

    function createCell(row, col, value) {
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 1;
      input.className = 'cell';
      input.dataset.row = row;
      input.dataset.col = col;
      input.value = value !== 0 ? value : '';
      input.readOnly = value !== 0;
      if (value === 0) {
        input.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/[^1-9]/g, '');
        });
      }
      return input;
    }

    function createBoard(board) {
      const container = document.getElementById('sudoku-board');
      container.innerHTML = '';
      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
          container.appendChild(createCell(row, col, board[row][col]));
        }
      }
    }

    function getCurrentBoard() {
      const inputs = document.querySelectorAll('.cell');
      const board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));
      inputs.forEach(input => {
        const row = Number(input.dataset.row);
        const col = Number(input.dataset.col);
        board[row][col] = input.value === '' ? 0 : Number(input.value);
      });
      return board;
    }

    function isValidGroup(group) {
      const seen = new Set();
      for (const num of group) {
        if (num === 0 || seen.has(num)) return false;
        seen.add(num);
      }
      return true;
    }

    function getBlock(board, blockRow, blockCol) {
      const block = [];
      for (let i = 0; i < BLOCK_SIZE; i++) {
        for (let j = 0; j < BLOCK_SIZE; j++) {
          block.push(board[blockRow * BLOCK_SIZE + i][blockCol * BLOCK_SIZE + j]);
        }
      }
      return block;
    }

    function checkSudoku() {
      const board = getCurrentBoard();
      let valid = true;

      for (let i = 0; i < BOARD_SIZE; i++) {
        const row = board[i];
        const col = board.map(r => r[i]);
        if (!isValidGroup(row) || !isValidGroup(col)) {
          valid = false;
          break;
        }
      }

      for (let blockRow = 0; blockRow < BLOCK_SIZE; blockRow++) {
        for (let blockCol = 0; blockCol < BLOCK_SIZE; blockCol++) {
          if (!isValidGroup(getBlock(board, blockRow, blockCol))) {
            valid = false;
            break;
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
