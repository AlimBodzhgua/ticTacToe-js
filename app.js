import {parseId} from './src/utils.js';
import {Game} from './src/Game.js';
import {Actions} from './src/Actions.js';

window.onload = () => {
	const game = new Game();
	const field = document.querySelector(Game.className);
	const undoBtn = document.querySelector('#buttonUndo');
	const restartBtn = document.querySelector('#buttonRestart');

	const modal = document.querySelector('.modal');

	modal.addEventListener('click', (event) => {
		const $target = event.target;
		if ($target.dataset.id === 'playerX') {
			Actions.setTurn(2);
			game.changeTurn(2);
		} else if ($target.dataset.id === 'playerO') {
			Actions.setTurn(1);
			game.changeTurn(1);
		}

		setTimeout(() => {
			modal.style.display = 'none';
		}, 250)
		modal.style.transform = 'scale(0)';
	})


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

	const restartBtns = document.querySelectorAll('#btnReplay');

	restartBtns.forEach(btn => {
		btn.addEventListener('click', (event) => {
			event.preventDefault();
			game.restart();
			const modal = event.target.closest('.modal');
			modal.style.display = 'none';
		})
	})
}