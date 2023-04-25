import {parseId} from './src/utils.js';
import {Game} from './src/Game.js';
import {Actions} from './src/Actions.js';

window.onload = () => {
	const game = new Game();
	const field = document.querySelector(Game.className);
	const undoBtn = document.querySelector('#buttonUndo');
	const restartBtn = document.querySelector('#buttonRestart');

	field.addEventListener('click', (event) => {
		const $target = event.target;
		game.start($target);
		
	})	

	restartBtn.addEventListener('click', (event) => {
		event.preventDefault();
		game.restart();
	})

	undoBtn.addEventListener('click', (event) => {
		event.preventDefault();
		const {row, col} = game.undo() || [null, null];
		if (row && col) {
			const cell = document.querySelector(`[data-id='${row}:${col}']`);
			cell.innerHTML = '';
		}
	})
}






