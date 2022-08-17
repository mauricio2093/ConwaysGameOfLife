/* eslint-disable no-useless-constructor */
/* eslint-disable import/extensions */
import ScreemShot from '../modules/ScreemShoot.js';

class PopulationCount extends ScreemShot {
  constructor(rows, columns, screem) {
    super(rows, columns, screem);
    this.run();
  }

  run() {
    let count = 0;
    const memory = new ScreemShot(this.rows, this.columns, this.screem);
    const screem = memory.screemShot();
    const population = document.getElementById('population');
    for (let i = 0; i < screem.length; i += 1) {
      for (let j = 0; j < screem[i].length; j += 1) {
        if (screem[i][j] === true) {
          count += 1;
          console.log(count);
        }
        population.innerHTML = count;
      }
    }
  }
}

export default PopulationCount;
