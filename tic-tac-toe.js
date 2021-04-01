let currentPlayer = "x";
let gameWinner = "";
let squareValues = ["", "", "", "", "", "", "", "", ""];

let checkStatus = () => {
	for (let index = 0; index < 9; index += 3) {
		if (
			squareValues[index] !== "" &&
			squareValues[index] === squareValues[index + 1] &&
			squareValues[index] === squareValues[index + 2]
		) {
			gameWinner = squareValues[index];
		}
	}
	for (let index = 0; index < 3; index++) {
		if (
			squareValues[index] !== "" &&
			squareValues[index] === squareValues[index + 3] &&
			squareValues[index] === squareValues[index + 6]
		) {
			gameWinner = squareValues[index];
		}
	}
	if (squareValues[0] === squareValues[4] === squareValues[8]) {
		gameWinner = squareValues[0];
	}
	if (squareValues[2] === squareValues[4] === squareValues[6]) {
		gameWinner = squareValues[2];
	}
	let fillBoard = true;
	for (let index = 0; index < 9; index++) {
		if (squareValues[index] === "") {
			fillBoard = false;
		}
	}
	if (fillBoard) {
		gameWinner = "Tie";
	}
	if (gameWinner !== "") {
		document.getElementById(
			"game-status"
		).innerHTML = `Winner: ${gameWinner.toUpperCase()}`;
	}
};

window.addEventListener("DOMContentLoaded", () => {
	const board = document.getElementById("tic-tac-toe-board");

	let fillSquare = (event) => {
		const squareId = event.target.id;

		if (!squareId.startsWith("square-")) return;

		const squareIndex = Number.parseInt(squareId[squareId.length - 1]);
		if (event.target.innerText !== "") return;

		const img = document.createElement("img");
		img.src = `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${currentPlayer}.svg`;
		event.target.appendChild(img);

		squareValues[squareIndex] = currentPlayer;

		if (currentPlayer === "x") {
			currentPlayer = "o";
		} else {
			currentPlayer = "x";
		}
		checkStatus();
	};
	board.addEventListener("click", fillSquare);

    document.getElementById('new-game').addEventListener('click', (event) => {
        gameWinner = '';
        document.getElementById('game-status').innerHTML = '';

        for (let i = 0; i < 9; i++) {
            document.getElementById(`square-${i}`).innerHTML = '';
        }
        currentPlayer = 'x'

        document.getElementById('new-game').disable = true;

        squareValues = ["", "", "", "", "", "", "", "", ""];
    })
});
