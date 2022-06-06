// eslint-disable-next-line import/extensions
import NumberColumns from './NumberColumns.js';

class ScreemShot extends NumberColumns {
  constructor(rows, columns, screem) {
    super(rows, columns);
    this.screem = screem;
  }

  screemShot() {
    this.screem = [];
    for (let x = 0; x < this.columns; x += 1) {
      this.screem.push([]);
      for (let y = 0; y < this.rows; y += 1) {
        const cell = document.getElementById(`cell__${x}-${y}`);
        const cellLive = cell.style.background === 'white';
        this.screem[x][y] = cellLive;
      }
    }
    return this.screem;
  }

  clearTable() {
    this.screem = [];
    for (let x = 0; x < this.columns; x += 1) {
      for (let y = 0; y < this.rows; y += 1) {
        const cell = document.getElementById(`cell__${x}-${y}`);
        cell.style.background = '';
      }
    }
  }
}

export default ScreemShot;
