import {parseId} from './src/utils.js';
import {Game} from './src/Game.js';


window.onload = () => {
	const game = new Game();
	const field = document.getElementsByClassName(Game.className)[0];
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
		const {row, col} = game.undo();
		const cell = document.querySelector(`[data-id='${row}:${col}']`);
		cell.innerHTML = '';
	})
}






