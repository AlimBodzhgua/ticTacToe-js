class Game {
	#winConditions = {
		condition1: ['0:0', '0:1', '0:2'],//firstLine
		condition2: ['0:0', '1:0', '2:0'],//leftLine
		condition3: ['2:0', '2:1', '2:2'],//lastLine
		condition4: ['0:2', '1:2', '2:2'],//rightLine
		condition5: ['1:0', '1:1', '1:2'],//centerRow
		condition6: ['0:1', '1:1', '2:1'],//centerCol
		condition7: ['0:0', '1:1', '2:2'],//diag1
		condition8: ['0:2', '1:1', '2:0'],//diag2
	};
	constructor() {
		this.stack = [];
		this.turn = 2;
		this.matrix = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		]
	}

	get getTurn() {
		return this.turn;
	}

	changeTurn() {
		if (this.getTurn === 1) {
			this.turn = 2;
		} else {
			this.turn = 1
		}
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

	pushToStack(value, row, col) {
		this.stack.push({value: value, row: row, col: col})
	}

	undo() {
		if (!this.stack.length) {
			console.log('fied is empty');
			return;
		}
		return this.stack.pop();
	}


	checkConditions() {
		const conditions = Object.keys(this.#winConditions);
		let isWinnerX;
		let isWinnerO;

		conditions.forEach(condition => {
			let count1 = 0;
			let count2 = 0;
			this.#winConditions[condition].forEach(id => {
				const [row, col] = parseId(id);
				if (this.matrix[row][col] === 1) count1++;
				if (this.matrix[row][col] === 2) count2++;
			})
			if (count1 === 3) {
				isWinnerO = true;
				return;
			}
			if (count2 === 3) {
				isWinnerX = true;
				return;
			}
		})

		if (isWinnerX === true || isWinnerO === true) {
			return true;
		}
		return false;
	}

	resetMatrix() {
		for(let i = 0; i < this.matrix.length; i++) {
			for(let j = 0; j < this.matrix[i].length; j++) {
				this.matrix[i][j] = 0;
			}
		}
	}
}



window.onload = () => {
	const game = new Game();
	const field = document.querySelector('.game');
	const undoBtn = document.querySelector('#buttonUndo');
	const restartBtn = document.querySelector('#buttonRestart');

	field.addEventListener('click', (event) => {
		const $target = event.target;
		let setResult;

		if ($target.dataset.type === 'cell') {
			const [row, col] = parseId($target.dataset.id)
			if (game.getTurn === 1) {
				setResult = game.setValue($target, 0, row, col);
			} else if (game.getTurn === 2) {
				setResult = game.setValue($target, 'x', row, col)
			}
			
			const isFinished = game.checkConditions();

			if (setResult !== false) {
				if (isFinished) {
					setTimeout(() => {
						window.alert('game over');
						game.resetMatrix();
						clearCells();
					}, 100);
				} else {
					game.changeTurn();
					nextTurn();
				}
			}
		}
	})	


	restartBtn.addEventListener('click', (event) => {
		event.preventDefault();
		game.resetMatrix();
		clearCells()
		console.log('restart');
	})

	undoBtn.addEventListener('click', (event) => {
		event.preventDefault();
		const {row, col} = game.undo();
		const cell = document.querySelector(`[data-id='${row}:${col}']`);
		game.matrix[row][col] = 0;
		cell.innerHTML = '';
		game.changeTurn();
		nextTurn();
	})
}


const parseId = (id) => {
	return id.split(':');
}

const clearCells = () => {
	const cells = document.querySelectorAll('.grid__item');

	cells.forEach(cell => {
		cell.innerHTML = '';
	})
}

const nextTurn = () => {
	const turns = document.querySelectorAll('.turn__inner');

	turns.forEach(turn => {
		if (turn.dataset.value === 'active') {
			turn.dataset.value = 'inactive';
			turn.classList.remove('active');
		}else if (turn.dataset.value === 'inactive') {
			turn.dataset.value = 'active';
			turn.classList.add('active');
		}
	})
}

