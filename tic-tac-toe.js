let currentPlayer = "x";
let gameWinner = "";
let squareValues = ["", "", "", "", "", "", "", "", ""];
let key = 'game-save-tic-tac-toe'

let saveGame = () => {
    const savedObj = {
        currentPlayer, squareValues, gameStatus
    };
    window.localStorage.setItem(key, JSON.stringify(savedObj))
}

let loadGame = () => {
    let savedGame = JSON.parse(window.localStorage.getItem(key));

    if (savedGame === null) return;

    currentPlayer = savedObj.currentPlayer;
    squareValues = savedObj.squareValues;
    gameWinner = savedObj.gameWinner;

    for (let i = 0; i < 9; i++) {
        if (squareValues[i] !== '') {
            const img = document.createElement('img')
            img.src = `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${squareValues[i]}.svg`;
            document.getElementById(`square-${i}`).appendChild(img);
        }

        if (gameWinner !== '') {
            document.getElementById('game-status').innerHTML = `Winner: ${gameWinner.toUpperCase()}`;
            document.getElementById('new-game').disable = false;
            document.getElementById('give-up').disable = true;
        } else {
            document.getElementById('game-status').innerHTML = '';
            document.getElementById('new-game').disable = true;
            document.getElementById('give-up').disable = false;
        }

    }
};

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
	if (squareValues[0] === squareValues[4] && squareValues[0] === squareValues[8]) {
		gameWinner = squareValues[0];
	}
	if (squareValues[2] === squareValues[4] && squareValues[2] === squareValues[6]) {
		gameWinner = squareValues[2];
	}
	let fillBoard = true;
	for (let index = 0; index < 9; index++) {
		if (squareValues[index] === "") {
			fillBoard = false;
		}
	}
	if (fillBoard && gameWinner === "") {
		gameWinner = "Tie";
	}
	if (gameWinner !== "") {
		document.getElementById(
			"game-status"
		).innerHTML = `Winner: ${gameWinner.toUpperCase()}`;

        document.getElementById('new-game').disable = false;
	}
};

window.addEventListener("DOMContentLoaded", () => {
    loadGame();
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
        saveGame();
	};
	board.addEventListener("click", fillSquare);

	document.getElementById("new-game").addEventListener("click", (event) => {
		gameWinner = "";
		document.getElementById("game-status").innerHTML = "";

		for (let i = 0; i < 9; i++) {
			document.getElementById(`square-${i}`).innerHTML = "";
		}
		currentPlayer = "x";

		document.getElementById("new-game").disable = true;
        document.getElementById('give-up').disable = false;

		squareValues = ["", "", "", "", "", "", "", "", ""];
        saveGame();
	});

    document.getElementById("give-up").addEventListener("click", (event) => {
        if (currentPlayer === 'x') {
            gameWinner = 'o'
            document.getElementById(
                "game-status"
            ).innerHTML = `Winner: ${gameWinner.toUpperCase()}`;
        } else {
            gameWinner = 'x'
            document.getElementById(
                "game-status"
            ).innerHTML = `Winner: ${gameWinner.toUpperCase()}`;
        }
        document.getElementById("give-up").disable = true;
        document.getElementById('new-game').disable = false;
        saveGame();
    })
});
