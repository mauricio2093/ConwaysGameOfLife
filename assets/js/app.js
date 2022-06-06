// eslint-disable-next-line import/extensions
import Multiplayer from './MultiPlayer.js';
// eslint-disable-next-line import/extensions
import TableGenerator from './plugins/TableGenerator.js';
// eslint-disable-next-line import/extensions
import ChangeStatus from './ChangeStatus.js';
// eslint-disable-next-line import/extensions
import ScreemShot from './ScreemShoot.js';
/* ======  DOOM  ====== */
const skip_btn = document.getElementById('skip_btn');
const play_btn = document.getElementById('play_btn');
const clear_btn = document.getElementById('clear_btn');
/* Defining the number of columns in the table. */
const rows = 40;
const columns = 90; // 90
const side = 15; // 15

let reproduce = false;
let screem = [];

const game = new Multiplayer({
  rows,
  columns,
  screem,
  plugins: [new TableGenerator(rows, columns, side)],
});

const changeStatus = (x, y) => {
  const change = new ChangeStatus(x, y);
  change.cellsGen();
};
window.changeStatus = changeStatus;

const memory = new ScreemShot(rows, columns, screem);

const nextStatus = () => {
  screem = memory.screemShot();
  game.rows = rows;
  game.columns = columns;
  game.screem = screem;
  game.cellStatus();
};

const swapPlay = () => {
  reproduce = !reproduce;
};

setInterval(() => {
  if (reproduce) {
    nextStatus();
  }
}, 200);

const changeButton = () => {
  game.Reproduce = reproduce;
  game.changePlayButton();
};

const clear = () => {
  memory.clearTable();
};

// Keyboard
document.addEventListener('keydown', (e) => { // keyboard controll
  e.preventDefault(); // prevent movement of scroll
  switch (e.keyCode) {
    case 39:
      nextStatus();
      break;

    case 32:
      swapPlay();
      changeButton();
      break;

    case 8:
      clear();
      break;

    default:
      break;
  }
});
// Buttons
play_btn.onclick = () => {
  swapPlay();
  changeButton();
};
skip_btn.onclick = () => nextStatus();
clear_btn.onclick = () => clear();
