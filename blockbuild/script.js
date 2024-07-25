const gameBoard = document.getElementById('game-board');
const blockPool = document.getElementById('block-pool');
const scoreDisplay = document.getElementById('score-value');
let score = 0;

const boardSize = 10;
let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));

const colors = ['red', 'green', 'blue'];

let draggedElement = null;
let draggedData = null;

function createBlock(color, size) {
  const block = document.createElement('div');
  block.classList.add('block', color, 'draggable');
  block.style.width = `${size * 40}px`;
  block.style.height = `${size * 40}px`;
  block.dataset.color = color;
  block.dataset.size = size;
  block.addEventListener('mousedown', startDrag);
  return block;
}

function renderBoard() {
  gameBoard.innerHTML = '';
  board.forEach(row => {
    row.forEach(cell => {
      const block = createBlock(cell || 'empty', 1);
      gameBoard.appendChild(block);
    });
  });
  addDropEvents();
}

function addDropEvents() {
  const cells = gameBoard.querySelectorAll('.block');
  cells.forEach(cell => {
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('drop', drop);
  });
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomSize() {
  return Math.floor(Math.random() * 3) + 1; // Block sizes will range from 1 to 3
}

function generateBlocks() {
  blockPool.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const color = getRandomColor();
    const size = getRandomSize();
    const block = createBlock(color, size);
    blockPool.appendChild(block);
  }
}

function placeBlock(row, col, color, size) {
  if (isValidPlacement(row, col, size)) {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        board[row + i][col + j] = color;
      }
    }
    renderBoard();
    checkForCompleteLines();
  }
}

function isValidPlacement(row, col, size) {
  if (row + size > boardSize || col + size > boardSize) return false;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[row + i][col + j] !== null) return false;
    }
  }
  return true;
}

function checkForCompleteLines() {
  for (let i = 0; i < boardSize; i++) {
    if (board[i].every(cell => cell !== null)) {
      board[i].fill(null);
      score += 10;
      scoreDisplay.textContent = score;
    }
  }
}

function startDrag(e) {
  draggedElement = e.target;
  draggedData = { 
    color: draggedElement.dataset.color, 
    size: parseInt(draggedElement.dataset.size)
  };
  draggedElement.classList.add('dragging');
  document.body.appendChild(draggedElement);
  moveAt(e.pageX, e.pageY);

  function moveAt(pageX, pageY) {
    draggedElement.style.left = pageX - draggedElement.offsetWidth / 2 + 'px';
    draggedElement.style.top = pageY - draggedElement.offsetHeight / 2 + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  draggedElement.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    draggedElement.onmouseup = null;
    dropBlock();
  };
}

function dropBlock() {
  const target = document.elementFromPoint(event.clientX, event.clientY);
  if (target && target.classList.contains('block') && target.classList.contains('empty')) {
    const index = Array.from(gameBoard.children).indexOf(target);
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;
    placeBlock(row, col, draggedData.color, draggedData.size);
  }
  draggedElement.remove();
  draggedElement = null;
  draggedData = null;
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
}

document.addEventListener('DOMContentLoaded', () => {
  renderBoard();
  generateBlocks();
});
