// eslint-disable-next-line import/extensions
import NumberColumns from '../modules/NumberColumns.js';

class TableGenerator extends NumberColumns {
  constructor(rows, columns, side) {
    super(rows, columns);
    this.side = side;
    this.center();
  }

  center() {
    window.scrollTo(
      (this.side * this.columns - window.innerWidth) / 2,
      (this.side * this.rows - window.innerHeight) / 2,
    );
  }

  run() {
    let html = "<table cellpadding=0 cellspacing=0 id='table'>";
    for (let y = 0; y < this.rows; y += 1) {
      html += '<tr>';
      for (let x = 0; x < this.columns; x += 1) {
        html += `<td id="cell__${x}-${y}" onmouseup="changeStatus(${x},${y})">`;
        html += '</td>';
      }
      html += '</tr>';
    }
    html += '</table>';
    const container = document.getElementById('table__container');
    container.innerHTML = html;
    const table = document.getElementById('table');
    table.style.width = `${this.side * this.columns}px`;
    table.style.height = `${this.side * this.rows}px`;
    this.center();
  }

  minus() {
    this.side -= 1;

    if (this.side <= 4) {
      this.side = 4;
      return;
    }
    const table = document.getElementById('table');
    table.style.width = `${this.side * this.columns}px`;
    table.style.height = `${this.side * this.rows}px`;
  }

  plus() {
    this.side += 1;
    const table = document.getElementById('table');
    table.style.width = `${this.side * this.columns}px`;
    table.style.height = `${this.side * this.rows}px`;
  }

  restore() {
    this.side = 15;
    const table = document.getElementById('table');
    table.style.width = `${this.side * this.columns}px`;
    table.style.height = `${this.side * this.rows}px`;
  }
}
export default TableGenerator;
