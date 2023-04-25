export class Actions {

	static clearCells() {
		const cells = document.querySelectorAll('.grid__item');

		cells.forEach(cell => {
			cell.innerHTML = '';
		})
	}

	static nextTurn() {
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

	static tagWinnerCells(condition) {
		condition.forEach(id => {
			const [row, col] = id.split(':');
			const cell = document.querySelector(`[data-id='${row}:${col}']`);
			cell.style.border = '2px solid #8A2BE2';
		})		
	}

	static clearTags() {
		const cells = document.querySelectorAll('.grid__item');
		cells.forEach(cell => {
			cell.style.border = 'none';
		})		
	}
}