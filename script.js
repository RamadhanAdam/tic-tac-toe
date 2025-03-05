// Setting up vars

let currentPlayer = "X"
let board = ["", "", "", "", "", "", "", "", ""]

//selecting all cells
const cells = document.querySelectorAll('.cell')

//handling clicks on cells
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (board[index] === "" && !checkWinner()) {
            board[index] = currentPlayer; // Update board state
            cell.textContent = currentPlayer; // Display X or O

            if (checkWinner()) {
                setTimeout(() => document.getElementById("pre").textContent = currentPlayer + " wins!"), 100
            } else if (!board.includes("")) {
                setTimeout(() => {
                    document.getElementById("pre").textContent = "It's a draw";
                }, 100);
            }

            currentPlayer = currentPlayer === "X"
                ? "O"
                : "X"; // Switch player
        }

    });
});

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern =>
        board[pattern[0]] &&
        board[pattern[0]] === board[pattern[1]] &&
        board[pattern[1]] === board[pattern[2]]
    );
}

document.getElementById("restart").addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    document.getElementById("pre").textContent = "";
    currentPlayer = "X"
})