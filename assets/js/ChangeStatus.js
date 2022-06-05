class ChangeStatus {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  cellsGen() {
    const cell = document.getElementById(`cell__${this.x}-${this.y}`);
    if (cell.style.background !== 'white') {
      cell.style.background = 'white';
    } else {
      cell.style.background = '';
    }
  }
}
export default ChangeStatus;
