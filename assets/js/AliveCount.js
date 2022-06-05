// eslint-disable-next-line import/extensions
import ChangeStatus from './ChangeStatus.js';

class AliveCount extends ChangeStatus {
  constructor(x, y, screem) {
    super(x, y);
    this.screem = screem;
  }

  aliveCount() {
    let alive = 0;
    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        if (i === 0 && j === 0) {
          continue;
        }
        try {
          if (this.screem[this.x + i][this.y + j]) {
            alive += 1;
          }
        } catch (error) {
          continue;
        }
        if (alive > 3) {
          return alive;
        }
      }
    }
    return alive;
  }
}

export default AliveCount;
