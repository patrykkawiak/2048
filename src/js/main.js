const board = document.querySelector('.board');
const rowsCount = 4;
const columnsCount = 4;
let boardArr;

const handlePrepareGame = () => {
	boardArr = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	];

	for (let r = 0; r < rowsCount; r++) {
		const newRow = document.createElement('div');
		newRow.classList.add('row');
		for (let c = 0; c < columnsCount; c++) {
			let newTile = document.createElement('div');
			newTile.setAttribute('id', `${r}-${c}`);
			newRow.append(newTile);
			let num = boardArr[r][c];
			handleUpdateTile(newTile, num);
			board.appendChild(newRow);
		}
	}

	addNextValue();
	addNextValue();
};

const empty = () => {
	for (let r = 0; r < rowsCount; r++) {
		for (let c = 0; c < columnsCount; c++) {
			if (boardArr[r][c] == 0) {
				return true;
			}
		}
	}
	return false;
};

const addNextValue = () => {
	if (!empty) {
		return;
	}

	let found = false;
	while (!found) {
		let randomColumn = Math.floor(Math.random() * 4);
		let randomRow = Math.floor(Math.random() * 4);

		if (boardArr[randomRow][randomColumn] == 0) {
			boardArr[randomRow][randomColumn] = 2;
			let tile = document.getElementById(`${randomRow}-${randomColumn}`);
			tile.innerText = '2';
			tile.classList.add('x2');
			tile.classList.add('tile-animation');

			found = true;
		}
	}
};

const checkMove = (e) => {
	if (e.key === 'ArrowLeft') {
		leftMove();
		addNextValue();
	} else if (e.key === 'ArrowRight') {
		rightMove();
		addNextValue();
	} else if (e.key === 'ArrowUp') {
		upMove();
		addNextValue();
	} else if (e.key === 'ArrowDown') {
		downMove();
		addNextValue();
	}
};

const clearZeros = (rows) => {
	return rows.filter((item) => item != 0);
};

const handleUpdateTile = (tile, num) => {
	tile.textContent = '';
	tile.classList.value = '';
	tile.classList.add('tile');
	if (num !== 0) {
		tile.textContent = num;
		tile.classList.add('tile-animation');
		if (num <= 2048) {
			tile.classList.add(`x${num}`);
		}
	}
};

const leftMove = () => {
	for (let i = 0; i < rowsCount; i++) {
		let rows = boardArr[i];
		rows = clearZeros(rows);
		for (let a = 0; a < rows.length - 1; a++) {
			if (rows[a] === rows[a + 1]) {
				rows[a] *= 2;
				rows[a + 1] = 0;
			}
		}

		rows = clearZeros(rows);

		while (rows.length < rowsCount) {
			rows.push(0);
		}

		boardArr[i] = rows;

		for (let g = 0; g < rowsCount; g++) {
			let tile = document.getElementById(`${i}-${g}`);
			let num = boardArr[i][g];
			handleUpdateTile(tile, num);
		}
	}
};

const rightMove = () => {
	for (let i = 0; i < rowsCount; i++) {
		let rows = boardArr[i];
		rows.reverse();
		rows = clearZeros(rows);
		for (let a = 0; a < rows.length - 1; a++) {
			if (rows[a] === rows[a + 1]) {
				rows[a] *= 2;
				rows[a + 1] = 0;
			}
		}
		rows = clearZeros(rows);
		while (rows.length < rowsCount) {
			rows.push(0);
		}
		rows.reverse();
		boardArr[i] = rows;

		for (let g = 0; g < rowsCount; g++) {
			let tile = document.getElementById(`${i}-${g}`);
			let num = boardArr[i][g];
			handleUpdateTile(tile, num);
		}
	}
};

const upMove = () => {
	for (let g = 0; g < columnsCount; g++) {
		let row = [boardArr[0][g], boardArr[1][g], boardArr[2][g], boardArr[3][g]];
		row = clearZeros(row);
		for (let a = 0; a < row.length - 1; a++) {
			if (row[a] === row[a + 1]) {
				row[a] *= 2;
				row[a + 1] = 0;
			}
		}
		row = clearZeros(row);
		while (row.length < rowsCount) {
			row.push(0);
		}

		for (let p = 0; p < rowsCount; p++) {
			boardArr[p][g] = row[p];
			let tile = document.getElementById(`${p}-${g}`);
			let num = boardArr[p][g];
			handleUpdateTile(tile, num);
		}
	}
};
const downMove = () => {
	for (let g = 0; g < columnsCount; g++) {
		let row = [boardArr[0][g], boardArr[1][g], boardArr[2][g], boardArr[3][g]];
		row.reverse();
		row = clearZeros(row);
		for (let a = 0; a < row.length - 1; a++) {
			if (row[a] === row[a + 1]) {
				row[a] *= 2;
				row[a + 1] = 0;
			}
		}
		row = clearZeros(row);
		while (row.length < rowsCount) {
			row.push(0);
		}
		row.reverse();

		for (let p = 0; p < rowsCount; p++) {
			boardArr[p][g] = row[p];
			let tile = document.getElementById(`${p}-${g}`);
			let num = boardArr[p][g];
			handleUpdateTile(tile, num);
		}
	}
};

const websiteLoaded = () => {
	handlePrepareGame();
};

window.addEventListener('DOMContentLoaded', websiteLoaded);

document.addEventListener('keyup', checkMove);

const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');
const upArrow = document.querySelector('.arrow-up');
const downArrow = document.querySelector('.arrow-down');

leftArrow.addEventListener('click', () => {
	leftMove();
	addNextValue();
});
rightArrow.addEventListener('click', () => {
	rightMove();
	addNextValue();
});
upArrow.addEventListener('click', () => {
	upMove();
	addNextValue();
});
downArrow.addEventListener('click', () => {
	downMove();
	addNextValue();
});
