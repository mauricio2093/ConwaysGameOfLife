// eslint-disable-next-line import/extensions
import NumberColumns from '../NumberColumns.js';

class TableGenerator extends NumberColumns {
  constructor(rows, columns, side) {
    super(rows, columns);
    this.side = side;
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
  }
}

export default TableGenerator;
