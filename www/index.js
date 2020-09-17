import { Universe, Cell } from 'wasm-game-of-life';
import { memory } from 'wasm-game-of-life/wasm_game_of_life_bg';

const CELL_SIZE = 5;
const GRID_COLOR = '#CCCCCC';
const DEAD_COLOR = '#FFFFFF';
const ALIVE_COLOR = '#FF0000';
let FPS = 30;

const universe = Universe.new();
const width = universe.width();
const height = universe.height();

const fpsSlider = document.getElementById('fps-slider');
const pausePlayBtn = document.getElementById('play-pause');
pausePlayBtn.textContent = '⏯︎';

const canvas = document.getElementById('game-of-life-canvas');
const ctx = canvas.getContext('2d');
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

let animationFrame = null;

const isPaused = () => animationFrame === null;
const getIndex = (row, column) => row * width + column;

const drawGrid = () => {
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR;

  // Vertical lines
  for (let i = 0; i <= width; i++ ) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  for (let j = 0; j <= height; j++ ) {
    ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
  }

  ctx.stroke();
};

const drawCells = () => {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  ctx.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);

      ctx.fillStyle = cells[idx] === Cell.Dead
        ? DEAD_COLOR
        : ALIVE_COLOR;

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE,
      );
    }
  }

  ctx.stroke();
};

canvas.addEventListener('click', (event) => {
  const boundingRect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
  const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

  universe.toggle_cell(row, col);

  drawGrid();
  drawCells();
});

const renderLoop = () => {
  setTimeout(() => {
    universe.tick();
    drawGrid();
    drawCells();
    
    animationFrame = requestAnimationFrame(renderLoop);

  }, 1000 / FPS);
};

const play = () => {
  renderLoop();
};

const pause = () => {
  cancelAnimationFrame(animationFrame);
  animationFrame = null;
};
pausePlayBtn.addEventListener('click', () => {
  if (isPaused()) {
    play();
  } else {
    pause();
  }
});

fpsSlider.addEventListener('change', (event) => {
  FPS = event.currentTarget.value;
});

drawGrid();
drawCells();
play();