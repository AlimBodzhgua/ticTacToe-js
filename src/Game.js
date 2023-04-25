import {parseId} from './utils.js';
import {Field} from './Field.js';
import {Actions} from './Actions.js';


export class Game extends Field {
	static className = '.game';
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

	changeTurn(turn) {
		if (!turn) {
			if (this.getTurn === 1) {
				this.turn = 2;
			} else {
				this.turn = 1
			}
		} else {
			this.turn = turn;
		}
	}

	checkConditions() {
		const conditions = Object.keys(this.#winConditions);
		let isWinnerX;
		let isWinnerO;
		let winCondition;

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
				winCondition = this.#winConditions[condition];
				return;
			}
			if (count2 === 3) {
				isWinnerX = true;
				winCondition = this.#winConditions[condition];
				return;
			}
		})

		return [isWinnerX, isWinnerO, winCondition];
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
			
			const [isWinnerX, isWinnerO, condition] = this.checkConditions();

			if (setResult !== false) {
				if (isWinnerX || isWinnerO) {
					Actions.tagWinnerCells(condition);

					const wait = new Promise((resolve) => {
						setTimeout(() => {
							if (isWinnerX) {
								Actions.showModalWinner('x');
							} else {
								Actions.showModalWinner('o');
							}
							resolve();
						}, 400)
					})
					wait.then(() => {
						this.resetMatrix();
						Actions.clearTags();
						Actions.clearCells();
					})
				} else {
					this.changeTurn();
					Actions.setTurn(this.turn);
				}
			}
		}
	}

	restart() {
		this.changeTurn();
		this.resetMatrix();
		Actions.clearCells();
	}

	undo() {
		const {row, col} = this.popStack() || [null, null];
		if (row && col) {
			this.matrix[row][col] = 0;
			this.changeTurn();
			Actions.setTurn(this.turn);
			return {row, col};
		}
	}
}