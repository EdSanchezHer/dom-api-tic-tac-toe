let currentPlayer = "x";
let squareValues = [
	"square-0",
	"square-1",
	"square-2",
	"square-3",
	"square-4",
	"square-5",
	"square-6",
	"square-7",
	"square-8",
];

window.addEventListener("DOMContentLoaded", () => {
	const board = document.getElementById("tic-tac-toe-board");

	let fillSquare = (event) => {
		// debugger;
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
	};
	board.addEventListener("click", fillSquare);
});
