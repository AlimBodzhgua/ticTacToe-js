import {parseId} from './utils.js';
import {Field} from './Field.js';
import {Actions} from './Actions.js';


export class Game extends Field {
	static className = 'game';
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
		super();
		this.turn = 2;
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


	start($target) {
		let setResult;

		if ($target.dataset.type === 'cell') {
			const [row, col] = parseId($target.dataset.id)
			if (this.getTurn === 1) {
				setResult = this.setValue($target, 0, row, col);
			} else if (this.getTurn === 2) {
				setResult = this.setValue($target, 'x', row, col)
			}
			
			const isFinished = this.checkConditions();

			if (setResult !== false) {
				if (isFinished) {
					setTimeout(() => {
						window.alert('game over');
						this.resetMatrix();
						Actions.clearCells();
					}, 100);
				} else {
					this.changeTurn();
					Actions.nextTurn();
				}
			}
		}
	}

	restart() {
		this.resetMatrix();
		Actions.clearCells();
	}

	undo() {
		const {row, col} = this.popStack();
		this.matrix[row][col] = 0;
		this.changeTurn();
		Actions.nextTurn();
		return {row, col};
	}
}