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
const focus_btn = document.getElementById('focus_btn');
const gen = document.getElementById('gen');
const plus_btn = document.getElementById('plus_btn');
const minium_btn = document.getElementById('minium_btn');
const restore_btn = document.getElementById('restore_btn');

document.getElementById('dot_1').style.display = 'none';
/* Defining the number of columns in the table. */
const rows = 250;
const columns = 250; // 90
const side = 15; // 15

let reproduce = false;
let screem = [];
let cont = 0;

const tableGame = new TableGenerator(rows, columns, side);
const game = new Multiplayer({
  rows,
  columns,
  screem,
  plugins: [tableGame],
});

const changeStatus = (x, y) => {
  const change = new ChangeStatus(x, y);
  change.cellsGen();
};
window.changeStatus = changeStatus;

const memory = new ScreemShot(rows, columns, screem);

const generation = (num) => {
  if (num === 1) {
    cont += 1;
    gen.innerHTML = cont;
  } else {
    cont = 0;
    gen.innerHTML = cont;
  }
};

const nextStatus = () => {
  screem = memory.screemShot();
  game.rows = rows;
  game.columns = columns;
  game.screem = screem;
  game.cellStatus();
  generation(1);
};

const swapPlay = () => {
  reproduce = !reproduce;
};

setInterval(() => {
  if (reproduce) {
    nextStatus();
    setTimeout(() => {
      document.getElementById('dot_1').style.display = 'block';
    }, 50);
    setTimeout(() => {
      document.getElementById('dot_1').style.display = 'none';
      document.getElementById('dot_1').style.display = 'block';
    }, 100);
    setTimeout(() => {
      document.getElementById('dot_1').style.display = 'none';
      document.getElementById('dot_1').style.display = 'block';
    }, 150);
    setTimeout(() => {
      document.getElementById('dot_1').style.display = 'none';
    }, 200);
  }
}, 200);

const changeButton = () => {
  game.Reproduce = reproduce;
  game.changePlayButton();
};

const clear = () => {
  memory.clearTable();
  tableGame.center();
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
      generation(0);
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
clear_btn.onclick = () => {
  clear();
  generation(0);
};
focus_btn.onclick = () => tableGame.center();
focus_btn.onclick = () => tableGame.center();
focus_btn.onclick = () => tableGame.center();
plus_btn.onclick = () => tableGame.plus();
minium_btn.onclick = () => tableGame.minus();
restore_btn.onclick = () => tableGame.restore();
