
class Game {
	constructor() {
		this.stack = [];
		this.turn = 1;
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
			return window.alert('this cell is already filled');
		}

		if (value === 0) {
			this.matrix[row][col] = 1;
		} else {
			this.matrix[row][col] = 2;
		}

		this.pushToStack(value, row, col)
		$target.innerHTML = value;
	}

	pushToStack(value, row, col) {
		this.stack.push({value: value, row: row, col: col})
	}

	undo() {
		return this.stack.pop();
	}
}



window.onload = () => {
	let game = new Game();
	const field = document.querySelector('.game');
	const undoBtn = document.querySelector('#buttonUndo');
	const restartBtn = document.querySelector('#buttonRestart');

	field.addEventListener('click', (event) => {
		const $target = event.target;
		console.log($target);

		if ($target.dataset.type === 'cell') {
			const [row, col] = parseId($target.dataset.id)
			if (game.getTurn === 1) {
				game.setValue($target, 0, row, col);
				game.changeTurn();
			} else if (game.getTurn === 2) {
				game.setValue($target, 'x', row, col)
				game.changeTurn();
			}

			const turns = document.querySelectorAll('.turn__inner');

			turns.forEach(turn => {
				if (turn.dataset.value === 'active') {
					turn.dataset.value = 'inactive'
					turn.classList.remove('active');
				}else if (turn.dataset.value === 'inactive') {
					turn.dataset.value = 'active'
					turn.classList.add('active');
				}
			})

		}
	})	


	restartBtn.addEventListener('click', (event) => {
		event.preventDefault();
		console.log('restart');
	})

	undoBtn.addEventListener('click', (event) => {
		event.preventDefault();
		console.log(game.stack);
	})
}


const parseId = (id) => {
	return id.split(':');
}