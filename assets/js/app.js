/* eslint-disable import/extensions */
import Multiplayer from './MultiPlayer.js';
import TableGenerator from './plugins/TableGenerator.js';
import PopulationCount from './plugins/PopulationCount.js';
import ChangeStatus from './modules/ChangeStatus.js';
import ScreemShot from './modules/ScreemShoot.js';

/* ======  DOOM  ====== */
const skip_btn = document.getElementById('skip_btn');
const play_btn = document.getElementById('play_btn');
const clear_btn = document.getElementById('clear_btn');
const focus_btn = document.getElementById('focus_btn');
const generation = document.getElementById('generation');
const plus_btn = document.getElementById('plus_btn');
const minium_btn = document.getElementById('minium_btn');
const restore_btn = document.getElementById('restore_btn');

document.getElementById('dot_1').style.display = 'none';
/* Defining the number of columns in the table. */
const rows = 250; // 250
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

const populationGame = new PopulationCount(rows, columns, screem);
const changeStatus = (x, y) => {
  const change = new ChangeStatus(x, y);
  change.cellsGen();
  populationGame.run();
};
window.changeStatus = changeStatus;

const memory = new ScreemShot(rows, columns, screem);

const generationCount = (num) => {
  if (num === 1) {
    cont += 1;
    generation.innerHTML = cont;
  } else {
    cont = 0;
    generation.innerHTML = cont;
  }
};

const nextStatus = () => {
  screem = memory.screemShot();
  game.rows = rows;
  game.columns = columns;
  game.screem = screem;
  game.cellStatus();
  generationCount(1);
  populationGame.run();
};

const swapPlay = () => {
  reproduce = !reproduce;
};

setInterval(() => {
  if (reproduce) {
    nextStatus();
    setTimeout(() => {
      document.getElementById('dot_1').style.display = 'block';
    }, 100);
    setTimeout(() => {
      document.getElementById('dot_1').style.display = 'none';
      document.getElementById('dot_1').style.display = 'block';
    }, 150);
    setTimeout(() => {
      document.getElementById('dot_1').style.display = 'none';
      document.getElementById('dot_1').style.display = 'block';
    }, 200);
    setTimeout(() => {
      document.getElementById('dot_1').style.display = 'none';
    }, 350);
  }
}, 350);

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
      populationGame.run();
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
  populationGame.run();
};
skip_btn.onclick = () => nextStatus();
clear_btn.onclick = () => {
  clear();
  generation(0);
  populationGame.run();
};
focus_btn.onclick = () => tableGame.center();
focus_btn.onclick = () => tableGame.center();
focus_btn.onclick = () => tableGame.center();
plus_btn.onclick = () => tableGame.plus();
minium_btn.onclick = () => tableGame.minus();
restore_btn.onclick = () => tableGame.restore();
