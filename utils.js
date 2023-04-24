const matrix = [
	[2, 0, 0],
	[1, 2, 1],
	[0, 0, 2],
]
//1 - это 0
//2 - это X


const firstCondition = (matrix) => {
	for(let i = 0; i < matrix.length; i++) {
		for(let j = 0; j < matrix[i].length; j++) {
			//главная диагональ
			/*if (i === j) {
				console.log(matrix[i][j]);
			}*/
			//побочная диагональ
			/*if (i + j + 1 == matrix.length) {
				console.log(matrix[i][j]);
			}*/
			//Левая линия
			/*if (j === 0) {
				console.log(matrix[i][j]);
			}*/
			//Правая линия
			/*if (j === matrix.length - 1) {
				console.log(matrix[i][j]);
			}*/
			//верхняя линия
			/*if (i === 0) {
				console.log(matrix[i][j]);
			}*/
			//нижнияя линия
			/*if (i === matrix.length - 1) {
				console.log(matrix[i][j])
			}*/
			//средняя линия
			/*if (i === 1) {
				console.log(matrix[i][j]);
			}*/
			//средний столбик
			/*if (j === 1) {
				console.log(matrix[i][j]);
			}*/
		}
	}
}

