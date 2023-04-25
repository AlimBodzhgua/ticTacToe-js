export class Actions {

	static clearCells() {
		const cells = document.querySelectorAll('.grid__item');

		cells.forEach(cell => {
			cell.innerHTML = '';
		})
	}

	static setTurn(turnValue) {
		const x = document.querySelector('[data-turn="o"');
		const o = document.querySelector('[data-turn="x"');

		if (turnValue === 1) {
			o.classList.remove('active');
			x.classList.add('active');
		} else if (turnValue === 2) {
			x.classList.remove('active');
			o.classList.add('active');
		} 

	}

	static tagWinnerCells(condition) {
		condition.forEach(id => {
			const [row, col] = id.split(':');
			const cell = document.querySelector(`[data-id='${row}:${col}']`);
			cell.style.border = '1px solid #8A2BE2';
		})		
	}

	static clearTags() {
		const cells = document.querySelectorAll('.grid__item');
		cells.forEach(cell => {
			cell.style.border = 'none';
		})		
	}

	static showModalWinner(winner) {
		let modal;
		if (winner === 'x') {
			modal = document.querySelector('#modalWinnerX');
		} else if (winner === 'o') {
			modal = document.querySelector('#modalWinnerO');
		}
		setTimeout(() => {
			modal.style.transform = 'scale(1)';
		}, 50)
		modal.style.display = 'flex';
	}
}