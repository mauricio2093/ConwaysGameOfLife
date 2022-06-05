// eslint-disable-next-line import/extensions
import Multiplayer from './MultiPlayer.js';
// eslint-disable-next-line import/extensions
import TableGenerator from './plugins/TableGenerator.js';
// eslint-disable-next-line import/extensions
import ChangeStatus from './ChangeStatus.js';
// eslint-disable-next-line import/extensions
import ScreemShot from './ScreemShoot.js';

/* Defining the number of columns in the table. */
const rows = 40;
const columns = 90; // 90
const side = 15; // 15

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

document.addEventListener('keydown', (e) => { // keyboard controll
  e.preventDefault(); // prevent movement of scroll
  switch (e.keyCode) {
    case 39:
      nextStatus();
      break;

    default:
      break;
  }
});
