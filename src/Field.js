
export class Field {

	constructor() {
		this.stack = [];
		this.matrix = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		];
	}

	pushToStack(value, row, col) {
		this.stack.push({value: value, row: row, col: col})
	}

	popStack() {
		if (!this.stack.length) {
			return null;
		};
		return this.stack.pop();
	}

	setValue($target, value, row, col) {
		if ($target.innerHTML !== '') {
			window.alert('this cell is already filled');
			return false;
		}
		$target.innerHTML = value;

		if (value === 0) {
			this.matrix[row][col] = 1;
		} else {
			this.matrix[row][col] = 2;
		}

		this.pushToStack(value, row, col)
	}

	resetMatrix() {
		for(let i = 0; i < this.matrix.length; i++) {
			for(let j = 0; j < this.matrix[i].length; j++) {
				this.matrix[i][j] = 0;
			}
		}
	}
}