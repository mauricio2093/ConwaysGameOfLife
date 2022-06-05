// eslint-disable-next-line import/extensions
import AliveCount from './AliveCount.js';
// eslint-disable-next-line import/extensions
import ChangeStatus from './ChangeStatus.js';

class MultiPlayer extends ChangeStatus {
  constructor({
    rows, columns, screem, plugins,
  }) {
    super(rows, columns);
    this.screem = screem;
    this.plugins = plugins || [];
    this.initPlugins();
  }

  initPlugins() {
    this.plugins.forEach((plugin) => {
      plugin.run();
    });
  }

  cellStatus() {
    for (let x = 0; x < this.columns; x += 1) {
      for (let y = 0; y < this.rows; y += 1) {
        const count = new AliveCount(x, y, this.screem);
        const alive = count.aliveCount();
        const cell = document.getElementById(`cell__${x}-${y}`);

        if (this.screem[x][y]) { // cell alive
          if (alive < 2 || alive > 3) {
            cell.style.background = ''; // dies from loneliness or overpupulation
          }
        } else if (alive === 3) { // cell alive
          cell.style.background = 'white';
        }
      }
    }
  }
}
export default MultiPlayer;
